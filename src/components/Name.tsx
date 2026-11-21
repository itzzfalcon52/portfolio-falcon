"use client";

import { useEffect, useRef } from "react";

/**
 * The name, set as real text. Letters near the cursor get bolder and narrower
 * (the font's weight and width axes) and lift slightly, then settle back.
 * Each letter's box is locked to its resting width, so nothing reflows.
 * On touch, a tap sends a wave through the letters.
 */
const REST = { wght: 640, wdth: 92 };
const PEAK = { wght: 800, wdth: 78, lift: -0.06, tilt: 4 };
const RADIUS = 90; // px of influence around the cursor

export function Name({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h = ref.current!;
    const chars = Array.from(h.querySelectorAll<HTMLSpanElement>(".ch"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lock = () => {
      chars.forEach((c) => (c.style.width = ""));
      const widths = chars.map((c) => c.getBoundingClientRect().width);
      chars.forEach((c, i) => (c.style.width = `${widths[i]}px`));
    };
    document.fonts?.ready.then(lock);
    const ro = new ResizeObserver(lock);
    ro.observe(h);

    const set = (c: HTMLSpanElement, t: number, dir: number) => {
      c.style.setProperty("--wght", String(Math.round(REST.wght + (PEAK.wght - REST.wght) * t)));
      c.style.setProperty("--wdth", String(Math.round(REST.wdth + (PEAK.wdth - REST.wdth) * t)));
      c.style.setProperty("--lift", `${PEAK.lift * t}em`);
      c.style.setProperty("--tilt", `${PEAK.tilt * t * dir}deg`);
    };
    const reset = () => chars.forEach((c) => set(c, 0, 0));

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        h.classList.add("is-tracking");
        for (const c of chars) {
          const r = c.getBoundingClientRect();
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          const d = Math.hypot(e.clientX - cx, (e.clientY - cy) * 1.4);
          const t = Math.max(0, 1 - d / RADIUS);
          set(c, t * t, e.clientX < cx ? 1 : -1);
        }
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      h.classList.remove("is-tracking");
      reset();
    };
    const onTap = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      chars.forEach((c, i) => {
        window.setTimeout(() => set(c, 0.8, i % 2 ? 1 : -1), i * 35);
        window.setTimeout(() => set(c, 0, 0), i * 35 + 220);
      });
    };

    h.addEventListener("pointermove", onMove);
    h.addEventListener("pointerleave", onLeave);
    h.addEventListener("pointerdown", onTap);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
      h.removeEventListener("pointermove", onMove);
      h.removeEventListener("pointerleave", onLeave);
      h.removeEventListener("pointerdown", onTap);
    };
  }, []);

  const words = text.split(" ");
  return (
    <h1 className="name" ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi}>
            <span className="word">
              {Array.from(w).map((ch, i) => (
                <span key={i} className="ch">
                  {ch}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </h1>
  );
}
