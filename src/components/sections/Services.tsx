"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  num: string;
  title: string;
  description: string;
  img: string;
  /** Photography (item 4) needs a custom crop — the source image is portrait
   *  and the design pulls it up so the lotion bottle is centred in the 151px square. */
  cropPortrait?: boolean;
};

const DESCRIPTION =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

const SERVICES: Service[] = [
  { num: "1", title: "Brand Discovery", description: DESCRIPTION, img: "/images/service-1.png" },
  { num: "2", title: "Web design & Dev", description: DESCRIPTION, img: "/images/service-2.png" },
  { num: "3", title: "Marketing", description: DESCRIPTION, img: "/images/service-3.png" },
  { num: "4", title: "Photography", description: DESCRIPTION, img: "/images/service-4.png", cropPortrait: true },
];

function ServiceImage({ src, cropPortrait }: { src: string; cropPortrait?: boolean }) {
  return (
    <div className="relative size-[151px] shrink-0 overflow-hidden" data-service-image>
      <img
        src={src}
        alt=""
        className={`${
          cropPortrait
            ? "absolute left-0 w-full max-w-none"
            : "absolute inset-0 size-full object-cover"
        } transition-transform duration-700 ease-out group-hover:scale-110`}
        style={cropPortrait ? { height: "149.93%", top: "-42.25%" } : undefined}
      />
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const topLabel = root.querySelector<HTMLElement>("[data-anim='top-label']");
      const headerLeft = root.querySelector<HTMLElement>("[data-anim='header-left']");
      const headerRight = root.querySelector<HTMLElement>("[data-anim='header-right']");
      const rows = root.querySelectorAll<HTMLElement>("[data-anim='row']");

      if (topLabel) {
        gsap.from(topLabel, {
          y: 12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      if (headerLeft && headerRight) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 75%", toggleActions: "play none none none" },
        });
        tl.from(headerLeft, { x: -20, duration: 0.9, ease: "power3.out" }, 0);
        tl.from(headerRight, { x: 20, duration: 0.9, ease: "power3.out" }, 0);
      }

      rows.forEach((row) => {
        const rule = row.querySelector<HTMLElement>("hr");
        const num = row.querySelector<HTMLElement>("[data-row='num']");
        const text = row.querySelectorAll<HTMLElement>("[data-row='text']");
        const image = row.querySelector<HTMLElement>("[data-service-image]");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none none" },
        });

        if (rule) {
          tl.fromTo(
            rule,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.9, ease: "power3.out" },
            0
          );
        }
        if (num) tl.from(num, { y: 10, duration: 0.6, ease: "power3.out" }, 0.1);
        if (text.length)
          tl.from(text, { y: 12, duration: 0.7, ease: "power3.out", stagger: 0.08 }, 0.2);
        if (image) {
          tl.fromTo(
            image,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out" },
            0.25
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-black text-white py-12 md:py-20 px-4 md:px-8"
    >

      {/* Top label */}
      <p
        data-anim="top-label"
        className="font-[family-name:var(--font-geist-mono)] text-[14px] uppercase leading-[1.1]"
      >
        [ services ]
      </p>

      {/* Big header — [4] DELIVERABLES */}
      <div
        className="flex items-center justify-between w-full font-light uppercase whitespace-nowrap mt-8 md:mt-12"
        style={{
          fontSize: "clamp(32px, 6.67vw, 96px)",
          letterSpacing: "-0.08em",
          lineHeight: "1",
        }}
      >
        <span data-anim="header-left">[4]</span>
        <span data-anim="header-right">Deliverables</span>
      </div>

      {/* Service list */}
      <div className="flex flex-col gap-8 md:gap-12 mt-8 md:mt-12">
        {SERVICES.map((s) => (
          <Link
            key={s.num}
            href="/services"
            data-anim="row"
            className="group w-full block"
          >

            {/* Number + divider */}
            <div className="flex flex-col gap-[9px] mb-3 md:mb-[9px]">
              <p
                data-row="num"
                className="font-[family-name:var(--font-geist-mono)] text-[14px] uppercase leading-[1.1]"
              >
                [ {s.num} ]
              </p>
              <hr className="border-t border-white/80 w-full" />
            </div>

            {/* ── Mobile — stacked: title → description → image ── */}
            <div className="md:hidden flex flex-col gap-4">
              <h3
                data-row="text"
                className="font-bold italic text-[36px] tracking-[-0.04em] uppercase leading-[1.1]"
              >
                <span className="relative inline-block transition-transform duration-300 ease-out group-hover:translate-x-2 pr-[0.18em] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[0.05em] after:h-[0.06em] after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
                  {s.title}
                </span>
              </h3>
              <p
                data-row="text"
                className="text-[14px] tracking-[-0.04em] leading-[1.3]"
              >
                {s.description}
              </p>
              <ServiceImage src={s.img} cropPortrait={s.cropPortrait} />
            </div>

            {/* ── Desktop — title left, description+image right ── */}
            <div className="hidden md:flex items-start justify-between gap-8">
              <h3
                data-row="text"
                className="font-bold italic text-[36px] tracking-[-0.04em] uppercase leading-[1.1] shrink-0"
              >
                <span className="relative inline-block transition-transform duration-300 ease-out group-hover:translate-x-3 pr-[0.18em] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[0.05em] after:h-[0.06em] after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
                  {s.title}
                </span>
              </h3>
              <div className="flex items-start gap-6 shrink-0">
                <p
                  data-row="text"
                  className="text-[14px] tracking-[-0.04em] leading-[1.3] w-[393px]"
                >
                  {s.description}
                </p>
                <ServiceImage src={s.img} cropPortrait={s.cropPortrait} />
              </div>
            </div>

          </Link>
        ))}
      </div>

    </section>
  );
}
