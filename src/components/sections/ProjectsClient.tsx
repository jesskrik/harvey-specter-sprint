"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import ParallaxLayer from "@/components/ParallaxLayer";
import Reveal from "@/components/Reveal";
import RevealImage from "@/components/RevealImage";
import SlideButton from "@/components/SlideButton";

gsap.registerPlugin(ScrollTrigger);

export type ProjectCardData = {
  _id: string;
  slug: string;
  title: string;
  tags: string[] | null;
  imageUrl: string;
  alt: string;
  description: string;
};

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
          [ projects ]
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
          Selected
        </span>
        <span
          data-slide="right"
          className="block md:pl-[20%] font-[family-name:var(--font-playfair)] italic font-normal"
        >
          work.
        </span>
      </h1>
    </section>
  );
}

function ProjectsIntro() {
  return (
    <section className="bg-white px-4 md:px-8 py-8 md:py-12">
      <Reveal from="up" distance={12} duration={0.7}>
        <div className="flex items-start justify-between mb-6 md:mb-8">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ portfolio ]
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ since 2016 ]
          </p>
        </div>
      </Reveal>

      <div className="md:pl-[10%] max-w-[1100px]">
        <Reveal from="up" distance={20} duration={1}>
          <p
            className="font-light text-[#1f1f1f] mb-6 md:mb-10"
            style={{
              fontSize: "clamp(22px, 3vw, 40px)",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            A handful of recent engagements — across{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal">
              brand,
            </span>{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal">
              digital,
            </span>{" "}
            and{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal">
              editorial.
            </span>{" "}
            Each one shipped end-to-end from this studio.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <Reveal from="up" distance={12} duration={0.7}>
            <p className="text-[15px] md:text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f]">
              Most projects sit somewhere between three and nine months of work, with the studio leading strategy, design, and build.
            </p>
          </Reveal>
          <Reveal from="up" distance={12} duration={0.7}>
            <p className="text-[15px] md:text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f]">
              Some clients return for second and third engagements as their brand grows. The relationships matter more than the deliverables.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  total,
}: {
  project: ProjectCardData;
  index: number;
  total: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border-t border-[#1f1f1f]/15 px-4 md:px-8 py-12 md:py-20"
    >
      {/* Image first — shorter aspect than before so it sits above the meta block */}
      <RevealImage className="relative w-full aspect-[4/3] md:aspect-[5/2] overflow-hidden bg-[#f1efea] mb-8 md:mb-12">
        <div className="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.alt}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </RevealImage>

      {/* Index + tags + title + description — one Reveal so all parts
          animate atomically. Splitting into multiple ScrollTriggers can
          leave the last project's title/description stuck at opacity 0
          if their individual triggers don't reach `top 85%` before the
          page bottom. */}
      <Reveal from="up" distance={16} duration={0.8}>
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ {num} ]
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            {project.tags?.join(" / ") ?? `${num} / ${totalStr}`}
          </p>
        </div>

        <h2
          className="font-bold italic uppercase tracking-[-0.04em] leading-[1.05] text-black mb-6 md:mb-8"
          style={{ fontSize: "clamp(40px, 7.5vw, 110px)" }}
        >
          <span className="relative inline-block transition-transform duration-300 ease-out group-hover:translate-x-3 pr-[0.18em] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[0.05em] after:h-[0.06em] after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
            {project.title}
          </span>
        </h2>

        <p className="text-[15px] md:text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f] max-w-[640px]">
          {project.description}
        </p>
      </Reveal>
    </Link>
  );
}

function ProjectsList({ projects }: { projects: ProjectCardData[] }) {
  return (
    <div className="bg-white">
      {projects.map((p, i) => (
        <ProjectRow key={p._id} project={p} index={i} total={projects.length} />
      ))}
    </div>
  );
}

function ProjectsCTA() {
  return (
    <section
      className="relative isolate overflow-hidden text-white px-4 md:px-8 py-16 md:py-24"
      style={{ backgroundColor: "#2a1d18" }}
    >
      {/* Bg photo — quiet parallax behind the type */}
      <ParallaxLayer y={80} scale={1.1} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/camera.png"
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: "50% 40%" }}
        />
      </ParallaxLayer>

      {/* Warm-tinted overlay — keeps the brown bg colour reading through the photo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(42, 29, 24, 0.7)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.3) 100%)",
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
              Tell us about your brand, your goals, and what&apos;s in the way. We&apos;ll come back with a proposal.
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

export default function ProjectsClient({
  projects,
}: {
  projects: ProjectCardData[];
}) {
  return (
    <>
      <PageHeader />
      <ProjectsIntro />
      <ProjectsList projects={projects} />
      <ProjectsCTA />
    </>
  );
}
