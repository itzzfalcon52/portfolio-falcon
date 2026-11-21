import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = `${site.name}: ${site.hooks[site.activeHook].replace(/\*/g, "")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = { blue: "#1d6a9e", marigold: "#a84e0c", olive: "#56632a" } as const;

export default async function OG() {
  const dir = join(process.cwd(), "src/app/_og");
  const [display, text, portrait] = await Promise.all([
    readFile(join(dir, "Bricolage-Display.ttf")),
    readFile(join(dir, "Bricolage-Text.ttf")),
    readFile(join(dir, "portrait-dots.png")),
  ]);
  const hook = site.hooks[site.activeHook].replace(/\*/g, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#f6f2ea",
          color: "#1c1a17",
          padding: "0 72px 0 40px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${portrait.toString("base64")}`} width={528} height={528} alt="" style={{ marginTop: 102 }} />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 36, flex: 1 }}>
          <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 600, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.035em" }}>
            {site.name}
          </div>
          <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 400, fontSize: 31, lineHeight: 1.35, color: "#6b645b", marginTop: 28 }}>{hook}</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 40, fontFamily: "Bricolage Grotesque", fontWeight: 400, fontSize: 24, color: "#6b645b" }}>
            <div style={{ width: 10, height: 10, background: ACCENT[site.accent], marginRight: 14 }} />
            hussaincodes.live
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage Grotesque", data: display, weight: 600, style: "normal" },
        { name: "Bricolage Grotesque", data: text, weight: 400, style: "normal" },
      ],
    },
  );
}
