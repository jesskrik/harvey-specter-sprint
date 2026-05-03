"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "@/components/Magnetic";
import Nav from "@/components/Nav";
import ParallaxLayer from "@/components/ParallaxLayer";
import Reveal from "@/components/Reveal";
import SlideButton from "@/components/SlideButton";
import Footer from "@/components/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

type Principle = {
  num: string;
  title: string;
  body: string;
};

const PRINCIPLES: Principle[] = [
  {
    num: "01",
    title: "Listen first",
    body: "Every project starts with a question, not an answer. We audit, interrogate, and challenge before we ever open a design tool — what does the brand actually need to say, and to whom?",
  },
  {
    num: "02",
    title: "Sweat the craft",
    body: "Pixels, kerning, prose, code, light. Each is a craft decision and we treat them all as if the whole brand depends on the smallest one — because, often, it does.",
  },
  {
    num: "03",
    title: "Ship outcomes",
    body: "Beautiful work that doesn't move the needle isn't enough. We measure success by what changes for the brand: recognition, conversion, momentum. Anything else is decoration.",
  },
];

function PageHeader() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const intro = root.querySelectorAll<HTMLElement>("[data-anim='intro']");
      if (intro.length) {
        gsap.from(intro, {
          y: 12,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.1,
        });
      }

      const slides = root.querySelectorAll<HTMLElement>("[data-slide]");
      slides.forEach((el, i) => {
        const dir = el.getAttribute("data-slide");
        const x = dir === "right" ? 100 : -100;
        gsap.from(el, {
          x,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2 + i * 0.1,
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-black h-[65vh] min-h-[520px]"
    >
      {/* Bg portrait — moody half-face B&W */}
      <ParallaxLayer y={150} scale={1.18} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about.png"
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: "30% 50%" }}
        />
      </ParallaxLayer>

      {/* Slight darkening so plain white text stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-black/35"
      />

      <div className="relative h-full flex flex-col">
        {/* TOP — label */}
        <div className="flex items-start px-4 md:px-8 pt-[96px] md:pt-[120px]">
          <p
            data-anim="intro"
            className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]"
          >
            [ about ]
          </p>
        </div>

        {/* MIDDLE — stacked greeting */}
        <div className="flex-1 flex items-center px-4 md:px-8 pb-8 md:pb-12">
          <h1
            className="text-white w-full"
            style={{
              fontSize: "clamp(56px, 13vw, 200px)",
              lineHeight: "0.86",
              letterSpacing: "-0.06em",
            }}
          >
            <span data-slide="left" className="block uppercase font-light">
              Hello.
            </span>
            <span
              data-slide="right"
              className="block md:pl-[20%] font-[family-name:var(--font-playfair)] italic font-normal"
            >
              I&apos;m Harvey.
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function AboutIntro() {
  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-28">
      <Reveal from="up" distance={12} duration={0.7}>
        <div className="flex items-start justify-between mb-10 md:mb-16">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ the studio ]
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ since 2016 ]
          </p>
        </div>
      </Reveal>

      <div className="md:pl-[10%] max-w-[1100px]">
        <Reveal from="up" distance={20} duration={1}>
          <p
            className="font-light text-[#1f1f1f] mb-10 md:mb-16"
            style={{
              fontSize: "clamp(24px, 3.5vw, 48px)",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            H.Studio is a small, independent practice working at the intersection of{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal">
              brand,
            </span>{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal">
              craft,
            </span>{" "}
            and{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal">
              story.
            </span>{" "}
            Founded in Chicago, working with brands across the world.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Reveal from="up" distance={12} duration={0.7}>
            <p className="text-[15px] md:text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f]">
              Over eight years I&apos;ve worked with founders, agencies, and in-house teams across fashion, hospitality, tech, and wellness. The thread is the same: brands trying to say something clear, right, and unmistakably theirs.
            </p>
          </Reveal>
          <Reveal from="up" distance={12} duration={0.7}>
            <p className="text-[15px] md:text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f]">
              The studio stays small on purpose. Every engagement runs through me directly — strategy, design, build. No layers, no handoffs, no diluted ideas.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-20 border-t border-[#1f1f1f]/15">
      <Reveal from="up" distance={12} duration={0.7}>
        <div className="flex items-start justify-between mb-12 md:mb-16">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ principles ]
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ how I work ]
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col gap-12 md:gap-16">
        {PRINCIPLES.map((p) => (
          <article
            key={p.num}
            className="border-t border-[#1f1f1f]/15 pt-8 md:pt-10"
          >
            <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
              <Reveal
                from="up"
                distance={12}
                duration={0.7}
                className="md:col-span-2"
              >
                <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
                  [ {p.num} ]
                </p>
              </Reveal>
              <Reveal
                from="up"
                distance={20}
                duration={0.9}
                className="md:col-span-5"
              >
                <h3
                  className="font-bold italic uppercase tracking-[-0.04em] leading-[1.05] text-black"
                  style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
                >
                  {p.title}
                </h3>
              </Reveal>
              <Reveal
                from="up"
                distance={12}
                duration={0.7}
                className="md:col-span-5"
              >
                <p className="text-[15px] md:text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f]">
                  {p.body}
                </p>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white px-4 md:px-8 py-16 md:py-24">
      {/* Bg portrait — quiet parallax behind the type */}
      <ParallaxLayer y={80} scale={1.1} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: "50% 30%" }}
        />
      </ParallaxLayer>

      {/* Darkening + soft top/bottom shading for text contrast */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-black/55"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <div className="relative">
        <Reveal from="up" distance={12} duration={0.7}>
          <div className="flex items-start mb-8 md:mb-12">
            <p className="font-[family-name:var(--font-geist-mono)] text-[14px] uppercase tracking-[-0.04em] leading-[1.1]">
              [ next step ]
            </p>
          </div>
        </Reveal>

        <Reveal from="up" distance={24} duration={0.9}>
          <h2
            className="font-light uppercase leading-[0.9] mb-8 md:mb-12"
            style={{
              fontSize: "clamp(40px, 8.5vw, 120px)",
              letterSpacing: "-0.06em",
            }}
          >
            <span className="block">Let&apos;s make</span>
            <span className="block md:pl-[10%]">
              something{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-normal normal-case text-[#d4a747]">
                together.
              </span>
            </span>
          </h2>
        </Reveal>

        <div className="flex flex-col items-start gap-4 md:pl-[10%]">
          <Reveal
            from="up"
            distance={12}
            duration={0.7}
            className="max-w-[440px]"
          >
            <p className="text-[15px] tracking-[-0.04em] leading-[1.5] text-white/85">
              Tell me about your brand, your goals, and what&apos;s in the way. I&apos;ll come back with a proposal.
            </p>
          </Reveal>
          <Reveal from="up" distance={12} duration={0.7}>
            <Magnetic strength={0.4} className="w-fit">
              <SlideButton href="/contact" variant="inverse">Let&apos;s talk</SlideButton>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="relative md:z-10 bg-white overflow-x-hidden">
        <PageHeader />
        <AboutIntro />
        <PrinciplesSection />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
