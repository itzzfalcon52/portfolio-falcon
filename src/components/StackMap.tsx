import {
  siDocker,
  siEspressif,
  siFastapi,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPytorch,
  siReact,
  siScikitlearn,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siWebrtc,
} from "simple-icons";
import type { site } from "@/content/site";
import { StackSignal } from "./StackSignal";

/** Monochrome marks from Simple Icons (CC0), drawn in the page ink. */
const ICONS: Record<string, { path: string }> = {
  react: siReact,
  nextdotjs: siNextdotjs,
  typescript: siTypescript,
  tailwindcss: siTailwindcss,
  nodedotjs: siNodedotjs,
  fastapi: siFastapi,
  postgresql: siPostgresql,
  prisma: siPrisma,
  webrtc: siWebrtc,
  docker: siDocker,
  pytorch: siPytorch,
  scikitlearn: siScikitlearn,
  tensorflow: siTensorflow,
  espressif: siEspressif,
};

/* Station drawings: 1.5px ink strokes; wiped in left to right on entry. */
function StationArt({ art }: { art: "browser" | "server" | "chip" }) {
  const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
  return (
    <svg viewBox="0 0 64 48" className="station-svg" aria-hidden="true">
      {art === "browser" && (
        <>
          <rect x="6" y="6" width="52" height="36" rx="3" {...S} />
          <path d="M6 14h52" {...S} />
          <path d="M14 22h22M14 28h30M14 34h16" {...S} />
          <g fill="currentColor">
            <rect x="10" y="9" width="2" height="2" />
            <rect x="14" y="9" width="2" height="2" />
            <rect x="18" y="9" width="2" height="2" />
          </g>
        </>
      )}
      {art === "server" && (
        <>
          <rect x="12" y="6" width="40" height="15" rx="2" {...S} />
          <rect x="12" y="27" width="40" height="15" rx="2" {...S} />
          <path d="M30 13.5h16M30 34.5h16" {...S} />
          <g fill="currentColor">
            <rect x="17" y="12" width="3" height="3" className="led" />
            <rect x="17" y="33" width="3" height="3" className="led led-2" />
          </g>
        </>
      )}
      {art === "chip" && (
        <>
          <rect x="18" y="10" width="28" height="28" rx="2" {...S} />
          <rect x="25" y="17" width="14" height="14" {...S} />
          <path d="M24 10V5M32 10V5M40 10V5M24 43v-5M32 43v-5M40 43v-5M18 17h-5M18 24h-5M18 31h-5M51 17h-5M51 24h-5M51 31h-5" {...S} />
        </>
      )}
    </svg>
  );
}

export function StackMap({ stack }: { stack: typeof site.stack }) {
  return (
    <div className="stack-map">
      <StackSignal />
      <ol className="stations">
        {stack.map((g, i) => (
          <li key={g.group} className="station" data-reveal style={{ "--i": i } as React.CSSProperties}>
            <div className="station-art">
              <StationArt art={g.art} />
            </div>
            <div className="station-body">
              <h3 className="station-name">
                {g.group} <span className="station-where mono">{g.where}</span>
              </h3>
              <ul className="tools">
                {g.items.map((t, j) => {
                  const icon = t.icon ? ICONS[t.icon] : undefined;
                  return (
                    <li key={t.name} className="tool" style={{ "--j": j } as React.CSSProperties}>
                      {icon ? (
                        <svg viewBox="0 0 24 24" className="tool-mark" aria-hidden="true">
                          <path d={icon.path} />
                        </svg>
                      ) : (
                        <span className="tool-dot" aria-hidden="true" />
                      )}
                      {t.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
