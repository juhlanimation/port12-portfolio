"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Member {
  name: string;
  videoSrc?: string;
}

const members: Member[] = [
  { name: "Rune Svenningsen", videoSrc: "/video/RS_Port12_Showreel_2.webm" },
  { name: "Maria Tranberg" },
  { name: "Nicolaj Larsson", videoSrc: "/video/NL_Port12_ShowReel_v1.webm" },
  { name: "Tor Birk Trads", videoSrc: "/video/TorBirkTrads.webm" },
  { name: "Bo Juhl", videoSrc: "/video/BJ_Port12_Showreel_v1.webm" },
  { name: "Maria Kjær" },
];

// Get unique video sources for preloading
const videoSources = [...new Set(members.map(m => m.videoSrc).filter(Boolean))] as string[];

export function Medlemmer() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Use refs to track selection without causing re-renders that affect the line
  const selectedIndexRef = useRef<number | null>(null);
  const currentVideoSrcRef = useRef<string | null>(null);

  // State for rendering only
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);

  // Handle hover to play video
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const member = members[index];
    if (member.videoSrc) {
      setActiveVideoSrc(member.videoSrc);
      currentVideoSrcRef.current = member.videoSrc;
    } else {
      setActiveVideoSrc(null);
      currentVideoSrcRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    // Restore video based on line selection
    if (selectedIndexRef.current !== null) {
      const member = members[selectedIndexRef.current];
      if (member.videoSrc) {
        setActiveVideoSrc(member.videoSrc);
        currentVideoSrcRef.current = member.videoSrc;
      } else {
        setActiveVideoSrc(null);
        currentVideoSrcRef.current = null;
      }
    } else {
      setActiveVideoSrc(null);
      currentVideoSrcRef.current = null;
    }
  };

  // Line following mouse - completely independent
  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    let lastMouseY = window.innerHeight / 2;
    let hasInteracted = false; // Only select after user interaction

    const updateLinePosition = (yPercent: number) => {
      const clamped = Math.min(Math.max(yPercent, 0), 100);
      if (clamped >= 100) {
        line.style.top = "calc(100% - 2px)";
      } else {
        line.style.top = `${clamped}%`;
      }
    };

    const calculatePosition = (mouseY: number) => {
      const rect = section.getBoundingClientRect();

      let percent: number;
      if (mouseY < rect.top) {
        percent = 0;
      } else if (mouseY > rect.bottom) {
        percent = 100;
      } else {
        percent = ((mouseY - rect.top) / rect.height) * 100;
      }

      updateLinePosition(percent);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      lastMouseY = e.clientY;
      calculatePosition(lastMouseY);

      // Check if mouse is inside section to enable selection
      const rect = section.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        hasInteracted = true;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (isTouch) return;
      lastMouseY = e.clientY;
      calculatePosition(lastMouseY);
    };

    const handleTick = () => {
      if (isTouch) {
        const rect = section.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;

        let percent: number;
        if (rect.bottom < viewportCenter) {
          percent = 100;
        } else if (rect.top > viewportCenter) {
          percent = 0;
        } else {
          percent = ((viewportCenter - rect.top) / rect.height) * 100;
        }

        updateLinePosition(percent);
      } else {
        calculatePosition(lastMouseY);
      }

      // Only check selection after user has interacted with the section
      if (!hasInteracted) return;

      // Check which member the line is selecting
      const lineRect = line.getBoundingClientRect();
      const lineY = lineRect.top + lineRect.height / 2;

      let foundIndex: number | null = null;

      for (let i = 0; i < headerRefs.current.length; i++) {
        const header = headerRefs.current[i];
        if (!header) continue;

        const headerRect = header.getBoundingClientRect();

        if (lineY >= headerRect.top && lineY <= headerRect.bottom) {
          foundIndex = i;
          break;
        }
      }

      // Only update state if selection actually changed
      if (foundIndex !== selectedIndexRef.current) {
        selectedIndexRef.current = foundIndex;
        setSelectedIndex(foundIndex);

        // Handle video
        if (foundIndex !== null) {
          const member = members[foundIndex];
          if (member.videoSrc && member.videoSrc !== currentVideoSrcRef.current) {
            currentVideoSrcRef.current = member.videoSrc;
            setActiveVideoSrc(member.videoSrc);
          } else if (!member.videoSrc && currentVideoSrcRef.current !== null) {
            currentVideoSrcRef.current = null;
            setActiveVideoSrc(null);
          }
        } else if (currentVideoSrcRef.current !== null) {
          currentVideoSrcRef.current = null;
          setActiveVideoSrc(null);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    gsap.ticker.add(handleTick);

    // Initial position
    handleTick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
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
    <section
      ref={sectionRef}
      id="medlemmer"
      className="section snap-section relative overflow-hidden"
    >
      {/* Background layer */}
      <div className="absolute inset-0 bg-background" />

      {/* Preloaded video elements - one per unique source */}
      {videoSources.map((src) => (
        <video
          key={src}
          ref={(el) => {
            if (el) videoRefs.current.set(src, el);
          }}
          src={src}
          className="absolute inset-0 z-1 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: activeVideoSrc === src ? 1 : 0 }}
          muted
          loop
          playsInline
          preload="auto"
        />
      ))}

      {/* Interactive dotted line */}
      <div
        ref={lineRef}
        className="absolute left-8 right-8 z-20 pointer-events-none dotted-line"
        style={{ top: "50%" }}
      />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 mix-blend-difference text-white">
        <p className="font-body text-base font-black tracking-widest mb-2">
          Vi er
        </p>
        <div className="flex flex-col">
          {members.map((member, index) => (
            <h2
              key={member.name}
              ref={(el) => { headerRefs.current[index] = el; }}
              className="font-title text-[7vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-none whitespace-nowrap transition-opacity duration-300 cursor-pointer"
              style={{
                opacity: (selectedIndex !== null || hoveredIndex !== null) && selectedIndex !== index && hoveredIndex !== index ? 0.2 : 1,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {member.name}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
}
