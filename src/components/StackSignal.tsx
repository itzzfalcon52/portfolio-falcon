"use client";

import { useEffect, useRef } from "react";

/**
 * The dotted line joining browser → server → chip, with a square "packet" travelling along it.
 * The loop only runs while the section is on screen (data-live), and never with reduced motion.
 */
export function StackSignal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const map = el.parentElement!;
    const io = new IntersectionObserver(([e]) => {
      map.dataset.live = e.isIntersecting ? "true" : "false";
    });
    io.observe(map);
    return () => io.disconnect();
  }, []);

  return (
    <div className="signal" ref={ref} aria-hidden="true">
      <span className="signal-track">
        <span className="packet" />
      </span>
    </div>
  );
}
