"use client";

import { useEffect, type RefObject } from "react";

type Options = {
  /** Ref to the horizontally-scrolling container. */
  scrollerRef: RefObject<HTMLDivElement | null>;
  /** Number of cards in the carousel. */
  count: number;
  /** Time between auto-advances, ms. Default: 4000. */
  intervalMs?: number;
  /** How long to pause after the user manually interacts, ms. Default: 6000. */
  pauseMs?: number;
  /**
   * If true (default), only auto-advances when the viewport is below the
   * `md` breakpoint. Desktop carousels are typically rendered differently
   * (e.g. all cards visible at once) and don't need auto-scroll.
   */
  mobileOnly?: boolean;
};

/**
 * Auto-scrolls a horizontal carousel through its cards while the scroller is
 * in the viewport. Pauses when the user touches/scrolls the carousel
 * directly, and respects `prefers-reduced-motion`.
 */
export function useCarouselAutoScroll({
  scrollerRef,
  count,
  intervalMs = 4000,
  pauseMs = 6000,
  mobileOnly = true,
}: Options) {
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || count <= 1 || typeof window === "undefined") return;

    if (mobileOnly && window.matchMedia("(min-width: 768px)").matches) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intervalId: number | null = null;
    let inView = false;
    let pausedUntil = 0;

    const advance = () => {
      if (Date.now() < pausedUntil) return;

      const inner = el.firstElementChild as HTMLElement | null;
      if (!inner) return;
      const cards = Array.from(inner.children) as HTMLElement[];
      if (!cards.length) return;

      // Find current card by closest centre
      const center = el.scrollLeft + el.clientWidth / 2;
      let currentIdx = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          currentIdx = i;
        }
      });

      // Move to the next card; loop back to first after the last.
      const nextIdx = (currentIdx + 1) % count;
      const nextCard = cards[nextIdx];
      if (!nextCard) return;

      const cardCenter = nextCard.offsetLeft + nextCard.offsetWidth / 2;
      const targetScroll = cardCenter - el.clientWidth / 2;
      el.scrollTo({
        left: Math.max(0, Math.min(targetScroll, el.scrollWidth - el.clientWidth)),
        behavior: "smooth",
      });
    };

    const startInterval = () => {
      if (intervalId !== null) return;
      intervalId = window.setInterval(advance, intervalMs);
    };

    const stopInterval = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // Run only while the carousel is in view.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inView = entry.isIntersecting;
          if (inView) startInterval();
          else stopInterval();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    // Pause auto-advance briefly when the user takes over.
    const handleInteraction = () => {
      pausedUntil = Date.now() + pauseMs;
    };
    el.addEventListener("touchstart", handleInteraction, { passive: true });
    el.addEventListener("pointerdown", handleInteraction, { passive: true });

    return () => {
      stopInterval();
      observer.disconnect();
      el.removeEventListener("touchstart", handleInteraction);
      el.removeEventListener("pointerdown", handleInteraction);
    };
  }, [scrollerRef, count, intervalMs, pauseMs, mobileOnly]);
}
