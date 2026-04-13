export type Audience = "men" | "women" | "kids";

export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  sizes: number[];
  badge?: "NEW" | "LIMITED" | "SALE";
  image: string;
  audience: Audience;
  blurb: string;
}

export const CATALOG: Product[] = [
  {
    id: 1,
    brand: "Nike",
    name: "Air Force 1 '07",
    price: 1899,
    sizes: [5, 6, 7, 8, 9, 10, 11],
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
    audience: "men",
    blurb: "A street staple with crisp leather panels and all-day cushioning.",
  },
  {
    id: 2,
    brand: "New Balance",
    name: "574 Core",
    price: 1699,
    sizes: [4, 5, 6, 7, 8, 9, 10],
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=1200&q=80",
    audience: "women",
    blurb: "A heritage runner reworked for daily comfort and easy styling.",
  },
  {
    id: 3,
    brand: "Adidas",
    name: "Samba OG",
    price: 2299,
    sizes: [6, 7, 8, 9, 10],
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&q=80",
    audience: "men",
    blurb: "Iconic terrace profile with premium suede overlays and grip sole.",
  },
  {
    id: 4,
    brand: "Bathu",
    name: "Mesh 3.0",
    price: 1499,
    sizes: [5, 6, 7, 8, 9, 10, 11],
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1200&q=80",
    audience: "kids",
    blurb: "Breathable knit build made for all-day movement and comfort.",
  },
  {
    id: 5,
    brand: "Jordan",
    name: "Air Jordan 1 Mid",
    price: 2799,
    sizes: [7, 8, 9, 10, 11],
    badge: "LIMITED",
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=1200&q=80",
    audience: "women",
    blurb: "Legendary silhouette with elevated materials and bold color blocking.",
  },
  {
    id: 6,
    brand: "Puma",
    name: "RS-X3 Puzzle",
    price: 1299,
    sizes: [4, 5, 6, 7, 8],
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=80",
    audience: "kids",
    blurb: "Chunky archive-inspired build with plush foam and playful panels.",
  },
  {
    id: 7,
    brand: "Vans",
    name: "Old Skool Pro",
    price: 1199,
    sizes: [5, 6, 7, 8, 9, 10],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&q=80",
    audience: "men",
    blurb: "Skate-born classic reinforced for durability and board feel.",
  },
  {
    id: 8,
    brand: "Asics",
    name: "Gel-Kayano 14",
    price: 2099,
    sizes: [4, 5, 6, 7, 8],
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80",
    audience: "women",
    blurb: "Performance-tech runner with layered mesh and visible GEL comfort.",
  },
];

export const BRAND_MARQUEE = [
  "Nike",
  "Adidas",
  "New Balance",
  "Puma",
  "Bathu",
  "Jordan",
  "Converse",
  "Vans",
  "Asics",
];
