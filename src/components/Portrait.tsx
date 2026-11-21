"use client";

import { useEffect, useRef, useState } from "react";
import { openTerminal } from "./Easter";

/**
 * Dithered 1-bit portrait, drawn on a canvas from public/me-cutout.png.
 * Tune the look here; everything is in CSS pixels unless noted.
 */
export const PORTRAIT = {
  SRC: "/me-cutout.png",
  /**
   * Size of one dither cell in *device* pixels, by screen density.
   * Whole device pixels keep every dot crisp. Smaller = more detail.
   */
  CELL_1X: 2,
  CELL_2X: 3,
  CELL_3X: 4,
  /** Fraction of a cell the square dot fills. 1 = solid pixels (most contrast); 0.7 = visible grid gaps. */
  DOT_FILL: 1,
  /** Tone curve before dithering (tuned on the cutout). */
  LEVELS: [0.03, 0.97] as [number, number], // auto-levels: percentiles of the figure's tones
  SHARPEN: 1.6, // unsharp amount; brings out eyes and smile
  GAMMA: 0.55, // < 1 lightens mid-tones (skin)
  CONTRAST: 1.15,
  /** Light theme only: caps density so deep shadows (eyes, mouth) stay dotted, not solid. */
  LIGHT_MAX_DENSITY: 0.86,
  LIGHT_TONE_GAMMA: 1.25,
  /** Ordered dither matrix size: 4 or 8. */
  MATRIX: 8 as 4 | 8,
  /** How soft the dissolve at the outline is, in cells. */
  EDGE_SOFTNESS: 5,
  /** Fraction of height that fades out at the top and bottom. */
  FADE_TOP: 0.06,
  FADE_BOTTOM: 0.34,
  /** Chance of a stray dot in the halo around the outline. */
  STRAY: 0.05,
  /** Hover physics. */
  PUSH_RADIUS: 44,
  PUSH_STRENGTH: 1.1,
  SPRING: 0.08,
  DAMPING: 0.78,
  /** Tap / click ripple. */
  RIPPLE_RADIUS: 90,
  RIPPLE_FORCE: 7,
  /** Entrance: dots fly in from scattered positions. */
  ASSEMBLE_MS: 1000,
  MORPH_MS: 650,
  /** Extra canvas around the portrait so pushed dots aren't clipped. */
  PAD: 40,
};

