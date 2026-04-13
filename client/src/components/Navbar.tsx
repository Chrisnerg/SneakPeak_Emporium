import { useState } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useLocation } from "wouter";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

const navStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 200,
  background: "#0A0A0A",
  borderBottom: "2px solid #0A0A0A",
  height: 56,
  display: "flex",
  alignItems: "stretch",
};

export default function Navbar({ cartCount, onOpenCart, onOpenSearch }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/men", label: "Men" },
    { path: "/women", label: "Women" },
    { path: "/kids", label: "Kids" },
    { path: "/drops", label: "Drops" },
    { path: "/about", label: "About" },
  ];

  const activePath = location.startsWith("/shop/") ? "/shop" : location;

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <button
          onClick={() => setLocation("/")}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#F5F3EE",
            background: "none",
            border: "none",
            position: "relative",
            flexShrink: 0,
            cursor: "crosshair",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          SNEAK<span style={{ color: "#FF0000" }}>PEAK</span>
          <span style={{
            position: "absolute",
            bottom: 6,
            left: 24,
            fontSize: 7,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.2)",
          }}>EST. JHB 2019</span>
        </button>

        {/* Nav links — hidden on mobile */}
        <div style={{ display: "flex", alignItems: "stretch", flex: 1, overflow: "hidden" }} className="sp-nav-links">
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => setLocation(l.path)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: activePath === l.path ? "#F5F3EE" : "rgba(255,255,255,0.45)",
                background: activePath === l.path ? "rgba(255,0,0,0.06)" : "none",
                border: "none",
                borderRight: "1px solid rgba(255,255,255,0.07)",
                borderBottom: activePath === l.path ? "2px solid #FF0000" : "2px solid transparent",
                cursor: "crosshair",
                transition: "all 0.15s",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "stretch", marginLeft: "auto" }}>
          <button
            onClick={onOpenSearch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 20px",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              background: "none",
              border: "none",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              cursor: "crosshair",
              fontFamily: "'JetBrains Mono', monospace",
            }}
            className="sp-search-btn"
          >
            <Search size={14} /> Search
          </button>
          <button
            onClick={onOpenCart}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 20px",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#F5F3EE",
              background: "rgba(255,0,0,0.08)",
              border: "none",
              borderLeft: "2px solid #0A0A0A",
              cursor: "crosshair",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FF0000")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,0,0,0.08)")}
          >
            <ShoppingBag size={14} />
            BAG
            {cartCount > 0 && (
              <span style={{
                background: "#FF0000",
                color: "#fff",
                fontSize: 9,
                width: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}>{cartCount}</span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              alignItems: "center",
              padding: "0 16px",
              color: "#F5F3EE",
              background: "none",
              border: "none",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              cursor: "crosshair",
            }}
            className="sp-menu-btn"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          top: 56,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#0A0A0A",
          zIndex: 199,
          padding: "32px 24px",
        }}>
          <button
            onClick={() => {
              onOpenSearch();
              setMobileOpen(false);
            }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "20px 0",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#F5F3EE",
              background: "none",
              border: "none",
              cursor: "crosshair",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Search
            <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)" }}>00</span>
          </button>
          {links.map((l, i) => (
            <button
              key={l.path}
              onClick={() => { setLocation(l.path); setMobileOpen(false); }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "20px 0",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#F5F3EE",
                background: "none",
                border: "none",
                cursor: "crosshair",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {l.label}
              <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)" }}>0{i + 1}</span>
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .sp-nav-links { display: none !important; }
          .sp-search-btn { display: none !important; }
          .sp-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
