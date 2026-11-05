import { ImageResponse } from "next/og";

export const alt =
  "Qatu: páginas web y catálogos con pedidos por WhatsApp. Desde Ayacucho, para el Perú.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 64px",
          background: "#f6f3ee",
          color: "#22282a",
          fontFamily: "sans-serif",
          borderRight: "24px solid #e51b48",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: "-3px",
            }}
          >
            qatu<span style={{ color: "#e51b48" }}>.pe</span>
          </div>
          <span style={{ fontSize: 20, color: "#646762" }}>
            Desde Ayacucho, para el Perú.
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span
            style={{ fontSize: 21, color: "#8a3c45", letterSpacing: "2px" }}
          >
            DISEÑO WEB PARA NEGOCIOS
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 80,
              fontWeight: 700,
              letterSpacing: "-4px",
              lineHeight: 1.08,
            }}
          >
            <span>Tu marca en una web.</span>
            <span style={{ color: "#e51b48" }}>Tus pedidos en WhatsApp.</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #d8d3cb",
            paddingTop: 24,
            fontSize: 22,
          }}
        >
          <span>Web · Catálogo · Acompañamiento</span>
          <span style={{ color: "#e51b48", fontWeight: 700 }}>qatu.pe</span>
        </div>
      </div>
    ),
    size,
  );
}
