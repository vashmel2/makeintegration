import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "MakeIntegration — Free Tools for Make.com Builders"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
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
        {/* Dot grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Orange glow blob */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "rgba(255, 107, 53, 0.15)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />

        {/* Bottom glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "200px",
            background: "rgba(255, 107, 53, 0.08)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0px",
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 107, 53, 0.12)",
              border: "1px solid rgba(255, 107, 53, 0.3)",
              borderRadius: "999px",
              padding: "8px 20px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#FF6B35",
              }}
            />
            <span
              style={{
                color: "#FF6B35",
                fontSize: "18px",
                fontWeight: "600",
                letterSpacing: "0.02em",
              }}
            >
              Built for Make.com power users
            </span>
          </div>

          {/* Wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "68px",
                fontWeight: "800",
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: "1",
              }}
            >
              Make
            </span>
            <span
              style={{
                fontSize: "68px",
                fontWeight: "800",
                color: "#FF6B35",
                letterSpacing: "-0.03em",
                lineHeight: "1",
              }}
            >
              Integration
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "26px",
              color: "rgba(255,255,255,0.55)",
              margin: "0",
              fontWeight: "400",
              lineHeight: "1.4",
              maxWidth: "700px",
            }}
          >
            Free tools, deep tutorials, and a template marketplace for Make.com
            builders.
          </p>

          {/* Tool pills */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "44px",
            }}
          >
            {["Webhook Inspector", "Scenario Documenter", "Scenario Analyzer"].map(
              (name) => (
                <div
                  key={name}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "10px 20px",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {name}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
