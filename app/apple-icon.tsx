import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "180px",
          height: "180px",
          background: "#FF6B35",
          borderRadius: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: "88px",
            fontWeight: "800",
            letterSpacing: "-3px",
            lineHeight: "1",
          }}
        >
          MI
        </span>
      </div>
    ),
    { ...size }
  )
}
