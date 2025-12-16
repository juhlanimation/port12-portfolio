"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

interface HeroProps {
  onCoverProgress?: (progress: number) => void;
  onIntroComplete?: () => void;
}

const FRAME_RATE = 25;
const LOOP_START_FRAME = 85;
const TEXT_APPEAR_FRAME = 78;
const LOOP_START_TIME = LOOP_START_FRAME / FRAME_RATE;
const TEXT_APPEAR_TIME = TEXT_APPEAR_FRAME / FRAME_RATE;

export function Hero({ onCoverProgress, onIntroComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);

  // Video frame logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle time updates to detect when we reach the text appear frame
    const handleTimeUpdate = () => {
      if (!showText && video.currentTime >= TEXT_APPEAR_TIME) {
        setShowText(true);
      }
    };

    // When video ends, loop back to frame 85
    const handleEnded = () => {
      video.currentTime = LOOP_START_TIME;
      video.play();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
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
    <section className="section snap-section relative">
      {/* Fixed Video Background - z-0 so sections slide over it */}
      <video
        ref={videoRef}
        className="fixed inset-0 z-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/video/showreel.webm" type="video/webm" />
        <source src="/video/showreel.mp4" type="video/mp4" />
      </video>

      {/* Fixed Content - stays centered, slides under next section */}
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
          <span className="font-title text-sm uppercase tracking-widest text-white">
            (SCROLL)
          </span>
        </div>
      )}
    </section>
  );
}
