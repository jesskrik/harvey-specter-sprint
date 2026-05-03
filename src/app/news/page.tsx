"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import RevealImage from "@/components/RevealImage";
import SlideButton from "@/components/SlideButton";
import Footer from "@/components/sections/Footer";
import { NEWS, type NewsPost } from "@/data/news";

gsap.registerPlugin(ScrollTrigger);

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
      className="relative bg-white px-4 md:px-8 pt-[110px] md:pt-[140px] pb-10 md:pb-16"
    >
      <div className="mb-8 md:mb-12">
        <p
          data-anim="intro"
          className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]"
        >
          [ news ]
        </p>
      </div>

      <h1
        className="text-black w-full"
        style={{
          fontSize: "clamp(56px, 13vw, 200px)",
          lineHeight: "0.86",
          letterSpacing: "-0.06em",
        }}
      >
        <span data-slide="left" className="block uppercase font-light">
          News
        </span>
        <span
          data-slide="right"
          className="block md:pl-[20%] font-[family-name:var(--font-playfair)] italic font-normal"
        >
          &amp; signals.
        </span>
      </h1>
    </section>
  );
}

function NewsIntro() {
  return (
    <section className="bg-white px-4 md:px-8 py-8 md:py-12">
      <Reveal from="up" distance={12} duration={0.7}>
        <div className="flex items-start justify-between mb-6 md:mb-8">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ studio updates ]
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ {NEWS.length.toString().padStart(2, "0")} posts ]
          </p>
        </div>
      </Reveal>

      <div className="md:pl-[10%] max-w-[1100px]">
        <Reveal from="up" distance={20} duration={1}>
          <p
            className="font-light text-[#1f1f1f]"
            style={{
              fontSize: "clamp(22px, 3vw, 40px)",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            Project launches, press,{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal">
              partnerships
            </span>{" "}
            and the occasional studio dispatch — what we&apos;re working on, and what&apos;s caught our eye.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex flex-col gap-5 md:gap-6"
    >
      <RevealImage className="relative w-full aspect-[4/3] overflow-hidden bg-[#f1efea]">
        <div className="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </RevealImage>

      <Reveal from="up" distance={14} duration={0.7}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1]">
            <span>{post.date}</span>
            <span aria-hidden className="text-[#1f1f1f]/30">/</span>
            <span>[ {post.category} ]</span>
          </div>
          <h3
            className="font-bold italic uppercase tracking-[-0.04em] leading-[1.05] text-black"
            style={{ fontSize: "clamp(22px, 2.4vw, 36px)" }}
          >
            <span className="relative inline-block transition-transform duration-300 ease-out group-hover:translate-x-2 pr-[0.18em] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[0.05em] after:h-[0.05em] after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
              {post.title}
            </span>
          </h3>
          <p className="text-[15px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f]">
            {post.excerpt}
          </p>
        </div>
      </Reveal>
    </Link>
  );
}

function NewsGrid() {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-20 border-t border-[#1f1f1f]/15">
      <div className="grid md:grid-cols-2 gap-12 md:gap-x-12 md:gap-y-20">
        {NEWS.map((post) => (
          <NewsCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

function NewsCTA() {
  return (
    <section
      className="relative px-4 md:px-8 py-12 md:py-20 overflow-hidden"
      style={{ backgroundColor: "#d4a747", color: "#1f1f1f" }}
    >
      <Reveal from="up" distance={12} duration={0.7}>
        <div className="flex items-start mb-8 md:mb-12">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] uppercase tracking-[-0.04em] leading-[1.1] text-black">
            [ next step ]
          </p>
        </div>
      </Reveal>

      <Reveal from="up" distance={24} duration={0.9}>
        <h2
          className="font-light uppercase leading-[0.9] mb-8 md:mb-12 text-black"
          style={{
            fontSize: "clamp(40px, 8.5vw, 120px)",
            letterSpacing: "-0.06em",
          }}
        >
          <span className="block">Let&apos;s make</span>
          <span className="block md:pl-[10%]">
            something{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal normal-case">
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
          <p
            className="text-[15px] tracking-[-0.04em] leading-[1.5]"
            style={{ color: "rgba(31,31,31,0.8)" }}
          >
            Tell us about your brand, your goals, and what&apos;s in the way. We&apos;ll come back with a proposal.
          </p>
        </Reveal>
        <Reveal from="up" distance={12} duration={0.7}>
          <Magnetic strength={0.4} className="w-fit">
            <SlideButton variant="filled">Let&apos;s talk</SlideButton>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

export default function NewsPage() {
  return (
    <>
      <Nav />
      <main className="relative md:z-10 bg-white overflow-x-hidden">
        <PageHeader />
        <NewsIntro />
        <NewsGrid />
        <NewsCTA />
      </main>
      <Footer />
    </>
  );
}
