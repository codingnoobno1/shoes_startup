export type ThemePaletteEntry = {
  role: string;
  label: string;
  hex: string;
  usage: string;
};

export type StoreTheme = {
  id: string;
  name: string;
  family: string;
  number: string;
  description: string;
  bestFor: string;
  personality: string[];
  palette: ThemePaletteEntry[];
};

export const DEFAULT_THEME_ID = "royal-heritage";
export const THEME_STORAGE_KEY = "lbi-store-theme-v1";
export const THEME_EVENT = "lbi-store-theme-change";

export const storeThemes: StoreTheme[] = [
  {
    id: "royal-heritage",
    number: "01",
    name: "Royal Heritage",
    family: "Premium classic",
    description: "Midnight blue and antique gold with an editorial, old-world luxury character.",
    bestFor: "Luxury fashion, occasionwear, private-label launches",
    personality: ["Regal", "Established", "Tailored"],
    palette: [
      { role: "primary", label: "Midnight Navy", hex: "#07162F", usage: "Navigation, hero, footer, dominant brand field" },
      { role: "secondary", label: "Sovereign Blue", hex: "#112B54", usage: "Depth, gradients, product stages" },
      { role: "accent", label: "Antique Gold", hex: "#C9A45D", usage: "Primary actions, rules, highlights" },
      { role: "accentSoft", label: "Champagne", hex: "#E0C887", usage: "Hover states and luminous detail" },
      { role: "background", label: "Porcelain", hex: "#F6F3EC", usage: "Main editorial canvas" },
      { role: "surface", label: "Ivory", hex: "#FFFDF8", usage: "Cards, forms, elevated surfaces" },
      { role: "text", label: "Ink Navy", hex: "#07162F", usage: "Headings and high-emphasis text" },
      { role: "muted", label: "Blue Grey", hex: "#6B7687", usage: "Descriptions and supporting labels" },
    ],
  },
  {
    id: "executive-ivory",
    number: "02",
    name: "Executive Ivory",
    family: "Enterprise luxury",
    description: "A confident corporate palette with ink blue, warm ivory, and refined copper accents.",
    bestFor: "Enterprise buyers, distributor presentations, premium B2B",
    personality: ["Assured", "Clear", "Commercial"],
    palette: [
      { role: "primary", label: "Boardroom Ink", hex: "#10233F", usage: "Navigation, authority, key sections" },
      { role: "secondary", label: "Steel Blue", hex: "#35536F", usage: "Supporting panels and depth" },
      { role: "accent", label: "Burnished Copper", hex: "#B97943", usage: "Calls to action and commercial emphasis" },
      { role: "accentSoft", label: "Soft Copper", hex: "#D8A171", usage: "Hover and selection states" },
      { role: "background", label: "Executive Ivory", hex: "#F7F3EA", usage: "Main professional canvas" },
      { role: "surface", label: "Paper White", hex: "#FFFEFB", usage: "Tables, cards and forms" },
      { role: "text", label: "Carbon Ink", hex: "#172231", usage: "Readable enterprise typography" },
      { role: "muted", label: "Slate", hex: "#667383", usage: "Metadata and secondary copy" },
    ],
  },
  {
    id: "noir-atelier",
    number: "03",
    name: "Noir Atelier",
    family: "Fashion noir",
    description: "Near-black tailoring, graphite layers, and platinum details for a cinematic fashion house mood.",
    bestFor: "Editorial drops, evening collections, monochrome campaigns",
    personality: ["Cinematic", "Restrained", "Exclusive"],
    palette: [
      { role: "primary", label: "True Noir", hex: "#090A0C", usage: "Immersive navigation and hero fields" },
      { role: "secondary", label: "Graphite", hex: "#202329", usage: "Layered dark surfaces" },
      { role: "accent", label: "Platinum", hex: "#BFC2C7", usage: "Fine rules, controls and premium cues" },
      { role: "accentSoft", label: "Silver Mist", hex: "#E1E2E4", usage: "Hover states and bright details" },
      { role: "background", label: "Gallery Grey", hex: "#E9E9E7", usage: "Neutral product canvas" },
      { role: "surface", label: "Atelier White", hex: "#F8F8F6", usage: "Clean content cards" },
      { role: "text", label: "Near Black", hex: "#111216", usage: "Editorial headings and copy" },
      { role: "muted", label: "Concrete", hex: "#6F7278", usage: "Understated support text" },
    ],
  },
  {
    id: "cyber-luxe",
    number: "04",
    name: "Cyber Luxe",
    family: "Future premium",
    description: "Obsidian foundations with electric cyan and ultraviolet—technology expressed through luxury restraint.",
    bestFor: "Digital-first launches, younger audiences, innovation stories",
    personality: ["Futuristic", "Electric", "Precise"],
    palette: [
      { role: "primary", label: "Obsidian", hex: "#070B17", usage: "Immersive core background" },
      { role: "secondary", label: "Deep Circuit", hex: "#111C35", usage: "Technology layers and gradients" },
      { role: "accent", label: "Electric Cyan", hex: "#31D7E8", usage: "Actions, focus and digital energy" },
      { role: "accentSoft", label: "Ultraviolet", hex: "#9D7BFF", usage: "Secondary glow and expressive moments" },
      { role: "background", label: "Cool Cloud", hex: "#EEF2F7", usage: "High-contrast content canvas" },
      { role: "surface", label: "Digital White", hex: "#F9FBFF", usage: "Cards and structured content" },
      { role: "text", label: "Data Ink", hex: "#0C1426", usage: "Sharp, technical typography" },
      { role: "muted", label: "Signal Grey", hex: "#65738A", usage: "Supporting information" },
    ],
  },
  {
    id: "emerald-estate",
    number: "05",
    name: "Emerald Estate",
    family: "Heritage modern",
    description: "Deep racing green, parchment, and brass create a cultivated club-room sense of permanence.",
    bestFor: "Leather goods, festive tailoring, heritage storytelling",
    personality: ["Cultivated", "Warm", "Enduring"],
    palette: [
      { role: "primary", label: "Estate Green", hex: "#0D2B24", usage: "Brand fields and navigation" },
      { role: "secondary", label: "Racing Green", hex: "#1E4A3D", usage: "Depth and natural richness" },
      { role: "accent", label: "Aged Brass", hex: "#B79552", usage: "Buttons, seals and highlights" },
      { role: "accentSoft", label: "Sage Gold", hex: "#D0B879", usage: "Hover states and softer emphasis" },
      { role: "background", label: "Parchment", hex: "#F3EFE3", usage: "Warm editorial canvas" },
      { role: "surface", label: "Linen", hex: "#FBF9F2", usage: "Product cards and forms" },
      { role: "text", label: "Forest Ink", hex: "#11241F", usage: "Headings and narrative copy" },
      { role: "muted", label: "Moss Grey", hex: "#68776F", usage: "Supporting descriptions" },
    ],
  },
  {
    id: "burgundy-reserve",
    number: "06",
    name: "Burgundy Reserve",
    family: "Warm premium",
    description: "Oxblood, wine, and champagne tones built for a rich, expressive occasionwear presentation.",
    bestFor: "Wedding edits, festive campaigns, premium gifting",
    personality: ["Expressive", "Warm", "Ceremonial"],
    palette: [
      { role: "primary", label: "Oxblood", hex: "#3A111B", usage: "Primary brand and hero fields" },
      { role: "secondary", label: "Reserve Wine", hex: "#6A2636", usage: "Layered depth and emphasis" },
      { role: "accent", label: "Champagne Gold", hex: "#C8A56A", usage: "Primary actions and luxury detail" },
      { role: "accentSoft", label: "Rose Champagne", hex: "#E0C095", usage: "Hover and decorative highlights" },
      { role: "background", label: "Blush Stone", hex: "#F5EEEA", usage: "Soft campaign canvas" },
      { role: "surface", label: "Warm White", hex: "#FFF9F5", usage: "Cards and elevated surfaces" },
      { role: "text", label: "Wine Ink", hex: "#2B151A", usage: "Headings and formal copy" },
      { role: "muted", label: "Mauve Grey", hex: "#7A696D", usage: "Supporting information" },
    ],
  },
  {
    id: "arctic-minimal",
    number: "07",
    name: "Arctic Minimal",
    family: "Modern minimal",
    description: "Airy white space, cool slate, and glacial blue for a clean international retail experience.",
    bestFor: "Product-led catalogues, international buyers, modern basics",
    personality: ["Minimal", "Global", "Product-first"],
    palette: [
      { role: "primary", label: "Deep Slate", hex: "#172332", usage: "Navigation and confident contrast" },
      { role: "secondary", label: "Nordic Blue", hex: "#365A75", usage: "Cool depth and category fields" },
      { role: "accent", label: "Glacial Blue", hex: "#79AFC6", usage: "Actions and quiet distinction" },
      { role: "accentSoft", label: "Ice", hex: "#BBD9E4", usage: "Selected and hover states" },
      { role: "background", label: "Snow", hex: "#F4F7F8", usage: "Spacious retail canvas" },
      { role: "surface", label: "Pure White", hex: "#FFFFFF", usage: "Products, cards and forms" },
      { role: "text", label: "Slate Ink", hex: "#172332", usage: "Crisp readable typography" },
      { role: "muted", label: "Cool Grey", hex: "#6F7D87", usage: "Labels and supporting copy" },
    ],
  },
  {
    id: "terracotta-gallery",
    number: "08",
    name: "Terracotta Gallery",
    family: "Art direction",
    description: "Earthy terracotta, mineral ink, and gallery sand for an artistic, editorial fashion presentation.",
    bestFor: "Creative campaigns, artisan stories, seasonal collections",
    personality: ["Artful", "Tactile", "Contemporary"],
    palette: [
      { role: "primary", label: "Mineral Ink", hex: "#25201E", usage: "Navigation and graphic contrast" },
      { role: "secondary", label: "Burnt Clay", hex: "#7E493B", usage: "Art-led depth and sections" },
      { role: "accent", label: "Terracotta", hex: "#C47055", usage: "Buttons and expressive highlights" },
      { role: "accentSoft", label: "Apricot Sand", hex: "#DDA98D", usage: "Hover states and soft detail" },
      { role: "background", label: "Gallery Sand", hex: "#F1E9DE", usage: "Warm artistic canvas" },
      { role: "surface", label: "Canvas", hex: "#FBF7F1", usage: "Product and content surfaces" },
      { role: "text", label: "Mineral Black", hex: "#2A2320", usage: "Editorial typography" },
      { role: "muted", label: "Clay Grey", hex: "#786C66", usage: "Captions and descriptions" },
    ],
  },
  {
    id: "marketplace-mosaic",
    number: "09",
    name: "Marketplace Mosaic",
    family: "High-density commerce",
    description: "A discovery-first shopping portal with a large promotional story, colourful category cards, and compact deal tiles.",
    bestFor: "Large catalogues, offer-led retail, rapid category discovery",
    personality: ["Energetic", "Familiar", "Conversion-led"],
    palette: [
      { role: "primary", label: "Commerce Navy", hex: "#131A22", usage: "Navigation, utility bars and strong retail contrast" },
      { role: "secondary", label: "Marketplace Teal", hex: "#0B5C50", usage: "Category navigation and trusted service cues" },
      { role: "accent", label: "Deal Orange", hex: "#FF7A1A", usage: "Promotions, deal cards and primary actions" },
      { role: "accentSoft", label: "Offer Gold", hex: "#FFD36A", usage: "Savings, ratings and highlighted offers" },
      { role: "background", label: "Commerce Cloud", hex: "#E9EEF1", usage: "Dense marketplace canvas" },
      { role: "surface", label: "Card White", hex: "#FFFFFF", usage: "Product tiles and category modules" },
      { role: "text", label: "Retail Ink", hex: "#111827", usage: "Bold, direct shopping typography" },
      { role: "muted", label: "Utility Grey", hex: "#667085", usage: "Secondary labels and supporting details" },
    ],
  },
];

export function getStoreTheme(id: string) {
  return storeThemes.find((theme) => theme.id === id) ?? storeThemes[0];
}
