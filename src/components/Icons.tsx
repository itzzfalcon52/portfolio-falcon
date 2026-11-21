/* Small hand-drawn icon set: 1.6 stroke, round caps, 16px box. */

type P = { size?: number; nudge?: "down" | "ne" | "w" };

export const ArrowDown = ({ size = 15, nudge = "down" }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-nudge={nudge}>
    <path d="M8 2.5v11M3.5 9L8 13.5 12.5 9" />
  </svg>
);

export const ArrowUpRight = ({ size = 13, nudge = "ne" }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-nudge={nudge}>
    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
  </svg>
);

export const ArrowLeft = ({ size = 15, nudge = "w" }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-nudge={nudge}>
    <path d="M13.5 8h-11M7 3.5L2.5 8 7 12.5" />
  </svg>
);

export const Plus = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M8 3v10M3 8h10" />
  </svg>
);

export const CopyIcon = () => (
  <svg className="i-copy" width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
    <path d="M10.5 3.5v-.5A1.5 1.5 0 009 1.5H3A1.5 1.5 0 001.5 3v6A1.5 1.5 0 003 10.5h.5" />
  </svg>
);

export const CheckIcon = () => (
  <svg className="i-check" width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path className="check-path" d="M3 8.5l3.2 3L13 4.5" />
  </svg>
);
