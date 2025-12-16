import type { Metadata } from "next";
import "./globals.css";
import { inter, plusJakarta } from "./fonts";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "PORT12",
  description: "DRØM • DEL • SKAB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body
        className={`${inter.variable} ${plusJakarta.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
