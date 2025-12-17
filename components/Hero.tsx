"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

interface HeroProps {
  onCoverProgress?: (progress: number) => void;
  onIntroComplete?: () => void;
}

const FRAME_RATE = 25;
const LOOP_START_FRAME = 85;
const TEXT_APPEAR_FRAME = 80;
const LOOP_START_TIME = LOOP_START_FRAME / FRAME_RATE;
const TEXT_APPEAR_TIME = TEXT_APPEAR_FRAME / FRAME_RATE;

export function Hero({ onCoverProgress, onIntroComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);

  // Video frame logic with precise RAF-based timing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    // Use requestAnimationFrame for precise frame-level timing
    const checkVideoTime = () => {
      if (!showText && video.currentTime >= TEXT_APPEAR_TIME) {
        setShowText(true);
        return; // Stop checking once text is shown
      }
      rafId = requestAnimationFrame(checkVideoTime);
    };

    // When video ends, loop back to frame 85
    const handleEnded = () => {
      video.currentTime = LOOP_START_TIME;
      video.play().catch(() => {});
    };

    // Start RAF loop when video can play
    const startChecking = () => {
      rafId = requestAnimationFrame(checkVideoTime);
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", startChecking);

    // Start immediately if video is already ready
    if (video.readyState >= 3) {
      startChecking();
    }

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", startChecking);
    };
  }, [showText]);

  // Show text instantly when showText becomes true
  useEffect(() => {
    if (showText && textContainerRef.current) {
      gsap.set(textContainerRef.current, { opacity: 1 });
      onIntroComplete?.();
    }
  }, [showText, onIntroComplete]);

  // Cover progress calculation
  const calculateCoverProgress = useCallback(() => {
    if (!titleRef.current) return;

    const titleRect = titleRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionWrapperTop = viewportHeight - window.scrollY;
    const titleTop = titleRect.top;
    const titleBottom = titleRect.bottom;
    const titleHeight = titleBottom - titleTop;

    let progress: number;
    if (sectionWrapperTop >= titleBottom) {
      progress = 0;
    } else if (sectionWrapperTop <= titleTop) {
      progress = 100;
    } else {
      const coveredAmount = titleBottom - sectionWrapperTop;
      progress = Math.min(100, Math.max(0, (coveredAmount / titleHeight) * 100));
    }

    onCoverProgress?.(progress);

    // Pause video when scrolled past hero section
    const video = videoRef.current;
    if (video) {
      if (progress >= 100) {
        video.pause();
      } else if (video.paused && progress < 100) {
        video.play().catch(() => {});
      }
    }
  }, [onCoverProgress]);

  useEffect(() => {
    calculateCoverProgress();
    gsap.ticker.add(calculateCoverProgress);
    window.addEventListener("resize", calculateCoverProgress, { passive: true });

    return () => {
      gsap.ticker.remove(calculateCoverProgress);
      window.removeEventListener("resize", calculateCoverProgress);
    };
  }, [calculateCoverProgress]);

  return (
    <section className="section relative overflow-hidden">
      {/* Video Background - fixed on all devices for cover effect */}
      <video
        ref={videoRef}
        className="fixed inset-0 z-0 w-full h-full object-cover object-center"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/video/showreel.webm" type="video/webm" />
        <source src="/video/showreel.mp4" type="video/mp4" />
      </video>

      {/* Content - fixed on all devices for cover effect */}
      <div
        ref={textContainerRef}
        className="fixed inset-0 z-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference"
        style={{ opacity: 0 }}
      >
        {/* PORT12 Title */}
        <h1
          ref={titleRef}
          className="font-title font-bold uppercase text-center leading-none text-white"
          style={{
            fontSize: "clamp(4rem, 20vw, 20rem)",
            width: "80%",
          }}
        >
          PORT12
        </h1>

        {/* Subtitle */}
        <p
          className="font-title uppercase tracking-[0.3em] mt-4 text-center text-white"
          style={{
            fontSize: "clamp(0.75rem, 2vw, 1.5rem)",
          }}
        >
          DRØM • DEL • SKAB
        </p>
      </div>

      {/* Scroll indicator at bottom - only shows after intro */}
      {showText && (
        <div className="fixed bottom-8 left-0 right-0 z-0 flex justify-center pointer-events-none mix-blend-difference">
          {/* Arrow for touch devices */}
          <svg
            className="w-6 h-6 text-white hidden touch:block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          {/* Text for non-touch devices */}
          <span className="font-title text-sm uppercase tracking-widest text-white block touch:hidden">
            (SCROLL)
          </span>
        </div>
      )}
    </section>
  );
}
