import { useMemo, useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import ProductCard from "@/components/ProductCard";
import { CATALOG, type Product } from "@/data/catalog";

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute<{ id: string }>("/shop/:id");
  const productId = Number(params?.id);

  const product = useMemo(() => {
    if (!match || Number.isNaN(productId)) {
      return undefined;
    }

    return CATALOG.find((entry) => entry.id === productId);
  }, [match, productId]);

  const [selectedSize, setSelectedSize] = useState<number | null>(product?.sizes[0] ?? null);

  if (!product) {
    return (
      <section style={{ padding: "90px 56px", background: "#F5F3EE", minHeight: "70vh" }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#888",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Product not found
        </p>
        <button
          onClick={() => setLocation("/shop")}
          style={{
            marginTop: 14,
            border: "2px solid #0A0A0A",
            background: "transparent",
            padding: "12px 18px",
            fontSize: 9,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "crosshair",
          }}
        >
          Back to shop
        </button>
      </section>
    );
  }

  const related = CATALOG.filter((entry) => entry.id !== product.id).slice(0, 4);

  return (
    <div style={{ background: "#F5F3EE" }}>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          borderBottom: "2px solid #0A0A0A",
        }}
        className="sp-product-grid"
      >
        <div style={{ background: "#0A0A0A", minHeight: 580, display: "grid", placeItems: "center", padding: 40 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", maxWidth: 700, height: "auto", objectFit: "contain", filter: "contrast(1.08)" }}
          />
        </div>

        <div style={{ padding: "56px" }}>
          <button
            onClick={() => setLocation("/shop")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              color: "#666",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "crosshair",
              padding: 0,
              marginBottom: 24,
            }}
          >
            <ArrowLeft size={13} /> Back to shop
          </button>

          <p
            style={{
              fontSize: 8,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888",
              fontFamily: "'JetBrains Mono', monospace",
              margin: "0 0 6px",
            }}
          >
            {product.brand}
          </p>
          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "clamp(30px, 4vw, 52px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#0A0A0A",
              fontFamily: "'JetBrains Mono', monospace",
              lineHeight: 0.92,
            }}
          >
            {product.name}
          </h1>
          <p
            style={{
              margin: "0 0 24px",
              fontSize: 12,
              lineHeight: 1.8,
              color: "#555",
              fontFamily: "'JetBrains Mono', monospace",
              maxWidth: 460,
            }}
          >
            {product.blurb}
          </p>

          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#0A0A0A",
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 24,
            }}
          >
            R{product.price.toLocaleString()}
          </div>

          <div style={{ marginBottom: 12 }}>
            <p
              style={{
                margin: "0 0 10px",
                fontSize: 8,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#777",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Select size (UK)
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: 42,
                    height: 36,
                    border: "1px solid #0A0A0A",
                    background: selectedSize === size ? "#0A0A0A" : "transparent",
                    color: selectedSize === size ? "#F5F3EE" : "#0A0A0A",
                    fontSize: 10,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "crosshair",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            style={{
              marginTop: 14,
              width: "100%",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              background: "#0A0A0A",
              color: "#F5F3EE",
              border: "none",
              padding: "16px 20px",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "crosshair",
            }}
          >
            <ShoppingBag size={15} /> Add to bag
          </button>
        </div>
      </section>

      <section style={{ padding: "72px 56px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 26,
            borderBottom: "2px solid #0A0A0A",
            paddingBottom: 16,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(24px, 3.2vw, 44px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#0A0A0A",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            YOU MAY ALSO LIKE
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 2,
          }}
        >
          {related.map((entry) => (
            <ProductCard key={entry.id} product={entry} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .sp-product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
