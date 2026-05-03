"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "@/components/Magnetic";
import SlideButton from "@/components/SlideButton";

gsap.registerPlugin(ScrollTrigger);

function HaveAProject() {
  return (
    <p className="text-[24px] uppercase tracking-[-0.04em] leading-[1.1] w-[298px]">
      <span className="font-light italic">Have a </span>
      <span className="font-black not-italic">project</span>
      <span className="font-light italic"> in mind?</span>
    </p>
  );
}

function LetsTalkOutlined() {
  return (
    <Magnetic strength={0.4} className="w-fit">
      <SlideButton variant="outlined">Let&apos;s talk</SlideButton>
    </Magnetic>
  );
}

function StudioBig({ size }: { size: string }) {
  return (
    <h2
      className="font-semibold capitalize whitespace-nowrap"
      style={{
        fontSize: size,
        letterSpacing: "-0.06em",
        lineHeight: "0.8",
        transform: "translateY(0.06em)",
      }}
    >
      H.Studio
    </h2>
  );
}

const SOCIALS_LEFT = ["Facebook", "Instagram"];
const SOCIALS_RIGHT = ["x.com", "Linkedin"];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = footerRef.current;
      if (!root) return;

      // Desktop is sticky-pinned so ScrollTrigger sees the footer in viewport
      // from page load. Use the previous section (#news) as the trigger so
      // animations fire when the footer is actually being revealed.
      const isDesktop =
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 768px)").matches;
      const triggerEl = isDesktop
        ? (document.querySelector<HTMLElement>("#news") ?? root)
        : root;
      const startPos = isDesktop ? "bottom 70%" : "top 85%";
      const studioStart = isDesktop ? "bottom 60%" : "top 90%";

      const fades = root.querySelectorAll<HTMLElement>("[data-anim='fade']");
      const rules = root.querySelectorAll<HTMLElement>("[data-anim='rule']");
      const studioWraps = root.querySelectorAll<HTMLElement>("[data-anim='studio']");

      if (fades.length) {
        gsap.from(fades, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: triggerEl, start: startPos, toggleActions: "play none none none" },
        });
      }

      if (rules.length) {
        gsap.from(rules, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: triggerEl, start: startPos, toggleActions: "play none none none" },
        });
      }

      studioWraps.forEach((wrap) => {
        const inner = wrap.querySelector<HTMLElement>("h2");
        if (!inner) return;
        gsap.fromTo(
          wrap,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: triggerEl, start: studioStart, toggleActions: "play none none none" },
          }
        );
        gsap.fromTo(
          inner,
          { yPercent: 30 },
          {
            yPercent: 0,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: triggerEl, start: studioStart, toggleActions: "play none none none" },
          }
        );
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-black text-white overflow-hidden md:sticky md:bottom-0 md:z-0"
    >

      {/* ── Mobile ── */}
      <div className="md:hidden pt-12 px-4">
        <div className="flex flex-col gap-6">
          <div data-anim="fade" className="flex flex-col gap-3">
            <HaveAProject />
            <LetsTalkOutlined />
          </div>
          <ul className="flex flex-col gap-3">
            {[...SOCIALS_LEFT, ...SOCIALS_RIGHT].map((name) => (
              <li
                key={name}
                data-anim="fade"
                className="text-[18px] uppercase tracking-[-0.04em] leading-[1.1]"
              >
                {name}
              </li>
            ))}
          </ul>
          <hr data-anim="rule" className="border-t border-white w-full mt-2" />
        </div>

        <div className="mt-12 flex flex-col gap-4 items-center">
          <div
            data-anim="fade"
            className="flex gap-[34px] pb-4 text-[12px] uppercase tracking-[-0.04em] leading-[1.1]"
          >
            <a href="#" className="underline">licences</a>
            <a href="#" className="underline">Privacy policy</a>
          </div>
          <div className="w-full flex flex-col gap-3 items-start overflow-hidden">
            <span
              data-anim="fade"
              className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase"
            >
              [ Coded By Claude ]
            </span>
            <div data-anim="studio" className="overflow-hidden w-full">
              <StudioBig size="91.425px" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex flex-col pt-12 px-8 gap-[120px]">

        {/* TOP — CTA + socials + divider */}
        <div className="flex flex-col gap-12">
          <div className="flex items-start justify-between gap-8">
            <div data-anim="fade" className="flex flex-col gap-3 w-[298px]">
              <HaveAProject />
              <LetsTalkOutlined />
            </div>
            <div
              data-anim="fade"
              className="w-[298px] text-center text-[18px] uppercase tracking-[-0.04em] leading-[1.1]"
            >
              {SOCIALS_LEFT.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
            <div
              data-anim="fade"
              className="w-[298px] text-right text-[18px] uppercase tracking-[-0.04em] leading-[1.1]"
            >
              {SOCIALS_RIGHT.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
          </div>
          <hr data-anim="rule" className="border-t border-white w-full" />
        </div>

        {/* BOTTOM — H.Studio + rotated mono + legal links */}
        <div className="flex items-end justify-between gap-2">
          <div
            className="flex-1 relative h-[219px]"
            style={{ containerType: "inline-size" }}
          >
            {/* Rotated [ Coded By Claude ] */}
            <div
              data-anim="fade"
              className="absolute left-0 top-1/2 h-[160px] w-[15px] flex items-center justify-center -translate-y-1/2"
            >
              <span className="-rotate-90 whitespace-nowrap font-[family-name:var(--font-geist-mono)] text-[14px] uppercase">
                [ Coded By Claude ]
              </span>
            </div>
            <div data-anim="studio" className="absolute left-5 bottom-0 overflow-hidden">
              <StudioBig size="clamp(100px, 25cqw, 290px)" />
            </div>
          </div>

          <div
            data-anim="fade"
            className="flex gap-[34px] items-center pb-8 shrink-0"
          >
            <a
              href="#"
              className="text-[12px] uppercase tracking-[-0.04em] leading-[1.1] underline"
            >
              licences
            </a>
            <a
              href="#"
              className="text-[12px] uppercase tracking-[-0.04em] leading-[1.1] underline"
            >
              Privacy policy
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}
