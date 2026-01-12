import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollChevronProps {
  targetId: string;
  sectionId: string;
  isDark?: boolean;
  direction?: "up" | "down";
}

export function ScrollChevron({ targetId, sectionId, isDark = false, direction = "down" }: ScrollChevronProps) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const sectionHeight = sectionRect.height;
      const sectionTop = sectionRect.top;
      const windowHeight = window.innerHeight;

      if (direction === "down") {
        // For downward chevrons: fade when scrolling away from the section
        const scrollProgress = Math.abs(sectionTop) / (sectionHeight - windowHeight);

        // Start fading when we've scrolled 30% through the section
        if (scrollProgress > 0.3) {
          const fadeAmount = Math.max(0, 1 - (scrollProgress - 0.3) * 2);
          setOpacity(fadeAmount);
        } else {
          setOpacity(1);
        }
      } else {
        // For upward chevrons: show when scrolled into the section
        const isInView = sectionTop < windowHeight && sectionTop + sectionHeight > 0;

        if (isInView) {
          // Calculate how far into the section we are
          const distanceFromTop = windowHeight - sectionTop;
          const visibleProgress = distanceFromTop / windowHeight;

          // Fade in when entering the section (first 20% of viewport)
          if (visibleProgress < 0.2) {
            setOpacity(visibleProgress * 5); // 0 to 1 over 20% range
          } else {
            setOpacity(1);
          }
        } else {
          setOpacity(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionId, direction]);

  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const Icon = direction === "down" ? ChevronDown : ChevronUp;
  const position = direction === "down" ? "bottom-8" : "top-24";

  return (
    <button
      onClick={handleClick}
      className={`absolute ${position} left-1/2 -translate-x-1/2 transition-opacity duration-300 hover:scale-110 z-10`}
      style={{ opacity }}
      aria-label={`Scroll to ${direction === "down" ? "next" : "previous"} section`}
    >
      <Icon
        className={`h-8 w-8 ${direction === "down" ? "animate-bounce" : ""} ${isDark ? "text-white" : "text-foreground"}`}
      />
    </button>
  );
}