"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Logo } from "@/components/Logo";
import { Om } from "@/components/Om";
import { Medlemmer } from "@/components/Medlemmer";
import { Medlemskab } from "@/components/Medlemskab";
import { Footer } from "@/components/Footer";
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

  return (
    <main>
      <Navbar visible={introComplete} />

      {/* HERO Section */}
      <Hero onCoverProgress={setCoverProgress} onIntroComplete={handleIntroComplete} />

      {/* Sections wrapper - bg covers the fixed hero video */}
      <div className="relative z-10 bg-background pt-5">
        <Logo revealProgress={coverProgress} />

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
