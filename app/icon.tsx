import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "32px",
          height: "32px",
          background: "#FF6B35",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "800",
            letterSpacing: "-0.5px",
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
