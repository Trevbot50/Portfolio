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

  const cssLengthToPx = (rawValue: string) => {
    const raw = rawValue.trim();
    if (!raw) return 0;

    // Most reliable: px set by <Header /> at runtime.
    if (raw.endsWith("px")) {
      const n = Number.parseFloat(raw);
      return Number.isFinite(n) ? n : 0;
    }

    // On first paint we may still have the CSS default (`6rem`).
    if (raw.endsWith("rem")) {
      const rem = Number.parseFloat(raw);
      if (!Number.isFinite(rem)) return 0;
      const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      const base = Number.isFinite(rootFontSize) ? rootFontSize : 16;
      return rem * base;
    }

    // Fallback: parse number and treat as px.
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) ? n : 0;
  };

  const getHeaderHeightPx = () => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
    const px = cssLengthToPx(raw);
    if (px > 0) return px;

    // Last resort: measure the header element directly.
    const header = document.querySelector("header") as HTMLElement | null;
    return header?.offsetHeight ?? 0;
  };

  const scrollToHashTarget = (behavior: ScrollBehavior) => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const hash = window.location.hash;
    if (!hash || hash === "#") return;

    const id = decodeURIComponent(hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Align the *bottom* of the section to the bottom of the viewport.
    // This produces a consistent "section fits the screen" landing position.
    const deltaToBottom = targetRect.bottom - scrollerRect.bottom;
    const desiredTop = scroller.scrollTop + deltaToBottom;

    const maxTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const clampedTop = Math.min(maxTop, Math.max(0, desiredTop));

    scroller.scrollTo({ top: clampedTop, behavior });
  };

  /**
   * Smooth-scrolls to the hash target, then "refines" with an instant scroll once
   * scrolling has settled. This prevents the common "click twice to align" issue
   * caused by layout settling or smooth-scroll ending a few pixels off.
   */
  const scrollToHashTargetWithRefine = () => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    // Kick off the smooth scroll.
    scrollToHashTarget("smooth");

    // Prefer the native scrollend event when available.
    let cleanedUp = false;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const cleanup = () => {
      if (cleanedUp) return;
      cleanedUp = true;
      if (settleTimer) clearTimeout(settleTimer);
      scroller.removeEventListener("scroll", onScrollSettle as any);
      scroller.removeEventListener("scrollend", onScrollEnd as any);
    };

    const refine = () => {
      // Re-measure and snap to the exact computed position.
      scrollToHashTarget("auto");
      cleanup();
    };

    const onScrollEnd = () => refine();

    const onScrollSettle = () => {
      // Debounce: when scrolling stops for a short period, refine.
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(refine, 120);
    };

    // Attach listeners after the smooth scroll begins.
    scroller.addEventListener("scrollend", onScrollEnd as any, { once: true } as any);
    scroller.addEventListener("scroll", onScrollSettle as any, { passive: true } as any);

    // Hard fallback: even if events don't fire, refine soon.
    settleTimer = setTimeout(refine, 900);
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

  useEffect(() => {
    // Initial load: if the URL has a hash (e.g. "/#about"), the browser won't
    // scroll our custom container automatically — do it ourselves.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToHashTarget("auto"));
    });

    const onHashChange = () => scrollToHashTargetWithRefine();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
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