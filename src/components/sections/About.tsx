"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BracketSide } from "@/components/Brackets";

gsap.registerPlugin(ScrollTrigger);

const PARA = `Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.`;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const labels = root.querySelectorAll<HTMLElement>("[data-anim='label']");
      const paras = root.querySelectorAll<HTMLElement>("[data-anim='para']");
      const images = root.querySelectorAll<HTMLElement>("[data-anim='image']");

      if (labels.length) {
        gsap.from(labels, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      if (paras.length) {
        gsap.from(paras, {
          y: 12,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: root, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      images.forEach((wrap) => {
        const img = wrap.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          wrap,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: wrap, start: "top 85%", toggleActions: "play none none none" },
          }
        );
        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: wrap, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-white py-12 md:py-20 px-4 md:px-8"
    >

      {/* ── Mobile ── */}
      <div className="md:hidden flex flex-col gap-5">
        <span
          data-anim="label"
          className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]"
        >
          002
        </span>
        <span
          data-anim="label"
          className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]"
        >
          [ About ]
        </span>
        <div data-anim="para" className="flex items-center gap-3">
          <BracketSide side="left" />
          <p className="flex-1 py-3 text-[14px] leading-[1.3] tracking-[-0.56px] text-[#1f1f1f]">
            {PARA}
          </p>
          <BracketSide side="right" />
        </div>
        <div data-anim="image" className="w-full aspect-[422/594] overflow-hidden">
          <img
            src="/images/about.png"
            alt="Harvey Specter portrait"
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-start justify-between">
        <span
          data-anim="label"
          className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0"
        >
          [ About ]
        </span>
        <div className="flex-1 flex items-end justify-end gap-8 ml-8">
          {/* Paragraph with corner brackets — capped width */}
          <div data-anim="para" className="flex items-center gap-3 w-full max-w-[480px]">
            <BracketSide side="left" />
            <p className="flex-1 py-3 text-[14px] leading-[1.3] tracking-[-0.56px] text-[#1f1f1f]">
              {PARA}
            </p>
            <BracketSide side="right" />
          </div>
          {/* 002 counter + portrait image */}
          <div className="flex flex-col gap-6 shrink-0">
            <span
              data-anim="label"
              className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]"
            >
              002
            </span>
            <div
              data-anim="image"
              className="overflow-hidden"
              style={{ width: "clamp(280px, 30.3vw, 436px)", aspectRatio: "436 / 614" }}
            >
              <img
                src="/images/about.png"
                alt="Harvey Specter portrait"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
