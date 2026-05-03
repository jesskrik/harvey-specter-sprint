"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import ParallaxLayer from "@/components/ParallaxLayer";
import Reveal from "@/components/Reveal";
import SlideButton from "@/components/SlideButton";
import type { ArticleBlock, NewsPost } from "@/data/news";

gsap.registerPlugin(ScrollTrigger);

function PageHeader({ post }: { post: NewsPost }) {
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
      className="relative isolate overflow-hidden bg-black h-[60vh] min-h-[460px]"
    >
      <ParallaxLayer y={120} scale={1.15} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </ParallaxLayer>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="relative h-full flex flex-col">
        <div className="flex items-start justify-between px-4 md:px-8 pt-[96px] md:pt-[120px]">
          <p
            data-anim="intro"
            className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]"
          >
            [ news ]
          </p>
          <p
            data-anim="intro"
            className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1] text-right"
          >
            [ {post.category} ]
          </p>
        </div>

        <div className="flex-1 flex items-end px-4 md:px-8 pb-8 md:pb-12">
          <h1
            data-slide="left"
            className="text-white font-[family-name:var(--font-playfair)] italic font-normal w-full"
            style={{
              fontSize: "clamp(40px, 8vw, 132px)",
              lineHeight: "0.95",
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </h1>
        </div>
      </div>
    </section>
  );
}

function ArticleMeta({ post }: { post: NewsPost }) {
  return (
    <section className="bg-white px-4 md:px-8 pt-12 md:pt-16 pb-6 md:pb-8 border-t border-[#1f1f1f]/15">
      <div className="max-w-[760px] mx-auto">
        <Reveal from="up" distance={12} duration={0.7}>
          <div className="flex flex-col gap-3 font-[family-name:var(--font-geist-mono)] text-[13px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1]">
            <div className="flex items-center gap-3">
              <span>[ {post.date} ]</span>
              <span aria-hidden className="text-[#1f1f1f]/30">/</span>
              <span>[ {post.category} ]</span>
            </div>
            {post.author && (
              <p>
                [ by {post.author}
                {post.authorRole ? `, ${post.authorRole}` : ""} ]
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArticleLead({ post }: { post: NewsPost }) {
  return (
    <section className="bg-white px-4 md:px-8 py-6 md:py-10">
      <div className="max-w-[760px] mx-auto">
        <Reveal from="up" distance={20} duration={1}>
          <p
            className="font-light text-[#1f1f1f]"
            style={{
              fontSize: "clamp(22px, 2.6vw, 32px)",
              lineHeight: "1.3",
              letterSpacing: "-0.02em",
            }}
          >
            {post.excerpt}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function BodyBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[16px] md:text-[18px] tracking-[-0.04em] leading-[1.6] text-[#1f1f1f]">
          {block.text}
        </p>
      );

    case "subheading":
      return (
        <h3
          className="font-bold italic uppercase tracking-[-0.04em] leading-[1.05] text-black mt-4 md:mt-6"
          style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}
        >
          {block.text}
        </h3>
      );

    case "quote":
      return (
        <blockquote className="my-2 md:my-4 border-l-2 border-[#d4a747] pl-6 md:pl-8">
          <p
            className="font-[family-name:var(--font-playfair)] italic font-normal text-[#1f1f1f]"
            style={{
              fontSize: "clamp(22px, 2.8vw, 36px)",
              lineHeight: "1.25",
              letterSpacing: "-0.02em",
            }}
          >
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <p className="font-[family-name:var(--font-geist-mono)] text-[12px] md:text-[13px] text-[#1f1f1f]/70 uppercase tracking-[-0.04em] leading-[1.3] mt-3">
              — {block.attribution}
            </p>
          )}
        </blockquote>
      );

    case "image":
      return (
        <figure className="my-2 md:my-4">
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#f1efea]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.src}
              alt={block.alt ?? ""}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f]/65 uppercase tracking-[-0.04em] leading-[1.3] mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={`flex flex-col gap-3 text-[16px] md:text-[18px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f] ${
            block.ordered ? "list-decimal pl-6" : ""
          }`}
        >
          {block.items.map((item, i) => (
            <li key={i} className={block.ordered ? "" : "flex gap-3"}>
              {block.ordered ? null : (
                <span aria-hidden className="text-[#d4a747] shrink-0">
                  —
                </span>
              )}
              <span>{item}</span>
            </li>
          ))}
        </Tag>
      );
    }
  }
}

