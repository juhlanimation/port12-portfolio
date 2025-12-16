import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// Plus Jakarta Sans - Clean geometric sans-serif for paragraphs
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

// Inter - For titles and headings
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});
