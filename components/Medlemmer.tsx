"use client";

import { useEffect, useRef, useState } from "react";
import { members, memberVideoSources, breakpoints } from "@/lib/config";

export function Medlemmer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // State for rendering
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoints.md);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile: viewport center selection
  useEffect(() => {
    if (!isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const sectionRect = section.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;

        // Check if section is at viewport center
        if (sectionRect.top > viewportCenter || sectionRect.bottom < viewportCenter) {
          setSelectedIndex(null);
          setActiveVideoSrc(null);
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

        // Find which member to select based on closest boundary
        let foundIndex = 0;
        for (let i = 0; i < headerCenters.length - 1; i++) {
          const midpoint = (headerCenters[i] + headerCenters[i + 1]) / 2;
          if (viewportCenter > midpoint) {
            foundIndex = i + 1;
          }
        }

        setSelectedIndex(foundIndex);
        setActiveVideoSrc(members[foundIndex].videoSrc || null);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Desktop: handle hover selection
  const handleMemberHover = (index: number) => {
    if (isMobile) return;
    setSelectedIndex(index);
    setActiveVideoSrc(members[index].videoSrc || null);
  };

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
        className="fixed inset-x-0 top-0 z-40 h-svh pointer-events-none transition-opacity duration-500"
        style={{ opacity: activeVideoSrc ? 1 : 0 }}
      >
        {memberVideoSources.map((src) => (
          <video
            key={src}
            ref={(el) => {
              if (el) videoRefs.current.set(src, el);
            }}
            src={src}
            className="absolute inset-0 w-full h-svh object-cover transition-opacity duration-500"
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
        className="section relative overflow-hidden my-32 md:my-48 lg:my-64"
      >
        {/* Background layer */}
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-50 h-full flex flex-col justify-center py-16 md:py-0 mix-blend-difference text-white">
          <p className="relative z-10 font-body text-base font-black tracking-widest mb-2 container-padding">
            Vi er
          </p>
          <div className="flex flex-col gap-4 md:gap-0">
            {members.map((member, index) => (
              <div
                key={member.name}
                ref={(el) => { headerRefs.current[index] = el; }}
                onMouseEnter={() => handleMemberHover(index)}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setSelectedIndex(null);
                    setActiveVideoSrc(null);
                  }
                }}
                className="container-padding"
              >
                <h2
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
                </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
