"use client";

import { useEffect, useRef } from "react";

/**
 * A photo shown first as 1-bit ink dots (same Bayer dither as the portrait),
 * that dissolves cell by cell into the real image.
 *   reveal="scroll": dissolves once when it scrolls into view.
 *   reveal="hover":  dissolves while the closest `.work-row` is hovered or focused.
 */
const B8 = (() => {
  const b = (n: number): number[] => {
    if (n === 1) return [0];
    const h = n / 2, p = b(h), o = new Array<number>(n * n), off = [0, 2, 3, 1];
    for (let q = 0; q < 4; q++)
      for (let y = 0; y < h; y++)
        for (let x = 0; x < h; x++) o[(Math.floor(q / 2) * h + y) * n + (q % 2) * h + x] = 4 * p[y * h + x] + off[q];
    return o;
  };
  return b(8);
})();

export function DitherImage({
  src,
  alt = "",
  cell = 3,
  reveal = "scroll",
  durationMs = 900,
}: {
  src: string;
  alt?: string;
  cell?: number;
  reveal?: "scroll" | "hover";
  durationMs?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = wrap.current!;
    const canvas = cv.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0, rows = 0, dpr = 1;
    let on = new Uint8Array(0);
    let rank = new Float32Array(0);
    let progress = 0, target = 0, raf = 0;
    const img = new Image();
    img.src = src;

    const colors = () => {
      const cs = getComputedStyle(document.documentElement);
      return { ink: cs.getPropertyValue("--ink").trim(), paper: cs.getPropertyValue("--paper").trim() };
    };

    const build = () => {
      const r = root.getBoundingClientRect();
      if (!r.width || !img.complete || !img.naturalWidth) return;
      dpr = Math.min(devicePixelRatio || 1, 3);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      cols = Math.ceil(r.width / cell);
      rows = Math.ceil(r.height / cell);
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      // object-fit: cover, anchored top
      const s = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
      o.drawImage(img, (cols - img.naturalWidth * s) / 2, 0, img.naturalWidth * s, img.naturalHeight * s);
      const d = o.getImageData(0, 0, cols, rows).data;
      const dark = document.documentElement.dataset.theme === "dark";
      on = new Uint8Array(cols * rows);
      rank = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        const l = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
        const tone = dark ? l : 1 - l;
        const x = i % cols, y = (i / cols) | 0;
        on[i] = tone * 0.92 > (B8[(y % 8) * 8 + (x % 8)] + 0.5) / 64 ? 1 : 0;
        rank[i] = Math.random();
      }
      draw();
    };

    const draw = () => {
      const { ink, paper } = colors();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const c = cell * dpr;
      const sz = Math.max(1, Math.round(c * 0.8));
      for (let i = 0; i < cols * rows; i++) {
        if (rank[i] < progress) continue; // this cell has dissolved: photo shows through
        const x = Math.round((i % cols) * c), y = Math.round(((i / cols) | 0) * c);
        ctx.fillStyle = paper;
        ctx.fillRect(x, y, Math.ceil(c), Math.ceil(c));
        if (on[i]) {
          ctx.fillStyle = ink;
          ctx.fillRect(x, y, sz, sz);
        }
      }
    };

    const animateTo = (t: number) => {
      target = t;
      if (reduced) {
        progress = t;
        draw();
        return;
      }
      if (raf) return;
      let last = performance.now();
      const tick = (now: number) => {
        const dt = now - last;
        last = now;
        const step = dt / durationMs;
        progress = target > progress ? Math.min(target, progress + step) : Math.max(target, progress - step * 1.6);
        draw();
        raf = progress === target ? 0 : requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    img.onload = build;
    if (img.complete) build();

    const cleanups: (() => void)[] = [];
    if (reveal === "scroll") {
      const io = new IntersectionObserver(
        (es) => {
          if (es.some((e) => e.isIntersecting)) {
            io.disconnect();
            window.setTimeout(() => animateTo(1.0001), 250);
          }
        },
        { threshold: 0.45 },
      );
      io.observe(root);
      cleanups.push(() => io.disconnect());
    } else {
      const row = root.closest(".work-row") ?? root;
      const enter = () => animateTo(1.0001);
      const leave = () => animateTo(0);
      row.addEventListener("pointerenter", enter);
      row.addEventListener("pointerleave", leave);
      row.addEventListener("focusin", enter);
      row.addEventListener("focusout", leave);
      cleanups.push(() => {
        row.removeEventListener("pointerenter", enter);
        row.removeEventListener("pointerleave", leave);
        row.removeEventListener("focusin", enter);
        row.removeEventListener("focusout", leave);
      });
    }
    const mo = new MutationObserver(build);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const ro = new ResizeObserver(build);
    ro.observe(root);
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      cleanups.forEach((f) => f());
    };
  }, [src, cell, reveal, durationMs]);

  return (
    <div ref={wrap} className="dither-image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <canvas ref={cv} aria-hidden="true" />
    </div>
  );
}
