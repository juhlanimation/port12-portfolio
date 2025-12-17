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
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Start stopped - will be started when intro completes
    lenisInstance.stop();

    setLenis(lenisInstance);

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // RAF loop using GSAP ticker
    const raf = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenisInstance.destroy();
    };
  }, []);

  const start = useCallback(() => {
    lenis?.start();
  }, [lenis]);

  const stop = useCallback(() => {
    lenis?.stop();
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
