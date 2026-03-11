import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Dependency Mapper for Make.com | MakeIntegration"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0F1117",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "500px", height: "350px", background: "rgba(255,107,53,0.13)", borderRadius: "50%", filter: "blur(80px)" }} />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 80px", textAlign: "center" }}>
          <span style={{ color: "#FF6B35", fontSize: "18px", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "20px" }}>
            MakeIntegration
          </span>

          <div style={{ width: "72px", height: "72px", background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "34px", marginBottom: "28px" }}>
            {"⬡"}
          </div>

          <h1 style={{ fontSize: "72px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", lineHeight: "1.05", margin: "0 0 20px 0" }}>
            Dependency Mapper
          </h1>

          <p style={{ fontSize: "24px", color: "rgba(255,255,255,0.5)", margin: "0", maxWidth: "700px", lineHeight: "1.5" }}>
            Visualize how your Make.com scenarios call each other. See what breaks before you change anything.
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "40px" }}>
            {["Multi-scenario", "Visual graph", "Dependency tracing"].map((tag) => (
              <div key={tag} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px 18px", color: "rgba(255,255,255,0.6)", fontSize: "15px" }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