function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <section className="bg-white px-4 md:px-8 py-8 md:py-12 pb-16 md:pb-24">
      <div className="max-w-[760px] mx-auto flex flex-col gap-6 md:gap-7">
        {blocks.map((block, i) => (
          <Reveal
            key={i}
            from="up"
            distance={12}
            duration={0.7}
            delay={Math.min(i * 0.04, 0.3)}
          >
            <BodyBlock block={block} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function NextArticle({ next }: { next: NewsPost }) {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <Link
        href={`/news/${next.slug}`}
        className="group block relative h-[50vh] min-h-[380px]"
      >
        <ParallaxLayer y={80} scale={1.08} className="absolute inset-0">
          <div className="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={next.image}
              alt=""
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: "50% 50%" }}
            />
          </div>
        </ParallaxLayer>

        <div aria-hidden className="absolute inset-0 pointer-events-none bg-black/45" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        <div className="relative h-full flex flex-col justify-between px-4 md:px-8 py-10 md:py-14">
          <Reveal from="up" distance={12} duration={0.7}>
            <div className="flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              <span>[ up next ]</span>
              <span aria-hidden className="text-white/40">/</span>
              <span>[ {next.category} ]</span>
            </div>
          </Reveal>

          <Reveal from="up" distance={20} duration={0.9}>
            <h2
              className="font-[family-name:var(--font-playfair)] italic font-normal text-white flex items-end gap-4 md:gap-6 flex-wrap"
              style={{
                fontSize: "clamp(32px, 6vw, 88px)",
                lineHeight: "1",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="relative inline-block transition-transform duration-300 ease-out group-hover:translate-x-3 pr-[0.18em] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[0.05em] after:h-[0.04em] after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
                {next.title}
              </span>
              <span className="not-italic font-light transition-transform duration-300 ease-out group-hover:translate-x-3 text-[#d4a747]">
                →
              </span>
            </h2>
          </Reveal>
        </div>
      </Link>
    </section>
  );
}

function ArticleCTA() {
  return (
    <section
      className="relative px-4 md:px-8 py-12 md:py-20 overflow-hidden"
      style={{ backgroundColor: "#d8d5cf", color: "#1f1f1f" }}
    >
      <div className="max-w-[760px] mx-auto">
        <Reveal from="up" distance={12} duration={0.7}>
          <div className="flex items-start mb-8 md:mb-12">
            <p className="font-[family-name:var(--font-geist-mono)] text-[14px] uppercase tracking-[-0.04em] leading-[1.1]">
              [ next step ]
            </p>
          </div>
        </Reveal>

        <Reveal from="up" distance={24} duration={0.9}>
          <h2
            className="font-light uppercase leading-[0.95] mb-8 md:mb-12 text-black"
            style={{
              fontSize: "clamp(32px, 5.5vw, 72px)",
              letterSpacing: "-0.05em",
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
              style={{ color: "rgba(31,31,31,0.75)" }}
            >
              Tell us about your brand, your goals, and what&apos;s in the way. We&apos;ll come back with a proposal.
            </p>
          </Reveal>
          <Reveal from="up" distance={12} duration={0.7}>
            <Magnetic strength={0.4} className="w-fit">
              <SlideButton href="/contact" variant="filled">Let&apos;s talk</SlideButton>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function NewsArticleClient({
  post,
  next,
}: {
  post: NewsPost;
  next: NewsPost;
}) {
  return (
    <>
      <PageHeader post={post} />
      <ArticleMeta post={post} />
      <ArticleLead post={post} />
      <ArticleBody blocks={post.body} />
      <NextArticle next={next} />
      <ArticleCTA />
    </>
  );
}
