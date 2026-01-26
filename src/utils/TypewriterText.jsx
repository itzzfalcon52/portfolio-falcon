"use client";

import React, { useEffect, useState } from "react";

export default function TypewriterText({
  text,
  speed = 90, // ms per character
  startDelay = 150, // delay before typing starts
  className = "",
  showCaret = true,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId;

    // Wait a bit before starting the typing animation
    if (index === 0 && startDelay > 0) {
      timeoutId = setTimeout(() => setIndex(1), startDelay);
      return () => clearTimeout(timeoutId);
    }

    // Type the next character until we reach the full text
    if (index > 0 && index < text.length) {
      timeoutId = setTimeout(() => setIndex((i) => i + 1), speed);
      return () => clearTimeout(timeoutId);
    }
  }, [index, speed, startDelay, text.length]);

  const visible = text.slice(0, Math.min(index, text.length));

  return (
    <span className={className}>
      {visible}
      {showCaret && (
        <span className="ml-0.5 inline-block w-[0.6ch] animate-pulse text-zinc-200">
          |
        </span>
      )}
    </span>
  );
}