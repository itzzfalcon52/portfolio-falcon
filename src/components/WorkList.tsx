"use client";

import Link from "next/link";
import { useState } from "react";
import type { Preview, Project } from "@/content/site";
import { DitherImage } from "./DitherImage";
import { PlaceholderArt } from "./PlaceholderArt";
import { ArrowUpRight, Plus } from "./Icons";

/**
 * Selected work: ruled rows, each with a small thumbnail.
 * Screenshots show as ink dots and resolve to colour while the row is hovered or focused;
 * projects without a screenshot get a drawn placeholder. On entry each row's hairline
 * draws in and its thumbnail wipes open (CSS in globals.css, "Work list").
 */
const THUMB = { CELL: 2, RESOLVE_MS: 420 };

function Thumb({ preview }: { preview: Preview }) {
  return (
    <span className="work-thumb" aria-hidden="true">
      {preview.kind === "image" ? (
        <DitherImage src={preview.src} reveal="hover" cell={THUMB.CELL} durationMs={THUMB.RESOLVE_MS} />
      ) : (
        <PlaceholderArt pattern={preview.pattern} />
      )}
    </span>
  );
}

/** Larger preview inside an opened row, shown on touch screens where hover doesn't exist. */
function InlinePreview({ preview }: { preview: Preview }) {
  return (
    <div className="work-inline-preview">
      <div className="preview-frame">
        {preview.kind === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview.src} alt={preview.alt} loading="lazy" decoding="async" width={960} height={600} />
        ) : (
          <PlaceholderArt pattern={preview.pattern} />
        )}
      </div>
    </div>
  );
}

export function WorkList({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <ul className="work">
      {projects.map((p, i) => {
        const isOpen = !!open[p.id];
        const panelId = `work-${p.id}`;
        return (
          <li key={p.id} className="work-row" data-open={isOpen} data-reveal style={{ "--i": i } as React.CSSProperties}>
            <h3>
              <button
                type="button"
                className="work-toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))}
              >
                <span className="work-name">
                  {p.name}
                  {p.note && <span className="work-note mono">{p.note}</span>}
                </span>
                <span className="work-line">{p.line}</span>
                <span className="work-tags mono">{p.tags.join(" · ").toLowerCase()}</span>
                <Thumb preview={p.preview} />
                <span className="work-icon">
                  <Plus />
                </span>
              </button>
            </h3>
            <div className="work-panel" id={panelId} role="region" aria-label={`${p.name} details`}>
              <div>
                <div className="work-panel-inner" inert={!isOpen}>
                  <p className="work-detail">{p.detail}</p>
                  <InlinePreview preview={p.preview} />
                  {(p.links.length > 0 || p.writeup) && (
                    <div className="work-links">
                      {p.links.map((l) => (
                        <a key={l.href + l.label} className="link" href={l.href} target="_blank" rel="noreferrer">
                          {l.label}
                          <ArrowUpRight />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ))}
                      {p.writeup && (
                        <Link className="link" href={`/blog/${p.writeup}`}>
                          Read the write-up
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
