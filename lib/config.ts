// =============================================================================
// SITE CONFIGURATION
// Centralized configuration for all site data following DRY principles
// Last updated: 2026-01-19 - Updated Maria Kjær with Strejf Studio video and portfolio
// =============================================================================

// -----------------------------------------------------------------------------
// Brand
// -----------------------------------------------------------------------------
export const brand = {
  name: "PORT12",
  tagline: "DRØM • DEL • SKAB",
  url: "https://port12.dk",
} as const;

// -----------------------------------------------------------------------------
// Contact Information
// -----------------------------------------------------------------------------
export const contact = {
  email: "info@port12.dk",
  phone: "+4531378089",
  phoneDisplay: "31378089",
  address: {
    full: "Kløftehøj 3 / 8680 Ry",
    street: "Kløftehøj 3",
    city: "Ry",
    postalCode: "8680",
    country: "DK",
  },
  geo: {
    latitude: 56.0887,
    longitude: 9.7609,
  },
} as const;

// -----------------------------------------------------------------------------
// Navigation Links
// -----------------------------------------------------------------------------
export const navLinks = [
  { href: "#om", label: "Om", fullLabel: "OM PORT12" },
  { href: "#medlemmer", label: "Medlemmer", fullLabel: "MEDLEMMER" },
  { href: "#medlemskab", label: "Medlemskab", fullLabel: "MEDLEMSKAB" },
] as const;

// -----------------------------------------------------------------------------
// Members Data
// -----------------------------------------------------------------------------
export interface Member {
  name: string;
  videoSrc?: string;
  portfolioUrl?: string;
}

export const members: Member[] = [
  { name: "Rune Svenningsen", videoSrc: "/video/RS_Port12_Showreel_2.webm", portfolioUrl: "https://runesvenningsen.dk" },
  { name: "Maria Tranberg", videoSrc: "/video/MARIAT.webm", portfolioUrl: "https://mariatranberg.com" },
  { name: "Nicolaj Larsson", videoSrc: "/video/NL_Port12_Showreel_v2.webm", portfolioUrl: "https://ccccccc.tv" },
  { name: "Tor Birk Trads", videoSrc: "/video/TorBirkTrads2.webm", portfolioUrl: "https://www.torbirktrads.dk" },
  { name: "Bo Juhl", videoSrc: "/video/BJ_Port12_Showreel_v1.webm", portfolioUrl: "https://bojuhl.com" },
  { name: "Maria Kjær", videoSrc: "/video/StrejfStudio_Showreel_2025_v3.webm", portfolioUrl: "https://www.linkedin.com/in/maria-kjær-nørgaard/" },
];

// Derived: unique video sources for preloading
export const memberVideoSources = [...new Set(members.map(m => m.videoSrc).filter(Boolean))] as string[];

// -----------------------------------------------------------------------------
// Membership Plans
// -----------------------------------------------------------------------------
export interface PlanFeature {
  name: string;
  flex: boolean | "plus";
  allIn: boolean | "plus";
}

// Single source of truth for all features
export const planFeatures: PlanFeature[] = [
  { name: "Fri adgang 24/7", flex: true, allIn: true },
  { name: "Egen nøgle", flex: true, allIn: true },
  { name: "Wi-Fi (1000 Mbit)", flex: true, allIn: true },
  { name: "Printer & scanner", flex: true, allIn: true },
  { name: "Bord & stol", flex: true, allIn: true },
  { name: "Mødelokale", flex: true, allIn: true },
  { name: "Egen fast plads", flex: false, allIn: true },
  { name: "Reol plads", flex: false, allIn: true },
  { name: "Tilkøb kaffe", flex: "plus", allIn: "plus" },
];

export const plans = {
  flex: {
    name: "FLEX",
    price: "1.300 DKK",
    description: "Frihed og fleksibilitet.\nBetal kun for adgang, ikke for plads.",
    illustration: "/images/FLEX_Illustration_2.webp",
  },
  allIn: {
    name: "ALL-IN",
    price: "2.000 DKK",
    description: "Dit second home.\nFast plads uden krav om at rydde op.",
    illustration: "/images/ALL-IN_Illustration_3.webp",
  },
} as const;

