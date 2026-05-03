"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CarouselDots from "@/components/CarouselDots";
import { useCarouselAutoScroll } from "@/hooks/useCarouselAutoScroll";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  quote: string;
  author: string;
  logo: string;
  logoHeight: number;
  /** Desktop: x position from left at 1440px viewport (will scale via vw) */
  x: number;
  /** Desktop: y position from top of section, fixed px */
  y: number;
  /** Card rotation, degrees */
  rotate: number;
  /** Mobile rotation override (degrees) */
  mobileRotate: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    author: "Marko Stojković",
    logo: "/images/logo-1.svg",
    logoHeight: 19,
    x: 102, y: 142, rotate: -6.85, mobileRotate: -3.5,
  },
  {
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    author: "Lukas Weber",
    logo: "/images/logo-2.svg",
    logoHeight: 19,
    x: 676, y: 272, rotate: 2.9, mobileRotate: 2,
  },
  {
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don’t just make things look good; they solve business problems through visual clarity.",
    author: "Sarah Jenkins",
    logo: "/images/logo-3.svg",
    logoHeight: 31,
    x: 305, y: 553, rotate: 2.23, mobileRotate: -2.5,
  },
  {
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    author: "Sofia Martínez",
    logo: "/images/logo-4.svg",
    logoHeight: 36,
    x: 987, y: 546, rotate: -4.15, mobileRotate: 3,
  },
];

function TestimonialCard({
  t,
  width,
}: {
  t: Testimonial;
  width: number;
}) {
  return (
    <div
      className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4"
      style={{ width: `${width}px` }}
    >
      <img
        src={t.logo}
        alt=""
        className="block w-auto"
        style={{ height: `${t.logoHeight}px` }}
      />
      <p className="text-[18px] tracking-[-0.04em] leading-[1.3] text-[#1f1f1f]">
        {t.quote}
      </p>
      <p className="text-[16px] font-black tracking-[-0.04em] uppercase leading-[1.1] text-black">
        {t.author}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileScrollerRef = useRef<HTMLDivElement>(null);

  useCarouselAutoScroll({
    scrollerRef: mobileScrollerRef,
    count: TESTIMONIALS.length,
  });

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const desktopHeadline = root.querySelector<HTMLElement>(
        "[data-anim='headline-desktop']"
      );
      const mobileHeadline = root.querySelector<HTMLElement>(
        "[data-anim='headline-mobile']"
      );
      const desktopCards = root.querySelectorAll<HTMLElement>(
        "[data-anim='card-desktop']"
      );
      const mobileCards = root.querySelectorAll<HTMLElement>(
        "[data-anim='card-mobile']"
      );

      // ── Mobile: simple stagger fade-up ──
      if (mobileHeadline) {
        gsap.from(mobileHeadline, {
          scale: 0.9,
          opacity: 0,
          y: 40,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: mobileHeadline, start: "top 85%", toggleActions: "play none none none" },
        });
      }
      if (mobileCards.length) {
        gsap.from(mobileCards, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      // ── Desktop: scrub parallax — cards drift on scroll up & down ──
      // Per-card depth so the scattered layout reads as layered. All ≥ 160 so
      // every card is visibly parallaxed.
      const depths = [240, 180, 200, 220];

      desktopCards.forEach((card, i) => {
        const depth = depths[i % depths.length];
        gsap.fromTo(
          card,
          { y: depth },
          {
            y: -depth,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      if (desktopHeadline) {
        gsap.fromTo(
          desktopHeadline,
          { y: 80 },
          {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-white overflow-hidden"
    >

      {/* ── Mobile — heading + horizontal-scroll cards ── */}
      <div className="md:hidden py-16 px-4 flex flex-col gap-8">
        <h2
          data-anim="headline-mobile"
          className="font-medium text-center capitalize text-black"
          style={{
            fontSize: "64px",
            letterSpacing: "-0.07em",
            lineHeight: "0.8",
          }}
        >
          Testimonials
        </h2>
        <div ref={mobileScrollerRef} className="-mx-4 px-4 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-2 w-max items-center">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                data-anim="card-mobile"
                className="shrink-0"
                style={{ transform: `rotate(${t.mobileRotate}deg)` }}
              >
                <TestimonialCard t={t} width={260} />
              </div>
            ))}
          </div>
        </div>
        <CarouselDots
          scrollerRef={mobileScrollerRef}
          count={TESTIMONIALS.length}
          className="mt-2"
        />
      </div>

      {/* ── Desktop — scattered cards around centred headline ── */}
      <div className="hidden md:block relative w-full" style={{ height: "950px" }}>
        {/* Headline centred */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2
            data-anim="headline-desktop"
            className="font-medium capitalize text-black whitespace-nowrap"
            style={{
              fontSize: "clamp(96px, 13.75vw, 198px)",
              letterSpacing: "-0.07em",
              lineHeight: "1.1",
            }}
          >
            Testimonials
          </h2>
        </div>

        {/* Cards — left scaled to viewport via vw, top fixed in px */}
        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            data-anim="card-desktop"
            className="absolute"
            style={{
              left: `${(t.x / 1440) * 100}vw`,
              top: `${t.y}px`,
              transform: `rotate(${t.rotate}deg)`,
              transformOrigin: "center",
            }}
          >
            <TestimonialCard t={t} width={353} />
          </div>
        ))}
      </div>

    </section>
  );
}
