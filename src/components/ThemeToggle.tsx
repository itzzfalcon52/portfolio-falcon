"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

/** Duration of the circular "lights" reveal. */
const REVEAL_MS = 520;

export function ThemeToggle() {
  const btn = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const read = () => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Follow the system until the visitor picks a side.
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem("theme"); } catch {}
      if (!saved) document.documentElement.dataset.theme = mq.matches ? "dark" : "light";
    };
    mq.addEventListener("change", onSystem);
    return () => {
      mo.disconnect();
      mq.removeEventListener("change", onSystem);
    };
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
    };

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (reduced || !doc.startViewTransition) return apply();

    const r = btn.current!.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const vt = doc.startViewTransition(apply);
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: REVEAL_MS, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button ref={btn} type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <mask id="moon-mask">
          <rect width="24" height="24" fill="white" />
          <circle className="moon-bite" cx="30" cy="-6" r="7" fill="black" />
        </mask>
        <circle className="sun-core" cx="12" cy="12" r="4.5" fill="currentColor" mask="url(#moon-mask)" />
        <g className="rays" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </g>
      </svg>
    </button>
  );
}
