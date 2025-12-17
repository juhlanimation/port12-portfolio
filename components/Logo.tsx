"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LogoProps {
  revealProgress?: number;
}

export function Logo({ revealProgress = 0 }: LogoProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      // Animate position based on scroll - starts below viewport, moves to top
      const top = Math.max(20, window.innerHeight + 20 - window.scrollY);
      ref.current.style.top = `${top}px`;
    };

    update();
    gsap.ticker.add(update);
    window.addEventListener("resize", update, { passive: true });

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Clip from left to right: at 0% fully hidden, at 100% fully visible
  const clipRight = 100 - revealProgress;

  return (
    <div
      ref={ref}
      className="fixed left-5 z-50 mix-blend-difference text-white"
      style={{ clipPath: `inset(0 ${clipRight}% 0 0)` }}
    >
      <span className="font-title font-bold text-xl uppercase tracking-wider">
        PORT12
      </span>
    </div>
  );
}
