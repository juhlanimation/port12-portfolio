"use client";

import { useEffect, useState, createContext, useContext, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextType {
  start: () => void;
  stop: () => void;
}

const LenisContext = createContext<LenisContextType>({
  start: () => {},
  stop: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenisInstance = new Lenis({
      // Reduced duration for snappier feel (especially on Mac trackpads)
      duration: prefersReducedMotion ? 0 : 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    });

    // Start stopped - will be started when intro completes
    lenisInstance.stop();
    // Also block native scroll initially to prevent bypassing Lenis
    document.documentElement.style.overflow = "hidden";

    setLenis(lenisInstance);

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // RAF loop using GSAP ticker
    const raf = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    // Re-enable lag smoothing for better performance on slower devices
    // (threshold: 500ms, adjustedLag: 33ms ~= 30fps fallback)
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(raf);
      lenisInstance.destroy();
      // Clean up overflow style
      document.documentElement.style.overflow = "";
    };
  }, []);

  const start = useCallback(() => {
    lenis?.start();
    // Re-enable native scroll
    document.documentElement.style.overflow = "";
  }, [lenis]);

  const stop = useCallback(() => {
    lenis?.stop();
    // Also block native scroll to prevent bypassing Lenis
    document.documentElement.style.overflow = "hidden";
  }, [lenis]);

  const contextValue: LenisContextType = {
    start,
    stop,
  };

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}
