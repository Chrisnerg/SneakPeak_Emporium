import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useLocation } from "wouter";
import { CATALOG } from "@/data/catalog";

interface SearchOverlayProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const PAGE_RESULTS = [
  {
    id: "page-home",
    type: "Page",
    title: "Home",
    meta: "Landing page and featured releases",
    path: "/",
  },
  {
    id: "page-shop",
    type: "Page",
    title: "Shop",
    meta: "Browse the full sneaker catalog",
    path: "/shop",
  },
  {
    id: "page-men",
    type: "Page",
    title: "Men",
    meta: "Men's sneaker collection",
    path: "/men",
  },
  {
    id: "page-women",
    type: "Page",
    title: "Women",
    meta: "Women's sneaker collection",
    path: "/women",
  },
  {
    id: "page-kids",
    type: "Page",
    title: "Kids",
    meta: "Kids sneaker collection",
    path: "/kids",
  },
  {
    id: "page-drops",
    type: "Page",
    title: "Drops",
    meta: "Limited launches and new arrivals",
    path: "/drops",
  },
  {
    id: "page-about",
    type: "Page",
    title: "About",
    meta: "The Sneakpeak story",
    path: "/about",
  },
];

export default function SearchOverlay({ open, onOpen, onClose }: SearchOverlayProps) {
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTypingTarget = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) {
          onClose();
        } else {
          setQuery("");
          onOpen();
        }
      }

      if (!isTypingTarget && event.key === "/" && !open) {
        event.preventDefault();
        setQuery("");
        onOpen();
      }

      if (event.key === "Escape" && open) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onOpen, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeout = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(timeout);
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const productResults = CATALOG.map((product) => ({
      id: `product-${product.id}`,
      type: "Product",
      title: `${product.brand} ${product.name}`,
      meta: `${product.audience.toUpperCase()} · R${product.price.toLocaleString()}`,
      path: `/shop/${product.id}`,
      image: product.image,
      haystack: `${product.brand} ${product.name} ${product.blurb} ${product.audience}`.toLowerCase(),
    }));

    const pages = PAGE_RESULTS.map((page) => ({
      ...page,
      haystack: `${page.title} ${page.meta}`.toLowerCase(),
    }));

    const combined = [...pages, ...productResults];

    if (!normalized) {
      return combined.slice(0, 7);
    }

    return combined.filter((item) => item.haystack.includes(normalized)).slice(0, 8);
  }, [query]);

  function handleNavigate(path: string) {
    setLocation(path);
    onClose();
  }

  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 700,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(8px)",
        padding: "clamp(16px, 4vw, 40px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "min(920px, 100%)",
          margin: "0 auto",
          background: "#F5F3EE",
          border: "2px solid #0A0A0A",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "18px 20px",
            borderBottom: "2px solid #0A0A0A",
            background: "linear-gradient(180deg, #f2eee5 0%, #f5f3ee 100%)",
          }}
        >
          <Search size={16} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search shoes, brands, or pages"
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              outline: "none",
              color: "#0A0A0A",
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          />
          <span
            style={{
              fontSize: 8,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#777",
              fontFamily: "'JetBrains Mono', monospace",
            }}
            className="sp-search-hint"
          >
            Ctrl K
          </span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "crosshair" }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: "12px 0", maxHeight: "70vh", overflowY: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 20px 10px",
            }}
          >
            <span
              style={{
                fontSize: 8,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#777",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Quick Search
            </span>
            <span
              style={{
                fontSize: 8,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#999",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {results.length} results
            </span>
          </div>

          {results.length === 0 ? (
            <div style={{ padding: "24px 20px 28px" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  lineHeight: 1.8,
                  color: "#666",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                No results for that search. Try a brand like Nike, a page like About, or a model like Samba.
              </p>
            </div>
          ) : (
            results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleNavigate(result.path)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 20px",
                  background: "transparent",
                  border: "none",
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  cursor: "crosshair",
                  textAlign: "left",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = "#0A0A0A";
                  event.currentTarget.style.color = "#F5F3EE";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = "transparent";
                  event.currentTarget.style.color = "#0A0A0A";
                }}
              >
                {result.image ? (
                  <img src={result.image} alt={result.title} style={{ width: 64, height: 64, objectFit: "cover", flexShrink: 0 }} />
                ) : (
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      border: "1px solid rgba(0,0,0,0.16)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 8,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "'JetBrains Mono', monospace",
                      flexShrink: 0,
                    }}
                  >
                    {result.type}
                  </div>
                )}

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 8,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "inherit",
                      opacity: 0.58,
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: 4,
                    }}
                  >
                    {result.type}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "inherit",
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: 3,
                    }}
                  >
                    {result.title}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "inherit",
                      opacity: 0.7,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {result.meta}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        <div
          style={{
            borderTop: "2px solid #0A0A0A",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
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
            Search by brand, model, audience, or page name
          </span>
          <span
            style={{
              fontSize: 8,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#999",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Esc to close
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .sp-search-hint {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}