"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="section-footer bg-foreground relative">
      <div className="h-full flex items-start pt-6 px-12 sm:px-20 md:px-32 lg:px-48">
        {/* Left - Navigation Links */}
        <div className="flex-1 flex flex-col gap-0.5">
          <Link
            href="#om"
            className="font-body text-xs uppercase tracking-widest text-white hover:opacity-70 transition-opacity"
          >
            OM PORT12
          </Link>
          <Link
            href="#medlemmer"
            className="font-body text-xs uppercase tracking-widest text-white font-bold hover:opacity-70 transition-opacity"
          >
            MEDLEMMER
          </Link>
          <Link
            href="#medlemskab"
            className="font-body text-xs uppercase tracking-widest text-white hover:opacity-70 transition-opacity"
          >
            MEDLEMSKAB
          </Link>
        </div>

        {/* Center - Logo and Copyright */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <span className="font-title font-bold text-4xl md:text-5xl uppercase tracking-wider text-white">
            PORT12
          </span>
          <p className="font-body text-[10px] text-white tracking-wide">
            Copyright © All rights reserved.
          </p>
        </div>

        {/* Right - Contact Info */}
        <div className="flex-1 flex flex-col items-end gap-0.5">
          <a
            href="mailto:info@port12.dk"
            className="font-body text-xs text-white hover:opacity-70 transition-opacity"
          >
            Mail: info@port12.dk
          </a>
          <a
            href="tel:+4531378089"
            className="font-body text-xs text-white hover:opacity-70 transition-opacity"
          >
            Tlf. 31378089
          </a>
          <span className="font-body text-xs text-white">
            Kløftehøj 3 / 8680 Ry
          </span>
        </div>
      </div>
    </footer>
  );
}
