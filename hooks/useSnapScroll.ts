import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface UseSnapScrollOptions {
  /** Threshold as a percentage (0-1) of section height. Default: 0.2 (20%) */
  threshold?: number;
  /** Delay in ms before snapping. Default: 300 */
  delay?: number;
  /** Duration of snap animation in seconds. Default: 0.8 */
  duration?: number;
  /** Selector for sections to snap to. Default: ".section, .section-footer" */
  sectionSelector?: string;
}

export function useSnapScroll({
  threshold = 0.2,
  delay = 300,
  duration = 0.8,
  sectionSelector = ".section, .section-footer",
}: UseSnapScrollOptions = {}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSnappingRef = useRef(false);

  const findClosestSection = useCallback((): { closestSection: Element | null; shouldSnap: boolean } => {
    const sections = document.querySelectorAll(sectionSelector);
    const scrollY = window.scrollY;

    let closestSection: Element | null = null;
    let closestDistance = Infinity;
    let shouldSnap = false;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollY + rect.top;
      const sectionHeight = rect.height;

      // Distance from current scroll position to section top
      const distanceToTop = Math.abs(scrollY - sectionTop);

      // Check if we're within threshold of the section top
      const thresholdPx = sectionHeight * threshold;

      if (distanceToTop < thresholdPx && distanceToTop < closestDistance) {
        closestSection = section;
        closestDistance = distanceToTop;
        shouldSnap = true;
      }
    });

    return { closestSection, shouldSnap };
  }, [sectionSelector, threshold]);

  const handleScrollEnd = useCallback(() => {
    if (isSnappingRef.current) return;

    const { closestSection, shouldSnap } = findClosestSection();

    if (shouldSnap && closestSection) {
      isSnappingRef.current = true;

      const rect = closestSection.getBoundingClientRect();
      const targetScroll = window.scrollY + rect.top;

      // Use GSAP for slow, gentle ease out
      gsap.to(window, {
        scrollTo: { y: targetScroll, autoKill: false },
        duration,
        ease: "power1.out",
        onComplete: () => {
          isSnappingRef.current = false;
        },
      });
    }
  }, [findClosestSection, duration]);

  useEffect(() => {
    const handleScroll = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout for scroll end detection
      timeoutRef.current = setTimeout(handleScrollEnd, delay);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScrollEnd, delay]);
}
