import { ImageResponse } from "next/og";

// Imagem Open Graph gerada no build (sem dependência de rede).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Economista Raimundo Padilha — Economia, mercado e investimentos";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1220 0%, #1e293b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#1d4ed8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            RP
          </div>
          <div
            style={{
              fontSize: 30,
              letterSpacing: 6,
              color: "#93c5fd",
              textTransform: "uppercase",
            }}
          >
            Padilha Participações
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
            Economista Raimundo Padilha
          </div>
          <div style={{ fontSize: 38, color: "#cbd5e1" }}>
            Economia, mercado financeiro e investimentos
          </div>
        </div>

        <div style={{ fontSize: 30, color: "#94a3b8" }}>
          padilha.com.br · Fortaleza/CE
        </div>
      </div>
    ),
    { ...size }
  );
}
