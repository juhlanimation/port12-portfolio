"use client";

import Link from "next/link";
import { brand, contact, navLinks } from "@/lib/config";

export function Footer() {
  return (
    <footer className="section-footer bg-foreground relative">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-0 py-6 px-8 sm:px-20 md:px-32 lg:px-48">
        {/* Logo and Copyright - First on mobile, center on desktop */}
        <div className="order-1 md:order-2 flex-1 flex flex-col items-center justify-center gap-2">
          <span className="font-title font-bold text-4xl md:text-5xl uppercase tracking-wider text-white">
            {brand.name}
          </span>
          <p className="font-body text-[10px] text-white tracking-wide">
            Copyright © All rights reserved.
          </p>
        </div>

        {/* Navigation Links - Second on mobile, left on desktop */}
        <div className="order-2 md:order-1 flex-1 flex flex-col items-center md:items-start gap-0.5">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer-link">
              {link.fullLabel}
            </Link>
          ))}
        </div>

        {/* Contact Info - Third on mobile, right on desktop */}
        <div className="order-3 flex-1 flex flex-col items-center md:items-end gap-0.5">
          <a
            href={`mailto:${contact.email}`}
            className="font-body text-xs text-white hover:opacity-70 transition-opacity"
          >
            Mail: {contact.email}
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="font-body text-xs text-white hover:opacity-70 transition-opacity"
          >
            Tlf. {contact.phoneDisplay}
          </a>
          <span className="font-body text-xs text-white">
            {contact.address.full}
          </span>
        </div>
      </div>
    </footer>
  );
}
