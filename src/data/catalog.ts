export type Category =
  | "Leather Shoes"
  | "Shirts"
  | "Blazers"
  | "Vests"
  | "Innerwear";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  mrp: number;
  price: number;
  offer: string;
  image: string;
  gallery: string[];
  sizes: string[];
  colours: { name: string; hex: string }[];
  badge: string;
  rating: number;
  reviewCount: number;
  material: string;
  care: string;
};

export const categories: Category[] = [
  "Leather Shoes",
  "Shirts",
  "Blazers",
  "Vests",
  "Innerwear",
];

export const products: Product[] = [
  {
    id: "LB-SH-001",
    slug: "bravura-oxford-oxblood",
    name: "Bravura Oxford — Oxblood",
    category: "Leather Shoes",
    description:
      "A hand-finished cap-toe Oxford shaped for long days and considered evenings. A cushioned footbed and clean welted profile bring comfort to a sharply formal silhouette.",
    mrp: 8999,
    price: 5799,
    offer: "Founder's Edit",
    image: "/products/oxford-shoes.jpg",
    gallery: Array(5).fill("/products/oxford-shoes.jpg"),
    sizes: ["6", "7", "8", "9", "10", "11"],
    colours: [
      { name: "Oxblood", hex: "#6f1720" },
      { name: "Espresso", hex: "#38231e" },
      { name: "Black", hex: "#17191e" },
    ],
    badge: "Bestseller",
    rating: 4.8,
    reviewCount: 126,
    material: "Full-grain leather upper · leather lining · rubber-grip heel",
    care: "Wipe clean, condition monthly, and store with shoe trees.",
  },
  {
    id: "LB-BL-002",
    slug: "imperial-navy-blazer",
    name: "Imperial Tailored Blazer",
    category: "Blazers",
    description:
      "A precise single-breasted blazer cut in midnight navy, finished with a softly structured shoulder and an easy two-button stance.",
    mrp: 12999,
    price: 8499,
    offer: "Launch Privilege",
    image: "/products/navy-blazer.jpg",
    gallery: Array(5).fill("/products/navy-blazer.jpg"),
    sizes: ["36", "38", "40", "42", "44", "46"],
    colours: [
      { name: "Midnight", hex: "#101d3a" },
      { name: "Charcoal", hex: "#373a42" },
    ],
    badge: "New arrival",
    rating: 4.7,
    reviewCount: 84,
    material: "Fine wool-blend shell · satin lining · horn-effect buttons",
    care: "Dry clean only. Air after wear and store on a broad hanger.",
  },
  {
    id: "LB-ST-003",
    slug: "regent-ivory-shirt",
    name: "Regent Sateen Shirt",
    category: "Shirts",
    description:
      "Our cleanest dress shirt: smooth cotton sateen, a balanced spread collar, and a tailored line that sits neatly under a jacket.",
    mrp: 3999,
    price: 2499,
    offer: "Startup Offer",
    image: "/products/ivory-shirt.jpg",
    gallery: Array(5).fill("/products/ivory-shirt.jpg"),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: [
      { name: "Ivory", hex: "#eee9df" },
      { name: "Sky", hex: "#adc7df" },
      { name: "Black", hex: "#18191d" },
    ],
    badge: "Wardrobe essential",
    rating: 4.6,
    reviewCount: 203,
    material: "100% long-staple cotton sateen · mother-of-pearl-effect buttons",
    care: "Machine wash cold. Warm iron. Hang dry for best shape.",
  },
  {
    id: "LB-VS-004",
    slug: "signore-charcoal-vest",
    name: "Signore Five-Button Vest",
    category: "Vests",
    description:
      "A lean five-button waistcoat with a polished satin back and adjustable cinch—designed to finish a suit or elevate an open-collar shirt.",
    mrp: 4999,
    price: 3199,
    offer: "Limited Period Offer",
    image: "/products/charcoal-vest.jpg",
    gallery: Array(5).fill("/products/charcoal-vest.jpg"),
    sizes: ["36", "38", "40", "42", "44"],
    colours: [
      { name: "Charcoal", hex: "#35363a" },
      { name: "Navy", hex: "#142140" },
    ],
    badge: "Tailored favourite",
    rating: 4.7,
    reviewCount: 61,
    material: "Wool-blend front · satin back · full lining",
    care: "Dry clean only. Keep fastened on a shaped hanger.",
  },
  {
    id: "LB-IN-005",
    slug: "nero-cotton-trunks-two-pack",
    name: "Nero Cotton Trunks — 2 Pack",
    category: "Innerwear",
    description:
      "Breathable everyday trunks with a smooth, minimal waistband, supportive contouring, and flat seams for all-day comfort.",
    mrp: 1999,
    price: 1299,
    offer: "Essentials Event",
    image: "/products/black-innerwear.jpg",
    gallery: Array(5).fill("/products/black-innerwear.jpg"),
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: [
      { name: "Black", hex: "#17181c" },
      { name: "Navy", hex: "#172441" },
      { name: "Graphite", hex: "#4a4d54" },
    ],
    badge: "2-pack",
    rating: 4.5,
    reviewCount: 178,
    material: "95% fine cotton · 5% elastane · soft-touch waistband",
    care: "Machine wash cold with like colours. Do not bleach.",
  },
];

export const galleryAngles = [
  { label: "Signature view", position: "50% 50%", scale: 1 },
  { label: "Craft detail", position: "30% 45%", scale: 1.22 },
  { label: "Profile", position: "70% 52%", scale: 1.16 },
  { label: "Material detail", position: "42% 70%", scale: 1.3 },
  { label: "Finishing", position: "62% 30%", scale: 1.26 },
];

export const dealerCoupons = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  code: `LBI-DEALER-${String(index + 1).padStart(2, "0")}`,
  dealer: "Unassigned",
  discount: 10,
  active: false,
}));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
