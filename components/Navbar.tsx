"use client";

interface NavbarProps {
  visible?: boolean;
}

export function Navbar({ visible = true }: NavbarProps) {
  if (!visible) return null;

  return (
    <nav className="fixed top-0 right-0 z-50 px-8 pt-5 mix-blend-difference hidden md:block touch:hidden!">
      <div
        className="flex items-center gap-12 font-title text-sm uppercase tracking-widest text-white"
      >
        <a href="#om" className="nav-link">
          Om
        </a>
        <a href="#medlemmer" className="nav-link">
          Medlemmer
        </a>
        <a href="#medlemskab" className="nav-link">
          Medlemskab
        </a>
        <span className="-ml-8 h-3 w-px bg-white/50 self-center" />
        <a href="mailto:info@port12.dk" className="-ml-8 font-light text-[10px] no-underline hover:no-underline self-center leading-none">
          info@port12.dk
        </a>
      </div>
    </nav>
  );
}
