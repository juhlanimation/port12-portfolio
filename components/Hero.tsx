"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { brand, heroAnimation, assets } from "@/lib/config";

interface HeroProps {
  onCoverProgress?: (progress: number) => void;
  onIntroComplete?: () => void;
}

// Get stable viewport height using CSS svh (small viewport height)
// This doesn't change when mobile URL bar shows/hides
function getStableViewportHeight(): number {
  if (typeof document === "undefined") return 0;
  const el = document.createElement("div");
  el.style.height = "100svh";
  el.style.position = "absolute";
  el.style.top = "-9999px";
  document.body.appendChild(el);
  const height = el.offsetHeight;
  document.body.removeChild(el);
  return height;
}

export function Hero({ onCoverProgress, onIntroComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const viewportHeightRef = useRef<number>(0);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);

  // Video frame logic with precise RAF-based timing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    // Use requestAnimationFrame for precise frame-level timing
    const checkVideoTime = () => {
      if (!showText && video.currentTime >= heroAnimation.textAppearTime) {
        setShowText(true);
        return; // Stop checking once text is shown
      }
      rafId = requestAnimationFrame(checkVideoTime);
    };

    // When video ends, loop back to configured frame
    const handleEnded = () => {
      video.currentTime = heroAnimation.loopStartTime;
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
    const viewportHeight = viewportHeightRef.current || window.innerHeight;
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
    // Cache stable viewport height
    viewportHeightRef.current = getStableViewportHeight();

    const handleResize = () => {
      viewportHeightRef.current = getStableViewportHeight();
      calculateCoverProgress();
    };

    calculateCoverProgress();
    gsap.ticker.add(calculateCoverProgress);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      gsap.ticker.remove(calculateCoverProgress);
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateCoverProgress]);

  return (
    <section className="section h-svh relative overflow-hidden">
      {/* Video Background - fixed on all devices for cover effect */}
      <video
        ref={videoRef}
        className="fixed inset-0 z-0 w-full h-svh object-cover object-center"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={`${assets.video.showreel}.webm`} type="video/webm" />
        <source src={`${assets.video.showreel}.mp4`} type="video/mp4" />
      </video>

      {/* Content - fixed on all devices for cover effect */}
      <div
        ref={textContainerRef}
        className="fixed inset-x-0 top-0 z-0 h-svh flex flex-col items-center justify-center pointer-events-none mix-blend-difference"
        style={{ opacity: 0 }}
      >
        {/* Title */}
        <h1
          ref={titleRef}
          className="font-title font-bold uppercase text-center leading-none tracking-wider text-white"
          style={{
            fontSize: "clamp(4rem, 20vw, 20rem)",
            width: "80%",
          }}
        >
          {brand.name}
        </h1>

        {/* Tagline */}
        <p
          className="font-heading uppercase tracking-[0.3em] mt-4 text-center text-white"
          style={{
            fontSize: "clamp(0.75rem, 2vw, 1.5rem)",
          }}
        >
          {brand.tagline}
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
          <span className="font-heading text-sm uppercase tracking-widest text-white block touch:hidden">
            (SCROLL)
          </span>
        </div>
      )}
    </section>
  );
}