// Helper to get features for a specific plan
export function getFeaturesForPlan(planKey: "flex" | "allIn") {
  return planFeatures.map(f => ({
    name: f.name,
    value: f[planKey] === true,
    type: f[planKey] === "plus" ? ("plus" as const) : undefined,
  }));
}

// -----------------------------------------------------------------------------
// Animation Constants
// -----------------------------------------------------------------------------
export const heroAnimation = {
  frameRate: 25,
  loopStartFrame: 85,
  textAppearFrame: 80,
  get loopStartTime() { return this.loopStartFrame / this.frameRate; },
  get textAppearTime() { return this.textAppearFrame / this.frameRate; },
} as const;

// -----------------------------------------------------------------------------
// Breakpoints (matching Tailwind defaults)
// -----------------------------------------------------------------------------
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// -----------------------------------------------------------------------------
// Site Content
// -----------------------------------------------------------------------------
export const siteContent = {
  about: `Port12 er et kontorfællesskab, men vi er sgu mere fællesskab end vi er kontor.

Godt nok sidder vi meget på vores flade og hakker i tastaturerne, men vi går mere op i at spille hinanden gode ved at dele: viden, erfaring, opgaver og inspiration.

Det er dén energi, du tapper ind i hos Port12 i Ry. Kom forbi og smag kaffen!`,
  contactCta: {
    title: "KONTAKT OS",
    lines: [
      "Hiv fat hvis du har spørgsmål.",
      "Eller kom og mød os.",
      "Vi bider ikke. Tværtimod.",
    ],
  },
} as const;

// -----------------------------------------------------------------------------
// Assets
// -----------------------------------------------------------------------------
export const assets = {
  video: {
    showreel: "/video/showreel",
  },
  images: {
    kontaktIllustration: "/images/kontakt-illustration.webp",
    ogImage: "/og-image.webp",
    om: {
      mobile: [
        { src: "/images/1.webp", alt: "Port12", aspect: "3/4", width: "65%" },
        { src: "/images/2.webp", alt: "Port12", aspect: "3/2", width: "70%" },
        { src: "/images/3.webp", alt: "Port12", aspect: "3/4", width: "60%" },
        { src: "/images/4.webp", alt: "Port12", aspect: "3/2", width: "65%" },
      ],
      desktop: [
        { src: "/images/844A8660.webp", alt: "Port12 medlemmer", top: "6vw", left: "58vw", width: "28vw", height: "20vw", objectFit: "contain", objectPosition: "top" },
        { src: "/images/port12-fest.webp", alt: "Port12 fællesskab event", top: "26vw", left: "8vw", width: "26vw", height: "17vw", objectFit: "contain", objectPosition: "left" },
        { src: "/images/3.webp", alt: "Port12", top: "38vw", left: "54vw", width: "26vw", height: "17vw", objectFit: "contain", objectPosition: "left" },
        { src: "/images/4.webp", alt: "Port12", top: "52vw", left: "16vw", width: "22vw", height: "14vw", objectFit: "contain", objectPosition: "left" },
      ],
    },
  },
} as const;

// -----------------------------------------------------------------------------
// SEO / Metadata
// -----------------------------------------------------------------------------
export const seo = {
  title: `${brand.name} | Kontorfællesskab i Ry`,
  description: "Port12 er et kreativt kontorfællesskab i Ry. Vi deler viden, erfaring, opgaver og inspiration. Fleksible medlemskaber fra 1.300 DKK/md. DRØM • DEL • SKAB",
  shortDescription: "Port12 er et kreativt kontorfællesskab i Ry. Vi deler viden, erfaring, opgaver og inspiration.",
  keywords: [
    "kontorfællesskab",
    "coworking",
    "Ry",
    "kreativt fællesskab",
    "kontor",
    "freelance",
    "workspace",
    "Skanderborg",
    "Aarhus",
  ],
  priceRange: `${plans.flex.price.replace(" DKK", "")}-${plans.allIn.price.replace(" DKK", "")} DKK/md`,
} as const;
