"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import CarouselDots from "@/components/CarouselDots";

gsap.registerPlugin(ScrollTrigger);

type NewsItem = {
  img: string;
  description: string;
};

const DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const NEWS_ITEMS: NewsItem[] = [
  { img: "/images/news-1.png", description: DESCRIPTION },
  { img: "/images/news-2.png", description: DESCRIPTION },
  { img: "/images/news-3.png", description: DESCRIPTION },
];

function ReadMore() {
  return (
    <span className="border-b border-black inline-flex items-center gap-[10px] py-1 transition-opacity group-hover:opacity-70">
      <span className="text-[14px] font-medium tracking-[-0.04em] text-black leading-none">
        Read more
      </span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        <path
          d="M5 13 L13 5 M7 5 H13 V11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
      </svg>
    </span>
  );
}

function NewsCard({
  item,
  expanded = false,
  className = "",
  width,
}: {
  item: NewsItem;
  expanded?: boolean;
  className?: string;
  width?: number;
}) {
  return (
    <Link
      href="/news"
      data-anim="card"
      className={`group flex flex-col gap-4 items-start ${className}`}
      style={width ? { width: `${width}px` } : undefined}
    >
      <div
        className="w-full aspect-[353/469] overflow-hidden"
        data-anim="card-image"
      >
        <div className="size-full transition-transform duration-[800ms] ease-out group-hover:scale-105">
          <img src={item.img} alt="" className="size-full object-cover" />
        </div>
      </div>
      <p
        className={`text-[14px] tracking-[-0.04em] leading-[1.3] text-[#1f1f1f] ${
          expanded ? "flex-1" : ""
        }`}
      >
        {item.description}
      </p>
      <ReadMore />
    </Link>
  );
}

export default function News() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileScrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const mobileWrap = root.querySelector<HTMLElement>("[data-news='mobile']");
      const desktopWrap = root.querySelector<HTMLElement>("[data-news='desktop']");

      // ── Mobile: stagger fade-up + image scale ──
      if (mobileWrap) {
        const heading = mobileWrap.querySelector<HTMLElement>("[data-anim='heading']");
        const cards = mobileWrap.querySelectorAll<HTMLElement>("[data-anim='card']");
        const cardImages = mobileWrap.querySelectorAll<HTMLElement>("[data-anim='card-image']");

        if (heading) {
          gsap.from(heading, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" },
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: mobileWrap, start: "top 70%", toggleActions: "play none none none" },
          });
        }

        cardImages.forEach((wrap) => {
          const img = wrap.querySelector("img");
          if (!img) return;
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: { trigger: wrap, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        });
      }

      // ── Desktop: scrub parallax — varying depth per card + heading ──
      if (desktopWrap) {
        const headingWrap = desktopWrap.querySelector<HTMLElement>(
          "[data-anim='heading-wrap']"
        );
        const cards = desktopWrap.querySelectorAll<HTMLElement>("[data-anim='card']");
        const dividers = desktopWrap.querySelectorAll<HTMLElement>("[data-anim='divider']");

        const depths = [220, 320, 180];

        // Cards drift up from below into their natural position. Range stops at
        // y: 0 so they never translate above the vertical dividers' top edge.
        cards.forEach((card, i) => {
          const depth = depths[i % depths.length];
          gsap.fromTo(
            card,
            { y: depth },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );
        });

        // Heading wrapper is unrotated; animating its y moves the heading
        // visually up/down. Stops at 0 to align with the rest.
        if (headingWrap) {
          gsap.fromTo(
            headingWrap,
            { y: 140 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );
        }

        if (dividers.length) {
          gsap.from(dividers, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: { trigger: desktopWrap, start: "top 75%", toggleActions: "play none none none" },
          });
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="news" className="bg-[#f3f3f3] overflow-hidden">

      {/* ── Mobile — heading + horizontal-scroll cards ── */}
      <div data-news="mobile" className="md:hidden py-16 px-4 flex flex-col gap-8">
        <h2
          data-anim="heading"
          className="font-light text-black uppercase"
          style={{
            fontSize: "32px",
            letterSpacing: "-0.08em",
            lineHeight: "0.86",
          }}
        >
          Keep up with my<br />latest news &amp;<br />achievements
        </h2>
        <div ref={mobileScrollerRef} className="-mx-4 px-4 overflow-x-auto pb-4">
          <div className="flex gap-4 w-max">
            {NEWS_ITEMS.map((item, i) => (
              <NewsCard key={i} item={item} width={300} />
            ))}
          </div>
        </div>
        <CarouselDots
          scrollerRef={mobileScrollerRef}
          count={NEWS_ITEMS.length}
          className="mt-2"
        />
      </div>

      {/* ── Desktop — rotated heading + 3 cards with vertical dividers ── */}
      <div data-news="desktop" className="hidden md:flex items-end justify-between py-[120px] px-8 gap-8">
        {/* Rotated heading */}
        <div
          data-anim="heading-wrap"
          className="flex w-[110px] h-[706px] items-center justify-center shrink-0"
        >
          <div className="-rotate-90 whitespace-nowrap">
            <h2
              className="font-light text-black uppercase"
              style={{
                fontSize: "64px",
                letterSpacing: "-0.08em",
                lineHeight: "0.86",
              }}
            >
              <span className="block">Keep up with my latest</span>
              <span className="block">news &amp; achievements</span>
            </h2>
          </div>
        </div>

        {/* 3 cards with dividers */}
        <div className="flex items-start gap-[31px] shrink-0">
          <NewsCard
            item={NEWS_ITEMS[0]}
            expanded
            className="w-[353px] h-[581px] shrink-0"
          />
          <div data-anim="divider" className="w-px self-stretch bg-black/30 shrink-0" />
          <NewsCard
            item={NEWS_ITEMS[1]}
            className="w-[353px] pt-[120px] shrink-0"
          />
          <div data-anim="divider" className="w-px self-stretch bg-black/30 shrink-0" />
          <NewsCard
            item={NEWS_ITEMS[2]}
            expanded
            className="w-[353px] h-[581px] shrink-0"
          />
        </div>
      </div>

    </section>
  );
}
