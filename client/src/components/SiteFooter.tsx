export default function SiteFooter() {
  return (
    <>
      <section
        style={{
          background: "#FF0000",
          padding: "64px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 40px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#F5F3EE",
              fontFamily: "'JetBrains Mono', monospace",
              margin: "0 0 8px",
            }}
          >
            Early access.
            <br />
            Better prices.
          </h2>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'JetBrains Mono', monospace",
              margin: 0,
            }}
          >
            No spam, just drops, restocks, and exclusives.
          </p>
        </div>
        <div style={{ display: "flex", gap: 0 }}>
          <input
            type="email"
            placeholder="your@email.co.za"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.4)",
              borderRight: "none",
              padding: "14px 20px",
              fontSize: 11,
              color: "#F5F3EE",
              fontFamily: "'JetBrains Mono', monospace",
              outline: "none",
              width: 260,
            }}
          />
          <button
            style={{
              background: "#0A0A0A",
              color: "#F5F3EE",
              border: "2px solid #0A0A0A",
              padding: "14px 24px",
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "crosshair",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
            }}
          >
            Subscribe
          </button>
        </div>
      </section>

      <footer
        style={{
          background: "#0A0A0A",
          padding: "56px 56px 32px",
          borderTop: "2px solid #FF0000",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
          className="sp-footer-grid"
        >
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#F5F3EE",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 16,
              }}
            >
              SNEAK<span style={{ color: "#FF0000" }}>PEAK</span>
            </div>
            <p
              style={{
                fontSize: 11,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'JetBrains Mono', monospace",
                maxWidth: 240,
              }}
            >
              Mzansi&apos;s home for authentic premium kicks. Real sneakers for real people.
            </p>
          </div>
          {[
            { title: "Shop", links: ["Men's Sneakers", "Women's Sneakers", "Kids", "New Arrivals", "Sale", "Drop Calendar"] },
            { title: "Help", links: ["SA Size Guide", "Delivery Info", "Returns & Exchanges", "Track My Order", "Contact Us"] },
            { title: "Company", links: ["About Sneakpeak", "Authenticity Promise", "Careers", "Press", "Privacy Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: 16,
                }}
              >
                {col.title}
              </div>
              {col.links.map((link) => (
                <div
                  key={link}
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: 10,
                  }}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            © 2026 Sneakpeak. All rights reserved.
          </span>
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            JHB · CPT · DBN
          </span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 980px) {
          .sp-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </>
  );
}
