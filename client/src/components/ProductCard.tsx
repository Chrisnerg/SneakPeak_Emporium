import { ShoppingBag } from "lucide-react";
import { useLocation } from "wouter";
import { type Product } from "@/data/catalog";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  variant?: "default" | "shop";
}

export default function ProductCard({ product, onAddToCart, variant = "default" }: ProductCardProps) {
  const [, setLocation] = useLocation();
  const badgeColor = product.badge === "LIMITED" ? "#FF0000" : product.badge === "SALE" ? "#FF6B00" : "#0A0A0A";
  const isShop = variant === "shop";

  return (
    <div
      style={{
        background: "#F5F3EE",
        borderRight: isShop ? "1px solid rgba(0,0,0,0.18)" : "1px solid rgba(0,0,0,0.08)",
        borderBottom: isShop ? "1px solid rgba(0,0,0,0.18)" : "1px solid rgba(0,0,0,0.08)",
        borderTop: isShop ? "none" : "1px solid rgba(0,0,0,0.08)",
        borderLeft: isShop ? "none" : "1px solid rgba(0,0,0,0.08)",
        position: "relative",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "crosshair",
        minHeight: isShop ? 100 : undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {product.badge && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: badgeColor,
            color: "#F5F3EE",
            fontSize: 8,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "3px 8px",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            zIndex: 2,
          }}
        >
          {product.badge}
        </div>
      )}

      <div
        style={{
          aspectRatio: isShop ? "1 / 1" : "4/3",
          overflow: "hidden",
          background: "#EBEBEB",
          cursor: "pointer",
        }}
        onClick={() => setLocation(`/shop/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{ padding: isShop ? "14px 14px 14px" : "16px" }}>
        {isShop && product.badge && (
          <div
            className="sp-mobile-justin"
            style={{
              fontSize: 9,
              letterSpacing: "0.01em",
              color: "#C23B2A",
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 6,
              fontWeight: 700,
              textTransform: "none",
              display: "none",
            }}
          >
            {product.badge === "NEW" ? "Just In" : product.badge}
          </div>
        )}
        <div
          style={{
            fontSize: 8,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#888",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 4,
          }}
        >
          {product.brand}
        </div>
        <div
          style={{
            fontSize: isShop ? 14 : 13,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#0A0A0A",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: isShop ? 10 : 10,
            cursor: "pointer",
          }}
          onClick={() => setLocation(`/shop/${product.id}`)}
        >
          {product.name}
        </div>

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: isShop ? 14 : 14 }}>
          {product.sizes.slice(0, 4).map((size) => (
            <span
              key={size}
              className="sp-shop-size-chip"
              style={{
                fontSize: 8,
                padding: isShop ? "2px 5px" : "2px 6px",
                border: "1px solid rgba(0,0,0,0.15)",
                color: "#555",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {size}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span
              className="sp-shop-size-chip"
              style={{
                fontSize: 8,
                padding: "2px 6px",
                border: "1px solid rgba(0,0,0,0.15)",
                color: "#888",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              +{product.sizes.length - 4}
            </span>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: isShop ? 18 : 16,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#0A0A0A",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            R{product.price.toLocaleString()}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="sp-card-action-view"
              onClick={() => setLocation(`/shop/${product.id}`)}
              style={{
                display: "flex",
                alignItems: "center",
                background: "transparent",
                color: "#0A0A0A",
                border: "1px solid #0A0A0A",
                padding: isShop ? "8px 10px" : "8px 10px",
                fontSize: 8,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "crosshair",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
              }}
            >
              View
            </button>
            <button
              className="sp-card-action-add"
              onClick={() => onAddToCart(product)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#0A0A0A",
                color: "#F5F3EE",
                border: "none",
                padding: isShop ? "8px 12px" : "8px 14px",
                fontSize: 8,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                cursor: "crosshair",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#FF0000")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0A0A0A")}
            >
              <ShoppingBag size={11} /> Add
            </button>
          </div>
        </div>
      </div>

      {isShop && (
        <style>{`
          @media (max-width: 980px) {
            .sp-card-action-view,
            .sp-card-action-add,
            .sp-shop-size-chip {
              display: none !important;
            }

            .sp-mobile-justin {
              display: block !important;
            }
          }
        `}</style>
      )}
    </div>
  );
}
