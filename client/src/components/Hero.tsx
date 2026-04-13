import { useState } from "react";

// Real 3D shoe models from KiriEngine — photogrammetry scanned shoes
// Each embed URL loads an interactive 3D viewer with drag-to-rotate
const SHOES = [
  {
    id: "pegasus",
    label: "Nike Pegasus",
    brand: "Nike",
    model: "Trail 3",
    price: "R2,499",
    embedId: "fbba3ac1abe146638e6095c20a0f69ee",
    accentColor: "#00A651",
    thumbBg: "#0a1a0f",
    tag: "NEW",
  },
  {
    id: "portwest",
    label: "Portwest FC25",
    brand: "Portwest",
    model: "Compositelite S3",
    price: "R1,899",
    embedId: "b9f419196d2d414c95bf7ce1b368aa14",
    accentColor: "#FF6B00",
    thumbBg: "#1a0e00",
    tag: null,
  },
  {
    id: "airforce",
    label: "Air Force 1",
    brand: "Nike",
    model: "Low",
    price: "R2,199",
    embedId: "26438bf409a044f8aec423cb5c0ac342",
    accentColor: "#FFFFFF",
    thumbBg: "#1a1a1a",
    tag: "HOT",
  },
  {
    id: "pegasusplus",
    label: "Pegasus Plus",
    brand: "Nike",
    model: "Running",
    price: "R2,799",
    embedId: "66ed18308d35457ea156d587bff5cdf9",
    accentColor: "#FF0000",
    thumbBg: "#1a0000",
    tag: "NEW",
  },
  {
    id: "shox",
    label: "Nike Shox TL",
    brand: "Nike",
    model: "Metallic Silver",
    price: "R3,199",
    embedId: "b453d4e1cf2f4e678b914406abea7a69",
    accentColor: "#C0C0C0",
    thumbBg: "#111111",
    tag: "LIMITED",
  },
  {
    id: "adidas",
    label: "Adidas Terrex",
    brand: "Adidas",
    model: "Trailmaker 2 Mid",
    price: "R2,399",
    embedId: "4826f7cbae4e4a96a48d6b7642fbc06c",
    accentColor: "#C8A060",
    thumbBg: "#1a1208",
    tag: null,
  },
  {
    id: "salomon",
    label: "Salomon XT",
    brand: "Salomon",
    model: "Quest Advanced",
    price: "R2,999",
    embedId: "10c5fa84e95b4e7fb19a0e24061092c5",
    accentColor: "#8B4513",
    thumbBg: "#1a0e08",
    tag: null,
  },
];

interface HeroProps {
  onShop: () => void;
  onDrops: () => void;
}