/** Bayer matrix of size n (power of two), built recursively, flattened row-major. */
function bayer(n: number): number[] {
  if (n === 1) return [0];
  const h = n / 2;
  const prev = bayer(h);
  const out = new Array<number>(n * n);
  const offs = [0, 2, 3, 1]; // top-left, top-right, bottom-left, bottom-right
  for (let q = 0; q < 4; q++) {
    const ox = (q % 2) * h, oy = Math.floor(q / 2) * h;
    for (let y = 0; y < h; y++)
      for (let x = 0; x < h; x++) out[(oy + y) * n + ox + x] = 4 * prev[y * h + x] + offs[q];
  }
  return out;
}
const BAYER4 = bayer(4);
const BAYER8 = bayer(8);

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
// Stable pseudo-random per cell so stray dots don't jump between renders.
const hash = (x: number, y: number) => {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Mode = "light" | "dark";

function buildTargets(img: HTMLImageElement, size: number, mode: Mode, dot: number) {
  const C = PORTRAIT;
  const cols = Math.floor(size / dot);
  const rows = cols;
  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const octx = off.getContext("2d", { willReadFrequently: true })!;
  octx.imageSmoothingQuality = "high";
  octx.drawImage(img, 0, 0, cols, rows);
  const { data } = octx.getImageData(0, 0, cols, rows);

  const n = cols * rows;
  const alpha = new Float32Array(n);
  for (let i = 0; i < n; i++) alpha[i] = data[i * 4 + 3] / 255;

  // Box-blur the matte (two passes) to get a soft edge field.
  const r = C.EDGE_SOFTNESS;
  const tmp = new Float32Array(n);
  const soft = new Float32Array(n);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      let s = 0, c = 0;
      for (let k = -r; k <= r; k++) {
        const xx = x + k;
        if (xx >= 0 && xx < cols) { s += alpha[y * cols + xx]; c++; }
      }
      tmp[y * cols + x] = s / c;
    }
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      let s = 0, c = 0;
      for (let k = -r; k <= r; k++) {
        const yy = y + k;
        if (yy >= 0 && yy < rows) { s += tmp[yy * cols + x]; c++; }
      }
      soft[y * cols + x] = s / c;
    }

  // Luminance, sharpened against a 3x3 blur, then auto-levelled over the figure.
  const lum = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const p = i * 4;
    lum[i] = (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255;
  }
  const sharp = new Float32Array(n);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      let s = 0, c = 0;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx >= 0 && yy >= 0 && xx < cols && yy < rows) { s += lum[yy * cols + xx]; c++; }
        }
      const i = y * cols + x;
      sharp[i] = lum[i] + C.SHARPEN * (lum[i] - s / c);
    }
  const inside: number[] = [];
  for (let i = 0; i < n; i++) if (alpha[i] > 0.5) inside.push(sharp[i]);
  inside.sort((a, b) => a - b);
  const lo = inside[Math.floor(inside.length * C.LEVELS[0])] ?? 0;
  const hi = inside[Math.floor(inside.length * C.LEVELS[1])] ?? 1;

  const M = C.MATRIX;
  const matrix = M === 8 ? BAYER8 : BAYER4;
  const xs: number[] = [];
  const ys: number[] = [];

  for (let y = 0; y < rows; y++) {
    const fy = y / rows;
    const vFade = smoothstep(0, C.FADE_TOP, fy) * (1 - smoothstep(1 - C.FADE_BOTTOM, 1, fy));
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      const a = alpha[i];
      const s = soft[i];
      const threshold = (matrix[(y % M) * M + (x % M)] + 0.5) / (M * M);
      let on = false;

      if (a > 0.5) {
        let l = Math.min(1, Math.max(0, (sharp[i] - lo) / (hi - lo || 1))) ** C.GAMMA;
        l = Math.min(1, Math.max(0, (l - 0.5) * C.CONTRAST + 0.5));
        // Light theme: dots are ink on paper, so dots = darkness. Dark theme: dots = light.
        const tone = mode === "light" ? (1 - l) ** C.LIGHT_TONE_GAMMA * C.LIGHT_MAX_DENSITY : l;
        const edge = smoothstep(0.45, 0.98, s);
        // Keep a faint minimum inside the figure so the silhouette always reads.
        const density = (0.04 + tone * 0.96) * edge * vFade;
        on = density > threshold;
      } else if (s > 0.03 && s < 0.6) {
        // Halo: a few stray dots so the outline looks like it's breaking apart.
        on = hash(x, y) < C.STRAY * (s / 0.6) * vFade * 2.2;
      }

      if (on) {
        xs.push(C.PAD + x * dot);
        ys.push(C.PAD + y * dot);
      }
    }
  }
  return { hx: Float32Array.from(xs), hy: Float32Array.from(ys) };
}

const BUBBLES = [
  "hi!",
  "yep, that's me",
  "", // filled with the dot count
  "ok stop poking me",
  "seriously",
  "one more and I'll show you something",
];

