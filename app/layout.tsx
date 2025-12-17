import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter, plusJakarta } from "./fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import { brand, contact, seo, assets } from "@/lib/config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Prevents layout shift when mobile URL bar shows/hides
  interactiveWidget: "resizes-visual",
};

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: seo.title,
    template: `%s | ${brand.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: brand.url,
    siteName: brand.name,
    title: seo.title,
    description: seo.shortDescription,
    images: [
      {
        url: assets.images.ogImage,
        width: 1200,
        height: 630,
        alt: `${brand.name} - Kontorfællesskab i Ry`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.shortDescription,
    images: [assets.images.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: brand.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: brand.name,
  description: seo.shortDescription,
  url: brand.url,
  telephone: contact.phone,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    postalCode: contact.address.postalCode,
    addressCountry: contact.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: contact.geo.latitude,
    longitude: contact.geo.longitude,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: seo.priceRange,
  image: `${brand.url}${assets.images.ogImage}`,
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
