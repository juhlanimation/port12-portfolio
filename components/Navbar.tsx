"use client";

import { contact, navLinks } from "@/lib/config";

interface NavbarProps {
  visible?: boolean;
}

export function Navbar({ visible = true }: NavbarProps) {
  if (!visible) return null;

  return (
    <nav className="fixed top-0 right-0 z-50 px-8 pt-5 mix-blend-difference hidden md:block touch:hidden!">
      <div className="flex items-center gap-12 font-heading text-sm uppercase tracking-widest text-white">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
        <span className="-ml-8 h-3 w-px bg-white/50 self-center" />
        <a
          href={`mailto:${contact.email}`}
          className="-ml-8 font-light text-[10px] no-underline hover:no-underline self-center leading-none"
        >
          {contact.email}
        </a>
      </div>
    </nav>
  );
}
