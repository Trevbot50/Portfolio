import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";

interface FullscreenLayoutProps {
  children: ReactNode;
}

export function FullscreenLayout({ children }: FullscreenLayoutProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [thumb, setThumb] = useState({ top: 0, height: 48 });

  const isVisible = isHovering || isScrolling || isDragging;

  const getHeaderHeightPx = () => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim();
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) ? n : 0;
  };

  const updateThumb = () => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const headerHeightPx = getHeaderHeightPx();
    const trackHeight = track.getBoundingClientRect().height;
    const visibleClientHeight = Math.max(1, scroller.clientHeight - headerHeightPx);

    const scrollHeight = scroller.scrollHeight;
    const scrollTop = scroller.scrollTop;

    const minThumb = 36;
    const thumbHeight = Math.max(minThumb, (visibleClientHeight / scrollHeight) * trackHeight);
    const maxThumbTop = Math.max(0, trackHeight - thumbHeight);

    const scrollRange = Math.max(1, scrollHeight - visibleClientHeight);
    const thumbTop = (scrollTop / scrollRange) * maxThumbTop;

    setThumb({ top: thumbTop, height: thumbHeight });
  };

  useEffect(() => {
    updateThumb();

    const scroller = scrollRef.current;
    if (!scroller) return;

    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      setIsScrolling(true);
      updateThumb();
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => setIsScrolling(false), 650);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateThumb);

    return () => {
      scroller.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", updateThumb);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    e.preventDefault();
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setIsDragging(true);

    const headerHeightPx = getHeaderHeightPx();
    const trackHeight = track.getBoundingClientRect().height;
    const visibleClientHeight = Math.max(1, scroller.clientHeight - headerHeightPx);
    const scrollHeight = scroller.scrollHeight;
    const scrollRange = Math.max(1, scrollHeight - visibleClientHeight);

    const startY = e.clientY;
    const startScrollTop = scroller.scrollTop;
    const maxThumbTop = Math.max(0, trackHeight - thumb.height);

    const onMove = (ev: PointerEvent) => {
      const deltaY = ev.clientY - startY;
      const thumbDelta = (deltaY / Math.max(1, maxThumbTop)) * scrollRange;
      scroller.scrollTop = startScrollTop + thumbDelta;
    };

    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
  };

  const overlayStyle = useMemo<React.CSSProperties>(
    () => ({
      top: "var(--header-height)",
      height: "calc(100vh - var(--header-height))",
    }),
    [],
  );

  return (
    <>
      <div
        id="app-scroll-container"
        ref={scrollRef}
        className="h-screen overflow-y-auto scroll-smooth scrollbar-native-hidden"
      >
        {children}
      </div>

      {/* Overlay scrollbar (thumb floats above content; below header). */}
      <div
        ref={trackRef}
        className="fixed right-2 z-40 w-3 transition-opacity duration-200"
        style={overlayStyle}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="absolute right-0 w-3 rounded-full cursor-pointer"
          style={{
            top: thumb.top,
            height: thumb.height,
            background: isVisible ? "var(--scrollbar-thumb)" : "transparent",
            transition: isDragging ? "none" : "background 200ms ease, opacity 200ms ease",
            opacity: isVisible ? 1 : 0,
          }}
          onPointerDown={onThumbPointerDown}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "var(--scrollbar-thumb-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "var(--scrollbar-thumb)";
          }}
          aria-hidden="true"
        />
      </div>
    </>
  );
}

export default FullscreenLayout;