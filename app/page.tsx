"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Logo } from "@/components/Logo";
import { Om } from "@/components/Om";
import { Medlemmer } from "@/components/Medlemmer";
import { Medlemskab } from "@/components/Medlemskab";
import { Footer } from "@/components/Footer";
import { useSnapScroll } from "@/hooks/useSnapScroll";
import { useLenis } from "@/components/SmoothScroll";

export default function Home() {
  const [coverProgress, setCoverProgress] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const { start: startLenis } = useLenis();

  // Start Lenis when intro completes
  useEffect(() => {
    if (introComplete) {
      startLenis();
    }
  }, [introComplete, startLenis]);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Snap scroll only on Hero and Medlemmer sections
  useSnapScroll({ threshold: 0.2, delay: 500, duration: 1.2, sectionSelector: ".snap-section" });

  return (
    <main>
      <Logo revealProgress={coverProgress} />
      <Navbar visible={introComplete} />

      {/* HERO Section */}
      <Hero onCoverProgress={setCoverProgress} onIntroComplete={handleIntroComplete} />

      {/* Sections wrapper */}
      <div className="relative z-10">

        {/* OM Section */}
        <Om />

        {/* MEDLEMMER Section */}
        <Medlemmer />

        {/* MEDLEMSKAB Section */}
        <Medlemskab />

        {/* FOOTER Section */}
        <Footer />
      </div>
    </main>
  );
}
