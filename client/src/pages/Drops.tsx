import ProductCard from "@/components/ProductCard";
import { CATALOG, type Product } from "@/data/catalog";

interface DropsProps {
  onAddToCart: (product: Product) => void;
}

export default function Drops({ onAddToCart }: DropsProps) {
  const dropProducts = CATALOG.filter((item) => item.badge === "NEW" || item.badge === "LIMITED");

  return (
    <div style={{ background: "#0A0A0A", color: "#F5F3EE" }}>
      <section style={{ padding: "70px 56px 36px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: 8,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#FF0000",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Drop Calendar
        </p>
        <h1
          style={{
            margin: "0 0 14px",
            fontSize: "clamp(34px, 5vw, 66px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            fontFamily: "'JetBrains Mono', monospace",
            color: "#F5F3EE",
          }}
        >
          UPCOMING HEAT
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.8,
            maxWidth: 580,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Limited launches, fast restocks, and spotlight pairs. If it is in this section, move quick.
        </p>
      </section>

      <section style={{ padding: "30px 56px 84px", background: "#F5F3EE" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
          {dropProducts.map((item) => (
            <ProductCard key={item.id} product={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}
