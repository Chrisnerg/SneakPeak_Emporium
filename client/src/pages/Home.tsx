import { ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { BRAND_MARQUEE, CATALOG, type Product } from "@/data/catalog";

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  const [, setLocation] = useLocation();
  const featuredProducts = CATALOG.slice(0, 4);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F3EE" }}>
      <Hero onShop={() => setLocation("/shop")} onDrops={() => setLocation("/drops")} />

      <section style={{ padding: "80px 56px", background: "#F5F3EE" }} className="sp-home-products-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            borderBottom: "2px solid #0A0A0A",
            paddingBottom: 20,
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 8,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#FF0000",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 8,
              }}
            >
              New Arrivals - SS26
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#0A0A0A",
                fontFamily: "'JetBrains Mono', monospace",
                margin: 0,
              }}
            >
              FRESH KICKS
            </h2>
          </div>
          <button
            onClick={() => setLocation("/shop")}
            style={{
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0A0A0A",
              background: "none",
              border: "none",
              cursor: "crosshair",
              fontFamily: "'JetBrains Mono', monospace",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            View all <ChevronRight size={12} />
          </button>
        </div>

        <div className="sp-home-grid" style={{ display: "grid", gap: 14 }}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          <button
            onClick={() => setLocation("/shop")}
            style={{
              background: "#0A0A0A",
              color: "#F5F3EE",
              border: "2px solid #0A0A0A",
              padding: "12px 22px",
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "crosshair",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "#FF0000";
              event.currentTarget.style.borderColor = "#FF0000";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "#0A0A0A";
              event.currentTarget.style.borderColor = "#0A0A0A";
            }}
          >
            View all products
          </button>
        </div>
      </section>

      <section style={{ background: "#0A0A0A", padding: "40px 56px", borderTop: "2px solid #FF0000" }}>
        <div
          style={{
            fontSize: 8,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Brands We Carry
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px, 4vw, 56px)", flexWrap: "wrap" }}>
          {BRAND_MARQUEE.map((brand) => (
            <span
              key={brand}
              style={{
                fontSize: "clamp(12px, 1.5vw, 18px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.18)",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "color 0.15s",
                cursor: "crosshair",
              }}
              onMouseEnter={(event) => (event.currentTarget.style.color = "#F5F3EE")}
              onMouseLeave={(event) => (event.currentTarget.style.color = "rgba(255,255,255,0.18)")}
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: "80px 56px",
          background: "#F5F3EE",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          borderTop: "2px solid #0A0A0A",
        }}
        className="sp-home-about"
      >
        <div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#FF0000",
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 16,
            }}
          >
            Proudly South African
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#0A0A0A",
              fontFamily: "'JetBrains Mono', monospace",
              margin: "0 0 24px",
            }}
          >
            FROM THE
            <br />
            KASI TO
            <br />
            YOUR DOOR.
          </h2>
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.8,
              color: "#555",
              maxWidth: 380,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            We are not just a shoe shop, we are a statement. Every pair authenticated, every delivery tracked, every style chosen
            with Mzansi in mind.
          </p>
          <button
            onClick={() => setLocation("/about")}
            style={{
              marginTop: 28,
              background: "none",
              border: "2px solid #0A0A0A",
              padding: "12px 24px",
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "crosshair",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              transition: "all 0.15s",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "#0A0A0A";
              event.currentTarget.style.color = "#F5F3EE";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "none";
              event.currentTarget.style.color = "#0A0A0A";
            }}
          >
            Our story
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {[
            { val: "SA", sub: "Est. Johannesburg, 2019" },
            { val: "9", sub: "Provinces" },
            { val: "100%", sub: "Authentic" },
            { val: "2400+", sub: "Reviews" },
          ].map((stat) => (
            <div
              key={stat.val}
              style={{
                background: "#0A0A0A",
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "#F5F3EE",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {stat.val}
              </div>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "'JetBrains Mono', monospace",
                  marginTop: 4,
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .sp-home-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        @media (max-width: 980px) {
          .sp-home-products-section {
            padding: 48px 14px !important;
          }

          .sp-home-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
          }

          .sp-home-about {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }

        @media (max-width: 560px) {
          .sp-home-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
