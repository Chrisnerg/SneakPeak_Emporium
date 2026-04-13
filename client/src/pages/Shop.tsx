import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { CATALOG, type Audience, type Product } from "@/data/catalog";

interface ShopProps {
  onAddToCart: (product: Product) => void;
  defaultAudience?: "all" | Audience;
  title?: string;
  description?: string;
}

const AUDIENCES: Audience[] = ["men", "women", "kids"];
const BRANDS = Array.from(new Set(CATALOG.map((product) => product.brand)));
const SIZES = Array.from(new Set(CATALOG.flatMap((product) => product.sizes))).sort((left, right) => left - right);
const CONDITIONS = ["NEW", "SALE", "LIMITED"] as const;
type SortMode = "newest" | "price-low" | "price-high" | "brand";

export default function Shop({ onAddToCart, defaultAudience = "all", title, description }: ShopProps) {
  const [selectedAudiences, setSelectedAudiences] = useState<Audience[]>(defaultAudience === "all" ? [] : [defaultAudience]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<Array<(typeof CONDITIONS)[number]>>([]);
  const [sortMode, setSortMode] = useState<SortMode>("newest");

  const audienceCounts = useMemo(
    () =>
      AUDIENCES.reduce<Record<Audience, number>>((accumulator, audience) => {
        accumulator[audience] = CATALOG.filter((product) => product.audience === audience).length;
        return accumulator;
      }, { men: 0, women: 0, kids: 0 }),
    [],
  );

  const brandCounts = useMemo(
    () =>
      BRANDS.reduce<Record<string, number>>((accumulator, brand) => {
        accumulator[brand] = CATALOG.filter((product) => product.brand === brand).length;
        return accumulator;
      }, {}),
    [],
  );

  function toggleValue<T>(values: T[], value: T) {
    return values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value];
  }

  const visibleProducts = useMemo(() => {
    let filtered = CATALOG.filter((product) => {
      const audienceMatch = selectedAudiences.length === 0 || selectedAudiences.includes(product.audience);
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes.includes(size));
      const conditionMatch = selectedConditions.length === 0 || (product.badge ? selectedConditions.includes(product.badge) : false);

      return audienceMatch && brandMatch && sizeMatch && conditionMatch;
    });

    switch (sortMode) {
      case "price-low":
        filtered = [...filtered].sort((left, right) => left.price - right.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((left, right) => right.price - left.price);
        break;
      case "brand":
        filtered = [...filtered].sort((left, right) => left.brand.localeCompare(right.brand) || left.name.localeCompare(right.name));
        break;
      default:
        filtered = [...filtered].sort((left, right) => Number(Boolean(right.badge)) - Number(Boolean(left.badge)) || right.id - left.id);
    }

    return filtered;
  }, [selectedAudiences, selectedBrands, selectedSizes, selectedConditions, sortMode]);

  function resetFilters() {
    setSelectedAudiences(defaultAudience === "all" ? [] : [defaultAudience]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedConditions([]);
    setSortMode("newest");
  }

  return (
    <div style={{ background: "#F5F3EE" }}>
      <section
        style={{
          padding: "42px 18px 26px",
          borderBottom: "1px solid rgba(0,0,0,0.18)",
          background: "#0A0A0A",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <div
              style={{
                fontSize: 8,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 8,
              }}
            >
              Collection - SS2026
            </div>
            <h1
              style={{
                fontSize: "clamp(42px, 5.4vw, 72px)",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                color: "#F5F3EE",
                fontFamily: "'JetBrains Mono', monospace",
                lineHeight: 0.9,
                margin: "0 0 10px",
              }}
            >
              {title ?? "ALL STYLES"}
            </h1>
            <p
              style={{
                fontSize: 11,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.55)",
                maxWidth: 560,
                fontFamily: "'JetBrains Mono', monospace",
                margin: 0,
              }}
            >
              {description ?? "Authentic sneakers, curated for every lane. Pick your fit, pick your pace."}
            </p>
          </div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              fontFamily: "'JetBrains Mono', monospace",
              paddingBottom: 6,
            }}
          >
            {visibleProducts.length.toString().padStart(3, "0")} products
          </div>
        </div>
      </section>

      <section style={{ padding: "0 0 80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "132px minmax(0, 1fr)",
            alignItems: "start",
          }}
          className="sp-shop-layout"
        >
          <aside
            style={{
              borderRight: "1px solid rgba(0,0,0,0.16)",
              padding: "18px 10px 0 12px",
              position: "sticky",
              top: 88,
              minHeight: "100%",
            }}
            className="sp-shop-sidebar"
          >
            {[
              {
                title: "Category",
                items: AUDIENCES.map((audience) => ({
                  label: `${audience.charAt(0).toUpperCase() + audience.slice(1)} (${String(audienceCounts[audience]).padStart(2, "0")})`,
                  checked: selectedAudiences.includes(audience),
                  onChange: () => setSelectedAudiences((current) => toggleValue(current, audience)),
                })),
              },
              {
                title: "Brand",
                items: BRANDS.map((brand) => ({
                  label: `${brand} (${String(brandCounts[brand]).padStart(2, "0")})`,
                  checked: selectedBrands.includes(brand),
                  onChange: () => setSelectedBrands((current) => toggleValue(current, brand)),
                })),
              },
              {
                title: "Size (UK)",
                sizeGrid: true,
                items: SIZES.map((size) => ({
                  label: String(size),
                  checked: selectedSizes.includes(size),
                  onChange: () => setSelectedSizes((current) => toggleValue(current, size)),
                })),
              },
              {
                title: "Condition",
                items: CONDITIONS.map((condition) => ({
                  label: condition,
                  checked: selectedConditions.includes(condition),
                  onChange: () => setSelectedConditions((current) => toggleValue(current, condition)),
                })),
              },
            ].map((group) => (
              <div key={group.title} style={{ marginBottom: 22 }}>
                <div
                  style={{
                    fontSize: 8,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#777",
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: 12,
                    paddingTop: 10,
                    borderTop: "2px solid #FF0000",
                    display: "inline-block",
                  }}
                >
                  {group.title}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: group.sizeGrid ? "repeat(4, 1fr)" : "1fr", gap: 7 }}>
                  {group.items.map((item) => (
                    <label
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: group.sizeGrid ? 0 : 8,
                        justifyContent: group.sizeGrid ? "center" : "flex-start",
                        minHeight: group.sizeGrid ? 20 : undefined,
                        border: group.sizeGrid ? "1px solid rgba(0,0,0,0.12)" : "none",
                        background: group.sizeGrid && item.checked ? "#0A0A0A" : "transparent",
                        color: group.sizeGrid && item.checked ? "#F5F3EE" : "#555",
                        fontSize: 8,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: "crosshair",
                        padding: group.sizeGrid ? "0" : "0",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={item.onChange}
                        style={{ display: group.sizeGrid ? "none" : "block", margin: 0 }}
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={resetFilters}
              style={{
                width: "100%",
                background: "#0A0A0A",
                color: "#F5F3EE",
                border: "none",
                padding: "11px 10px",
                fontSize: 9,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "crosshair",
                fontWeight: 700,
              }}
            >
              Reset filters
            </button>
          </aside>

          <div style={{ padding: "16px 8px 0 16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
                padding: "0 0 10px",
                borderBottom: "1px solid rgba(0,0,0,0.18)",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 8,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#777",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Showing {visibleProducts.length} products
              </span>
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value as SortMode)}
                style={{
                  border: "1px solid #0A0A0A",
                  background: "transparent",
                  padding: "8px 12px",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: "'JetBrains Mono', monospace",
                  minWidth: 170,
                }}
              >
                <option value="newest">Sort: Newest first</option>
                <option value="price-low">Sort: Price low to high</option>
                <option value="price-high">Sort: Price high to low</option>
                <option value="brand">Sort: Brand A-Z</option>
              </select>
            </div>

            <div className="sp-shop-grid" style={{ display: "grid", gap: 0 }}>
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} variant="shop" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .sp-shop-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-top: 1px solid rgba(0,0,0,0.18);
          border-left: 1px solid rgba(0,0,0,0.18);
        }

        @media (max-width: 1200px) {
          .sp-shop-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        @media (max-width: 980px) {
          .sp-shop-layout {
            grid-template-columns: 1fr !important;
          }

          .sp-shop-sidebar {
            position: static !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(0,0,0,0.16);
            padding: 18px 14px !important;
          }

          .sp-shop-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .sp-shop-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 520px) {
          .sp-shop-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
