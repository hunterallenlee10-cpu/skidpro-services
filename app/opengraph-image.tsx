import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "SkidPro Services. Power built for tough jobs. Skid steer work in Enid and Northwest Oklahoma.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/BigShoulders-Black-opsz72.ttf")),
    readFile(join(process.cwd(), "assets/logo-og.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#0E0C0A",
          padding: "0 72px",
          fontFamily: "Big Shoulders",
          color: "#F4EEE6",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, background: "#F47B20", display: "flex" }} />
        <img src={logoSrc} width={360} height={305} alt="" style={{ marginRight: 56 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, letterSpacing: 6, color: "#F47B20", marginBottom: 18 }}>
            ENID, OK · NORTHWEST OKLAHOMA
          </div>
          <div style={{ fontSize: 112, lineHeight: 0.88, display: "flex", flexDirection: "column" }}>
            <span>POWER BUILT</span>
            <span>FOR TOUGH</span>
            <span>
              JOBS<span style={{ color: "#F47B20" }}>.</span>
            </span>
          </div>
          <div style={{ fontSize: 40, marginTop: 28, color: "#F47B20" }}>(580) 747-6677</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Big Shoulders", data: font, weight: 900, style: "normal" }] },
  );
}