export function Portrait({ alt }: { alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef<{ ripple: (x: number, y: number) => void; count: () => number } | null>(null);
  const [bubble, setBubble] = useState<{ text: string; key: number } | null>(null);
  const pokes = useRef(0);
  const bubbleTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const C = PORTRAIT;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let img: HTMLImageElement | null = null;
    let size = 0;
    let dpr = 1;
    let dot = 2;
    let ink = "#1c1a17";
    let hx = new Float32Array(0), hy = new Float32Array(0);
    let x = new Float32Array(0), y = new Float32Array(0);
    let vx = new Float32Array(0), vy = new Float32Array(0);
    let sx = new Float32Array(0), sy = new Float32Array(0), delay = new Float32Array(0);
    let tweenStart = 0, tweenDur = 0, tweening = false;
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let running = false;
    let disposed = false;

    const mode = (): Mode => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    const readInk = () => {
      ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || ink;
    };

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = ink;
      const cell = dot * dpr;
      const s = Math.max(1, Math.round(cell * C.DOT_FILL));
      for (let i = 0; i < x.length; i++) {
        ctx.fillRect(Math.round(x[i] * dpr), Math.round(y[i] * dpr), s, s);
      }
    };

    const step = (now: number) => {
      raf = 0;
      let energy = 0;
      if (tweening) {
        let done = true;
        for (let i = 0; i < x.length; i++) {
          const t = Math.min(1, Math.max(0, (now - tweenStart - delay[i]) / tweenDur));
          if (t < 1) done = false;
          const e = easeOut(t);
          x[i] = sx[i] + (hx[i] - sx[i]) * e;
          y[i] = sy[i] + (hy[i] - sy[i]) * e;
        }
        if (done) tweening = false;
        energy = 1;
      } else {
        const R = C.PUSH_RADIUS, R2 = R * R;
        for (let i = 0; i < x.length; i++) {
          let ax = (hx[i] - x[i]) * C.SPRING;
          let ay = (hy[i] - y[i]) * C.SPRING;
          if (pointer) {
            const dx = x[i] - pointer.x, dy = y[i] - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / R) ** 2 * C.PUSH_STRENGTH;
              ax += (dx / d) * f;
              ay += (dy / d) * f;
            }
          }
          vx[i] = (vx[i] + ax) * C.DAMPING;
          vy[i] = (vy[i] + ay) * C.DAMPING;
          x[i] += vx[i];
          y[i] += vy[i];
          energy += Math.abs(vx[i]) + Math.abs(vy[i]) + Math.abs(hx[i] - x[i]) + Math.abs(hy[i] - y[i]);
        }
        if (energy < 0.5 && !pointer) {
          x.set(hx);
          y.set(hy);
          energy = 0;
        }
      }
      draw();
      if (energy > 0 || pointer || tweening) {
        raf = requestAnimationFrame(step);
      } else {
        running = false;
      }
    };
    const kick = () => {
      if (reduced) { draw(); return; }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    const startTween = (fromX: Float32Array, fromY: Float32Array, dur: number, spread: number) => {
      const n = hx.length;
      sx = new Float32Array(n);
      sy = new Float32Array(n);
      delay = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        sx[i] = fromX[i];
        sy[i] = fromY[i];
        delay[i] = Math.random() * spread;
      }
      tweenStart = performance.now();
      tweenDur = dur;
      tweening = true;
    };

    const rebuild = (reason: "init" | "theme" | "resize") => {
      if (!img) return;
      size = wrap.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      const cell = dpr >= 2.5 ? C.CELL_3X : dpr >= 1.5 ? C.CELL_2X : C.CELL_1X;
      dot = cell / dpr;
      const full = size + C.PAD * 2;
      canvas.width = Math.round(full * dpr);
      canvas.height = Math.round(full * dpr);
      readInk();

      const oldX = x, oldY = y;
      const t = buildTargets(img, size, mode(), dot);
      hx = t.hx;
      hy = t.hy;
      const n = hx.length;
      x = new Float32Array(n);
      y = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);

      if (reduced || reason === "resize") {
        x.set(hx);
        y.set(hy);
        draw();
        return;
      }
      if (reason === "init") {
        // Scatter across (and a little beyond) the canvas, then assemble.
        const fx = new Float32Array(n), fy = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2;
          const r = full * (0.25 + Math.random() * 0.55);
          fx[i] = full / 2 + Math.cos(a) * r;
          fy[i] = full / 2 + Math.sin(a) * r;
        }
        x.set(fx); y.set(fy);
        startTween(fx, fy, C.ASSEMBLE_MS * 0.7, C.ASSEMBLE_MS * 0.3);
      } else {
        // Theme switch: the old dots travel to the new picture.
        const fx = new Float32Array(n), fy = new Float32Array(n);
        const m = oldX.length;
        for (let i = 0; i < n; i++) {
          const j = m ? Math.floor((i / n) * m) : 0;
          fx[i] = m ? oldX[j] : hx[i];
          fy[i] = m ? oldY[j] : hy[i];
        }
        x.set(fx); y.set(fy);
        startTween(fx, fy, C.MORPH_MS * 0.75, C.MORPH_MS * 0.25);
      }
      kick();
    };

    const local = (e: PointerEvent | MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onMove = (e: PointerEvent) => {
      if (reduced || e.pointerType === "touch") return;
      const p = local(e);
      const full = size + C.PAD * 2;
      const inside = p.x > 0 && p.y > 0 && p.x < full && p.y < full;
      if (inside) {
        pointer = p;
        kick();
      } else if (pointer) {
        pointer = null;
        kick();
      }
    };
    const onLeave = () => {
      if (pointer) { pointer = null; kick(); }
    };

    engine.current = {
      ripple: (cx: number, cy: number) => {
        if (reduced || tweening) return;
        const r = canvas.getBoundingClientRect();
        const px = cx - r.left, py = cy - r.top;
        const R = C.RIPPLE_RADIUS;
        for (let i = 0; i < x.length; i++) {
          const dx = x[i] - px, dy = y[i] - py;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          if (d < R) {
            const f = (1 - d / R) * C.RIPPLE_FORCE;
            vx[i] += (dx / d) * f;
            vy[i] += (dy / d) * f;
          }
        }
        kick();
      },
      count: () => hx.length,
    };

    const image = new Image();
    image.decoding = "async";
    image.src = C.SRC;
    image.onload = () => {
      if (disposed) return;
      img = image;
      // Start the entrance once the portrait is on screen.
      const io = new IntersectionObserver((entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          io.disconnect();
          rebuild("init");
        }
      });
      io.observe(wrap);
    };

    const mo = new MutationObserver(() => rebuild("theme"));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let lastW = 0;
    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth;
      if (img && Math.abs(w - lastW) > 1) rebuild("resize");
      lastW = w;
    });
    ro.observe(wrap);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const poke = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.detail > 0) engine.current?.ripple(e.clientX, e.clientY);
    else {
      const r = e.currentTarget.getBoundingClientRect();
      engine.current?.ripple(r.left + r.width / 2, r.top + r.height / 2);
    }
    pokes.current += 1;
    const n = pokes.current;
    let text: string;
    if (n >= 7 && n % 7 === 0) {
      text = "> opening terminal";
      window.setTimeout(openTerminal, 450);
    } else if (n > 7) {
      text = "you again?";
    } else if (n === 3) {
      text = `made of ${(engine.current?.count() ?? 0).toLocaleString("en-IN")} dots`;
    } else {
      text = BUBBLES[n - 1];
    }
    setBubble({ text, key: n });
    window.clearTimeout(bubbleTimer.current);
    bubbleTimer.current = window.setTimeout(() => setBubble(null), 1900);
  };

  return (
    <div className="portrait" ref={wrapRef}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/me.jpg" alt={alt} width={260} height={260} fetchPriority="high" />
      <canvas ref={canvasRef} aria-hidden="true" />
      <button type="button" className="portrait-hit" aria-label="Poke the portrait" onClick={poke} />
      <span aria-live="polite" className="sr-only">
        {bubble?.text}
      </span>
      {bubble && bubble.text && (
        <span key={bubble.key} className="bubble" aria-hidden="true">
          {bubble.text}
        </span>
      )}
    </div>
  );
}
