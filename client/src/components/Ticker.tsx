export default function Ticker() {
  const items = [
    "Sizes 4–14 · All Gender",
    "Walk Your Journey",
    "Limited Drops Every Friday",
    "New Season SS'25",
    "Free Delivery Over R800",
    "Authenticated. Guaranteed.",
    "Sizes 4–14 · All Gender",
    "Walk Your Journey",
    "Limited Drops Every Friday",
    "New Season SS'25",
    "Free Delivery Over R800",
    "Authenticated. Guaranteed.",
  ];

  return (
    <div style={{
      background: "#FF0000",
      height: 32,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      position: "relative",
      zIndex: 100,
    }}>
      <div className="ticker-track" style={{
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        gap: 0,
      }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#F5F3EE",
            padding: "0 24px",
            borderRight: "1px solid rgba(255,255,255,0.25)",
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
