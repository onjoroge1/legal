import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "LegalLawDocs - AI-Powered Legal Document Generation"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(194, 147, 66, 0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo / Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            border: "2px solid rgba(194, 147, 66, 0.4)",
            background: "rgba(194, 147, 66, 0.1)",
            marginBottom: 32,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(194, 147, 66, 1)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="M7 21h10" />
            <path d="M12 3v18" />
            <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#f1f5f9" }}>Legal</span>
          <span style={{ color: "#c29342" }}>Law</span>
          <span style={{ color: "#f1f5f9" }}>Docs</span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: "#94a3b8",
            marginTop: 16,
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          AI-Powered Legal Document Generation
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          {["All 50 States", "PDF & DOCX", "Legally Compliant"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                borderRadius: 100,
                border: "1px solid rgba(148, 163, 184, 0.2)",
                background: "rgba(148, 163, 184, 0.05)",
                color: "#cbd5e1",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <p
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            color: "#475569",
            fontWeight: 500,
          }}
        >
          legallawdocs.com
        </p>
      </div>
    ),
    { ...size }
  )
}
