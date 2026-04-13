export default function About() {
  return (
    <div style={{ background: "#F5F3EE" }}>
      <section
        style={{
          padding: "82px 56px",
          borderBottom: "2px solid #0A0A0A",
          background: "linear-gradient(135deg, #f5f3ee 0%, #efeae0 100%)",
        }}
      >
        <p
          style={{
            fontSize: 8,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#FF0000",
            fontFamily: "'JetBrains Mono', monospace",
            margin: "0 0 10px",
          }}
        >
          Our Story
        </p>
        <h1
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(38px, 5.5vw, 82px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "#0A0A0A",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          BUILT IN JOBURG,
          <br />
          WORN EVERYWHERE.
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 740,
            fontSize: 12,
            lineHeight: 1.9,
            color: "#555",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Sneakpeak started as a tiny weekend pop-up in Johannesburg in 2019. We built our name by sourcing authentic pairs,
          explaining every release in plain language, and treating each order with care. Today, we serve sneaker lovers across South
          Africa with a simple mission: make premium footwear feel accessible, trusted, and culturally grounded.
        </p>
      </section>

      <section
        style={{
          padding: "72px 56px",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 32,
        }}
        className="sp-about-grid"
      >
        <div
          style={{
            background: "#0A0A0A",
            padding: "34px",
            display: "grid",
            gap: 2,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {[
            { val: "SA", label: "Proudly local" },
            { val: "9", label: "Provinces delivered" },
            { val: "100%", label: "Authenticity guaranteed" },
            { val: "24/7", label: "Order tracking" },
          ].map((item) => (
            <div key={item.val} style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "24px" }}>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "clamp(24px, 4vw, 42px)",
                  letterSpacing: "-0.04em",
                  color: "#F5F3EE",
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {item.val}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 8,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: 20 }}>
          {[
            {
              title: "Authenticity First",
              text: "Every pair goes through a verification check before it leaves us. No grey-area inventory. No replicas.",
            },
            {
              title: "Community-Led Curation",
              text: "Our catalog is shaped by what South African sneakerheads actually wear, collect, and request.",
            },
            {
              title: "Local Speed, Global Taste",
              text: "From classics to limited drops, we combine international heat with local logistics and support.",
            },
          ].map((item) => (
            <div key={item.title} style={{ borderTop: "2px solid #0A0A0A", paddingTop: 16 }}>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: 20,
                  letterSpacing: "-0.03em",
                  color: "#0A0A0A",
                  fontWeight: 800,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  lineHeight: 1.9,
                  color: "#555",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .sp-about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
