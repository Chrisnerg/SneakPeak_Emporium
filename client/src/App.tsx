import { useMemo, useState } from "react";
import { Route, Switch } from "wouter";
import { ShoppingBag, X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import SearchOverlay from "@/components/SearchOverlay";
import Ticker from "@/components/Ticker";
import SiteFooter from "@/components/SiteFooter";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CATALOG, type Product } from "@/data/catalog";
import About from "@/pages/About";
import Drops from "@/pages/Drops";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";
import Shop from "@/pages/Shop";

interface CartItem {
  product: Product;
  qty: number;
}

function CartDrawer({
  open,
  items,
  onClose,
  onRemove,
  onCheckout,
}: {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}) {
  if (!open) {
    return null;
  }

  const cartCount = items.reduce((accumulator, item) => accumulator + item.qty, 0);
  const cartTotal = items.reduce((accumulator, item) => accumulator + item.product.price * item.qty, 0);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
      }}
    >
      <div style={{ flex: 1, background: "rgba(0,0,0,0.5)" }} onClick={onClose} />
      <div
        style={{
          width: 400,
          background: "#F5F3EE",
          display: "flex",
          flexDirection: "column",
          borderLeft: "2px solid #0A0A0A",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            borderBottom: "2px solid #0A0A0A",
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
            }}
          >
            Your Bag ({cartCount})
          </span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "crosshair" }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 16,
                color: "#888",
              }}
            >
              <ShoppingBag size={40} strokeWidth={1} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Your bag is empty
              </span>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <img src={item.product.image} alt={item.product.name} style={{ width: 72, height: 72, objectFit: "cover" }} />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 8,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#888",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {item.product.brand}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: 10, color: "#777", marginBottom: 2, fontFamily: "'JetBrains Mono', monospace" }}>
                    Qty: {item.qty}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>
                    R{(item.product.price * item.qty).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.product.id)}
                  style={{ background: "none", border: "none", cursor: "crosshair", alignSelf: "flex-start" }}
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "2px solid #0A0A0A" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Total
              </span>
              <span style={{ fontSize: 18, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace" }}>
                R{cartTotal.toLocaleString()}
              </span>
            </div>
            <button
              style={{
                width: "100%",
                background: "#0A0A0A",
                color: "#F5F3EE",
                border: "none",
                padding: "16px",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "crosshair",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                transition: "background 0.15s",
              }}
              onMouseEnter={(event) => (event.currentTarget.style.background = "#FF0000")}
              onMouseLeave={(event) => (event.currentTarget.style.background = "#0A0A0A")}
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StoreRouter({ onAddToCart }: { onAddToCart: (product: Product) => void }) {
  return (
    <Switch>
      <Route path="/" component={() => <Home onAddToCart={onAddToCart} />} />
      <Route path="/shop" component={() => <Shop onAddToCart={onAddToCart} />} />
      <Route path="/shop/:id" component={() => <ProductDetail onAddToCart={onAddToCart} />} />
      <Route
        path="/men"
        component={() => (
          <Shop
            onAddToCart={onAddToCart}
            defaultAudience="men"
            title="MEN'S COLLECTION"
            description="Performance runners, street icons, and everyday essentials built for all-day rotation."
          />
        )}
      />
      <Route
        path="/women"
        component={() => (
          <Shop
            onAddToCart={onAddToCart}
            defaultAudience="women"
            title="WOMEN'S COLLECTION"
            description="Sharp silhouettes and comfort-led classics curated for movement and style."
          />
        )}
      />
      <Route
        path="/kids"
        component={() => (
          <Shop
            onAddToCart={onAddToCart}
            defaultAudience="kids"
            title="KIDS COLLECTION"
            description="Durable, lightweight pairs made for school runs, play, and everyday adventure."
          />
        )}
      />
      <Route path="/drops" component={() => <Drops onAddToCart={onAddToCart} />} />
      <Route path="/about" component={About} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const cartCount = useMemo(() => cart.reduce((accumulator, item) => accumulator + item.qty, 0), [cart]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 3000);
  }

  function addToCart(product: Product) {
    setCart((previous) => {
      const existing = previous.find((entry) => entry.product.id === product.id);
      if (existing) {
        return previous.map((entry) =>
          entry.product.id === product.id ? { ...entry, qty: entry.qty + 1 } : entry,
        );
      }

      return [...previous, { product, qty: 1 }];
    });

    showToast(`${product.name} added to bag`);
  }

  function removeFromCart(id: number) {
    setCart((previous) => previous.filter((entry) => entry.product.id !== id));
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Navbar
            cartCount={cartCount}
            onOpenCart={() => setCartOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
          />
          <Ticker />
          <StoreRouter onAddToCart={addToCart} />
          <SiteFooter />

          <SearchOverlay open={searchOpen} onOpen={() => setSearchOpen(true)} onClose={() => setSearchOpen(false)} />

          <CartDrawer
            open={cartOpen}
            items={cart}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromCart}
            onCheckout={() => showToast("Checkout coming soon")}
          />

          {toast && (
            <div
              style={{
                position: "fixed",
                bottom: 32,
                right: 32,
                background: "#0A0A0A",
                color: "#F5F3EE",
                padding: "14px 20px",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
                zIndex: 600,
                borderLeft: "3px solid #FF0000",
                animation: "slideIn 0.3s ease",
                maxWidth: "min(90vw, 360px)",
              }}
            >
              {toast}
            </div>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