export default function Hero({ onShop, onDrops }: HeroProps) {
  const [selectedId, setSelectedId] = useState("pegasus");

  const selected = SHOES.find((s) => s.id === selectedId) ?? SHOES[0];
  const embedUrl = `https://www.kiriengine.app/share/embed/${selected.embedId}?userId=1203811&bg_theme=dark&btn=1`;

  return (
    <section className="sp-hero-layout" style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      minHeight: "calc(100vh - 88px)",
      background: "#F5F3EE",
    }}>
      {/* LEFT — Text content */}
      <div className="sp-hero-left" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 56px 40px",
        borderRight: "2px solid #0A0A0A",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Top label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "block", width: 32, height: 2, background: "#FF0000" }} />
          <span style={{
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#888",
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            SS 2025 Collection · 001
          </span>
        </div>

        {/* Headline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 32 }}>
          <h1 style={{
            fontSize: "clamp(64px, 8vw, 110px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            margin: 0,
            fontFamily: "'JetBrains Mono', monospace",
            color: "#0A0A0A",
          }}>
            YOUR<br />
            NEXT<br />
            <em style={{ color: "#FF0000", fontStyle: "italic", display: "block" }}>PAIR</em>
            <span style={{ WebkitTextStroke: "2px #0A0A0A", color: "transparent", display: "block" }}>STARTS</span>
          </h1>

          <p style={{
            marginTop: 32,
            fontSize: 12,
            lineHeight: 1.7,
            color: "#555",
            maxWidth: 280,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            Mzansi's home for authentic premium kicks. Real sneakers for real people — men, women, and kids. Delivered from Joburg to your door.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <button
              onClick={onShop}
              style={{
                background: "#0A0A0A", color: "#F5F3EE", border: "2px solid #0A0A0A",
                padding: "14px 28px", fontSize: 10, letterSpacing: "0.18em",
                textTransform: "uppercase", cursor: "crosshair",
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FF0000"; e.currentTarget.style.borderColor = "#FF0000"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#0A0A0A"; e.currentTarget.style.borderColor = "#0A0A0A"; }}
            >
              Shop Now →
            </button>
            <button
              onClick={onDrops}
              style={{
                background: "transparent", color: "#0A0A0A", border: "2px solid #0A0A0A",
                padding: "14px 28px", fontSize: 10, letterSpacing: "0.18em",
                textTransform: "uppercase", cursor: "crosshair",
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#0A0A0A"; e.currentTarget.style.color = "#F5F3EE"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0A0A0A"; }}
            >
              Upcoming Drops
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="sp-hero-stats" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 24, marginTop: 32,
        }}>
          {[
            { val: "500+", label: "Styles in stock" },
            { val: "9", label: "Provinces served" },
            { val: "4.9★", label: "Customer rating" },
            { val: "2019", label: "Founded Joburg" },
          ].map((s) => (
            <div key={s.val} style={{ paddingRight: 16 }}>
              <div style={{
                fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 800,
                letterSpacing: "-0.03em", color: "#0A0A0A",
                fontFamily: "'JetBrains Mono', monospace",
              }}>{s.val}</div>
              <div style={{
                fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#888", marginTop: 2, fontFamily: "'JetBrains Mono', monospace",
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="sp-hero-mobile-product" style={{ display: "none", marginTop: 22 }}>
          <div
            style={{
              border: "2px solid #0A0A0A",
              background: "#0A0A0A",
              color: "#F5F3EE",
              padding: "16px",
            }}
          >
            <div
              style={{
                fontSize: 8,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 8,
              }}
            >
              Featured Shoe
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 6,
              }}
            >
              {selected.label}
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 12,
              }}
            >
              {selected.brand} · {selected.model}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {selected.price}
              </span>
              <button
                onClick={onShop}
                style={{
                  background: "#FF0000",
                  color: "#fff",
                  border: "none",
                  padding: "10px 12px",
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  cursor: "crosshair",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                }}
              >
                Shop
              </button>
            </div>
          </div>
        </div>

        {/* Vertical label */}
        <div className="sp-hero-vertical-label" style={{
          position: "absolute", bottom: 40, right: -40,
          transform: "rotate(90deg)", transformOrigin: "left center",
          fontSize: 7, letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(0,0,0,0.15)", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap",
        }}>
          Sneakpeak Emporium · JHB · 2025
        </div>
      </div>

      {/* RIGHT — KiriEngine 3D Shoe viewer (black panel) */}
      <div className="sp-hero-right" style={{
        background: "#0A0A0A", position: "relative",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {selected.tag && (
              <span style={{
                background: selected.tag === "LIMITED" ? "#FF0000" : selected.tag === "HOT" ? "#FF6B00" : "#0A0A0A",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", fontSize: 7, letterSpacing: "0.2em",
                textTransform: "uppercase", padding: "2px 6px",
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
              }}>{selected.tag}</span>
            )}
            <div>
              <span style={{
                fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono', monospace",
              }}>
                {selected.brand}
              </span>
              <span style={{
                marginLeft: 8, fontSize: 8, letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono', monospace",
              }}>
                {selected.model}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em",
              color: "#F5F3EE", fontFamily: "'JetBrains Mono', monospace",
            }}>
              {selected.price}
            </span>
            <button
              style={{
                background: "#FF0000", color: "#fff", border: "none",
                padding: "6px 14px", fontSize: 8, letterSpacing: "0.18em",
                textTransform: "uppercase", cursor: "crosshair",
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
              }}
              onClick={onShop}
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* KiriEngine 3D Viewer iframe — fills the middle */}
        <div style={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
          {/* 3D view label */}
          <div style={{
            position: "absolute", top: 12, left: 12, zIndex: 10,
            fontFamily: "'JetBrains Mono', monospace", fontSize: "7px",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.08)", padding: "4px 8px",
            pointerEvents: "none",
          }}>
            3D View · <span style={{ color: "#FF0000" }}>Interactive</span>
          </div>

          <iframe
            key={selected.embedId}
            src={embedUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Shoe selector bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "10px 16px",
          flexShrink: 0,
          background: "#0A0A0A",
        }}>
          <div style={{
            fontSize: 7, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)", fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 8,
          }}>
            Select Shoe — {SHOES.findIndex((s) => s.id === selectedId) + 1}/{SHOES.length}
          </div>

          {/* Scrollable shoe selector row */}
          <div className="sp-hero-shoe-selector" style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
            scrollbarWidth: "none",
          }}>
            {SHOES.map((shoe) => {
              const isActive = shoe.id === selectedId;
              return (
                <button
                  key={shoe.id}
                  onClick={() => setSelectedId(shoe.id)}
                  style={{
                    flexShrink: 0,
                    background: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                    border: isActive ? `1px solid ${shoe.accentColor}` : "1px solid rgba(255,255,255,0.07)",
                    padding: "8px 10px",
                    cursor: "crosshair",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 5,
                    transition: "all 0.18s",
                    minWidth: 64,
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    }
                  }}
                >
                  {/* Colour swatch */}
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 35%, ${shoe.accentColor}, ${shoe.thumbBg})`,
                    border: isActive ? `2px solid ${shoe.accentColor}` : "2px solid rgba(255,255,255,0.1)",
                    transition: "transform 0.18s",
                    transform: isActive ? "scale(1.2)" : "scale(1)",
                  }} />

                  {/* Brand */}
                  <div style={{
                    fontSize: 6,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: isActive ? shoe.accentColor : "rgba(255,255,255,0.25)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    transition: "color 0.18s",
                  }}>
                    {shoe.brand}
                  </div>

                  {/* Model name */}
                  <div style={{
                    fontSize: 6,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                    fontFamily: "'JetBrains Mono', monospace",
                    whiteSpace: "nowrap",
                    transition: "color 0.18s",
                    maxWidth: 60,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {shoe.label.split(" ").slice(1).join(" ")}
                  </div>

                  {/* Active dot */}
                  {isActive && (
                    <div style={{
                      position: "absolute",
                      bottom: 3,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: shoe.accentColor,
                    }} />
                  )}

                  {/* Tag badge */}
                  {shoe.tag && (
                    <div style={{
                      position: "absolute",
                      top: 3,
                      right: 3,
                      fontSize: 5,
                      letterSpacing: "0.1em",
                      color: "#fff",
                      background: shoe.tag === "LIMITED" ? "#FF0000" : shoe.tag === "HOT" ? "#FF6B00" : "#333",
                      padding: "1px 3px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                    }}>
                      {shoe.tag}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 980px) {
          .sp-hero-layout {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }

          .sp-hero-left {
            border-right: none !important;
            padding: 32px 18px 24px !important;
          }

          .sp-hero-right {
            display: none !important;
          }

          .sp-hero-mobile-product {
            display: block !important;
          }

          .sp-hero-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 14px;
          }

          .sp-hero-vertical-label {
            display: none !important;
          }
        }
        /* Hide scrollbar for shoe selector */
        .sp-hero-shoe-selector::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
