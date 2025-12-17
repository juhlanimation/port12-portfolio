"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Member {
  name: string;
  videoSrc?: string;
  portfolioUrl?: string;
}

const members: Member[] = [
  { name: "Rune Svenningsen", videoSrc: "/video/RS_Port12_Showreel_2.webm", portfolioUrl: "https://runesvenningsen.dk" },
  { name: "Maria Tranberg", portfolioUrl: "https://mariatranberg.dk" },
  { name: "Nicolaj Larsson", videoSrc: "/video/NL_Port12_ShowReel_v1.webm", portfolioUrl: "https://nicolajlarsson.dk" },
  { name: "Tor Birk Trads", videoSrc: "/video/TorBirkTrads.webm", portfolioUrl: "https://torbirktrads.dk" },
  { name: "Bo Juhl", videoSrc: "/video/BJ_Port12_Showreel_v1.webm", portfolioUrl: "https://bojuhl.dk" },
  { name: "Maria Kjær", portfolioUrl: "https://mariakjaer.dk" },
];

// Get unique video sources for preloading
const videoSources = [...new Set(members.map(m => m.videoSrc).filter(Boolean))] as string[];

export function Medlemmer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Use refs to track selection without causing unnecessary re-renders
  const selectedIndexRef = useRef<number | null>(null);
  const currentVideoSrcRef = useRef<string | null>(null);

  // State for rendering only
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);

  // Member selection based on mouse position (desktop) or viewport center (touch)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    let lastMouseY = window.innerHeight / 2;
    let hasInteracted = false; // Only select after user interaction

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      lastMouseY = e.clientY;

      // Check if mouse is inside section to enable selection
      const rect = section.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        hasInteracted = true;
      }
    };

    const handleTick = () => {
      if (isTouch) {
        // On touch, check if section is visible at viewport center
        const rect = section.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          hasInteracted = true;
        }
      }

      // Only check selection after user has interacted with the section
      if (!hasInteracted) return;

      // Determine selector Y position: viewport center on touch, mouse position on desktop
      const selectorY = isTouch ? window.innerHeight / 2 : lastMouseY;

      // Check if selector is within section bounds
      const sectionRect = section.getBoundingClientRect();
      if (selectorY < sectionRect.top || selectorY > sectionRect.bottom) {
        // Outside section - clear selection
        if (selectedIndexRef.current !== null) {
          selectedIndexRef.current = null;
          setSelectedIndex(null);
          currentVideoSrcRef.current = null;
          setActiveVideoSrc(null);
        }
        return;
      }

      // Calculate header centers for boundary detection
      const headerCenters: number[] = [];
      for (let i = 0; i < headerRefs.current.length; i++) {
        const header = headerRefs.current[i];
        if (!header) continue;
        const rect = header.getBoundingClientRect();
        headerCenters.push(rect.top + rect.height / 2);
      }

      // Find which member to select based on closest boundary (midpoint between headers)
      let foundIndex = 0; // Default to first member
      for (let i = 0; i < headerCenters.length - 1; i++) {
        const midpoint = (headerCenters[i] + headerCenters[i + 1]) / 2;
        if (selectorY > midpoint) {
          foundIndex = i + 1;
        }
      }

      // Only update state if selection actually changed
      if (foundIndex !== selectedIndexRef.current) {
        selectedIndexRef.current = foundIndex;
        setSelectedIndex(foundIndex);

        // Handle video - foundIndex is always valid when inside section
        const member = members[foundIndex];
        if (member.videoSrc && member.videoSrc !== currentVideoSrcRef.current) {
          currentVideoSrcRef.current = member.videoSrc;
          setActiveVideoSrc(member.videoSrc);
        } else if (!member.videoSrc && currentVideoSrcRef.current !== null) {
          currentVideoSrcRef.current = null;
          setActiveVideoSrc(null);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(handleTick);

    // Initial check
    handleTick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(handleTick);
    };
  }, []); // No dependencies - runs once

  // Handle video playback - play/pause based on active video
  useEffect(() => {
    videoRefs.current.forEach((video, src) => {
      if (src === activeVideoSrc) {
        video.play().catch(() => {
          // Autoplay might be blocked
        });
      } else {
        video.pause();
      }
    });
  }, [activeVideoSrc]);

  return (
    <>
      {/* Fullscreen video layer - fixed to viewport, behind everything */}
      <div
        className="fixed inset-0 z-40 pointer-events-none transition-opacity duration-500"
        style={{ opacity: activeVideoSrc ? 1 : 0 }}
      >
        {videoSources.map((src) => (
          <video
            key={src}
            ref={(el) => {
              if (el) videoRefs.current.set(src, el);
            }}
            src={src}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: activeVideoSrc === src ? 1 : 0 }}
            muted
            loop
            playsInline
            preload="auto"
          />
        ))}
      </div>

      <section
        ref={sectionRef}
        id="medlemmer"
        className="section h-auto! md:h-screen! relative overflow-hidden"
      >
        {/* Background layer */}
        <div className="absolute inset-0 bg-background" />

      <div className="relative z-50 h-full flex flex-col justify-center px-6 py-16 md:py-0 sm:px-12 md:px-24 lg:px-32 xl:px-48 mix-blend-difference text-white">
        <p className="font-body text-base font-black tracking-widest mb-2">
          Vi er
        </p>
        <div className="flex flex-col gap-4 md:gap-0">
          {members.map((member, index) => (
            <h2
              key={member.name}
              ref={(el) => { headerRefs.current[index] = el; }}
              className="font-title text-[12vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-[0.9] md:leading-none md:whitespace-nowrap transition-opacity duration-300"
              style={{
                opacity: selectedIndex !== null && selectedIndex !== index ? 0.2 : 1,
              }}
            >
              {member.portfolioUrl ? (
                <a
                  href={member.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:opacity-70 transition-opacity pointer-events-auto"
                >
                  {member.name}
                </a>
              ) : (
                member.name
              )}
            </h2>
          ))}
        </div>
      </div>
      </section>
    </>
  );
}
