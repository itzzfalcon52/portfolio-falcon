/**
 * Simple ink placeholders for projects without a screenshot.
 * Square dots and 1.5px strokes in the page ink, so they follow the theme.
 */
export function PlaceholderArt({ pattern }: { pattern: "spectrogram" | "ocean" }) {
  if (pattern === "spectrogram") {
    // A chip with pins, and a voice waveform running through it.
    const bars = [6, 12, 20, 30, 22, 36, 28, 16, 26, 34, 18, 10, 6];
    return (
      <svg viewBox="0 0 160 100" className="placeholder-art" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="52" y="22" width="56" height="56" rx="3" />
        </g>
        <g fill="currentColor">
          {[30, 42, 54, 66].map((y) => (
            <g key={y}>
              <rect x="45" y={y} width="5" height="3" />
              <rect x="110" y={y} width="5" height="3" />
            </g>
          ))}
          {[62, 74, 86, 98].map((x) => (
            <g key={x}>
              <rect x={x - 2} y="15" width="3" height="5" />
              <rect x={x - 2} y="80" width="3" height="5" />
            </g>
          ))}
          {bars.map((h, i) => (
            <rect key={i} x={20 + i * 10} y={50 - h / 2} width="4" height={h} opacity={i < 3 || i > 9 ? 0.45 : 1} />
          ))}
        </g>
      </svg>
    );
  }
  // Ocean: a wavy surface, then dotted layers thinning with depth, and one float profile.
  const rows = [34, 46, 58, 70, 82];
  return (
    <svg viewBox="0 0 160 100" className="placeholder-art" aria-hidden="true">
      <path d="M8 22 Q 24 14 40 22 T 72 22 T 104 22 T 136 22 T 168 22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g fill="currentColor">
        {rows.map((y, r) =>
          Array.from({ length: Math.floor(36 / (r + 1.4)) }, (_, i) => {
            const step = 152 / Math.floor(36 / (r + 1.4));
            return <rect key={`${r}-${i}`} x={8 + i * step} y={y} width="3" height="3" />;
          }),
        )}
        {rows.map((y) => (
          <rect key={`f${y}`} x="118" y={y - 1} width="5" height="5" />
        ))}
      </g>
      <line x1="120.5" y1="26" x2="120.5" y2="90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
    </svg>
  );
}
