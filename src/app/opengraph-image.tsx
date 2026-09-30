import { ImageResponse } from "next/og";

export const alt = "Relay — Background jobs that don't wake you up at 2 a.m.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0c0d10",
          color: "#e8e6e1",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "monospace",
            fontSize: 36,
            color: "#e8e6e1",
          }}
        >
          relay
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#e8a33d" }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "980px",
          }}
        >
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, lineHeight: 1.1 }}>
            Background jobs that don&apos;t wake you up at 2 a.m.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#97938b" }}>
            Background job queue for TypeScript.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "monospace",
            fontSize: 26,
            color: "#e8e6e1",
            background: "#15171c",
            border: "1px solid #23262e",
            borderRadius: 12,
            padding: "16px 24px",
            alignSelf: "flex-start",
          }}
        >
          <span style={{ color: "#97938b" }}>$</span>
          npm i @relay/queue
        </div>
      </div>
    ),
    { ...size }
  );
}
