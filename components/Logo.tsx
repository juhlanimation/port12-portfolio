"use client";

import { brand } from "@/lib/config";

interface LogoProps {
  revealProgress?: number;
}

export function Logo({ revealProgress = 0 }: LogoProps) {
  // Clip from left to right: at 0% fully hidden, at 100% fully visible
  const clipRight = 100 - revealProgress;

  return (
    <div
      className="sticky top-5 z-50 ml-5 w-fit mix-blend-difference text-white"
      style={{ clipPath: `inset(0 ${clipRight}% 0 0)` }}
    >
      <span className="font-title font-bold text-xl uppercase tracking-wider">
        {brand.name}
      </span>
    </div>
  );
}
