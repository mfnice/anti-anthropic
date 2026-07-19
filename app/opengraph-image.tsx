import { ImageResponse } from "next/og";

export const alt =
  "Anthropic Protest File: facts, public record, and user protest";
export const size = {
  width: 1200,
  height: 630,
};
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
          background: "#09090a",
          color: "#f5f5f4",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: 58,
              height: 58,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ff3341",
              color: "#09090a",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 28, letterSpacing: 7, color: "#ff3341" }}>
            ANTHROPIC PROTEST FILE
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.96 }}>
            别把缺德包装成安全
          </div>
          <div style={{ maxWidth: 840, fontSize: 34, lineHeight: 1.35 }}>
            Claude Code, Cursor, training-data extraction, regional bans, and
            anti-ethical AI conduct recorded in public.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#ff3341", letterSpacing: 4 }}>
          自以为是的小偷，我们拒绝沉默
        </div>
      </div>
    ),
    size
  );
}
