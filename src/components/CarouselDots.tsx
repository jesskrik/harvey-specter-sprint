"use client";

import { useEffect, useState, type RefObject } from "react";

type Props = {
  /** Ref to the horizontally-scrolling element to observe. */
  scrollerRef: RefObject<HTMLDivElement | null>;
  /** Total number of cards in the carousel. */
  count: number;
  className?: string;
};

/**
 * Pagination dots for a horizontally-scrolling carousel. Active state tracks
 * which card's centre is closest to the scroller's centre — accurate even
 * when cards are different widths or rotated. Each dot is a clickable button
 * that smooth-scrolls to centre its target card.
 */
export default function CarouselDots({ scrollerRef, count, className = "" }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || count <= 1) return;

    const update = () => {
      const inner = el.firstElementChild as HTMLElement | null;
      if (!inner) return;
      const cards = Array.from(inner.children) as HTMLElement[];
      if (!cards.length) return;

      const center = el.scrollLeft + el.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      setActiveIndex(closestIndex);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollerRef, count]);

  if (count <= 1) return null;

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;
    const card = inner.children[index] as HTMLElement | undefined;
    if (!card) return;

    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const targetScroll = cardCenter - el.clientWidth / 2;
    el.scrollTo({
      left: Math.max(0, Math.min(targetScroll, el.scrollWidth - el.clientWidth)),
      behavior: "smooth",
    });
  };

  return (
    <div className={`flex justify-center ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => scrollToIndex(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="p-1.5 cursor-pointer"
        >
          <span
            aria-hidden
            className={`block w-2 h-2 rounded-full transition-colors duration-200 ${
              i === activeIndex ? "bg-black" : "bg-black/25"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
