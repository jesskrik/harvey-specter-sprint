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

export type ProjectDetail = {
  title: string;
  tags: string[] | null;
  description: string;
  imageUrl: string;
  alt: string;
  index: number;
  total: number;
};

export type NextProjectLink = {
  slug: string;
  title: string;
  imageUrl: string;
  alt: string;
};

function PageHeader({ project }: { project: ProjectDetail }) {
  const ref = useRef<HTMLElement>(null);
  const num = String(project.index).padStart(2, "0");
  const total = String(project.total).padStart(2, "0");

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
      className="relative isolate overflow-hidden bg-black h-[80vh] min-h-[600px]"
    >
      <ParallaxLayer y={150} scale={1.18} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageUrl}
          alt={project.alt}
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </ParallaxLayer>

      {/* Top + bottom shading so the labels and headline read against any photo */}
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
            [ project ]
          </p>
          <p
            data-anim="intro"
            className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1] text-right"
          >
            [ {num} / {total} ]
          </p>
        </div>

        <div className="flex-1 flex items-end px-4 md:px-8 pb-8 md:pb-12">
          <h1
            className="text-white w-full"
            style={{
              fontSize: "clamp(48px, 11vw, 168px)",
              lineHeight: "0.9",
              letterSpacing: "-0.06em",
            }}
          >
            <span
              data-slide="left"
              className="block font-[family-name:var(--font-playfair)] italic font-normal"
            >
              {project.title}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function SnapshotBar({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-white px-4 md:px-8 py-10 md:py-14 border-t border-[#1f1f1f]/15">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <Reveal from="up" distance={12} duration={0.7}>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-3">
            [ year ]
          </p>
          <p className="text-[18px] md:text-[20px] tracking-[-0.04em] leading-[1.4] text-[#1f1f1f]">
            2024
          </p>
        </Reveal>

        <Reveal from="up" distance={12} duration={0.7}>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-3">
            [ services ]
          </p>
          <p className="text-[18px] md:text-[20px] tracking-[-0.04em] leading-[1.4] text-[#1f1f1f]">
            {project.tags?.join(" / ") ?? "Strategy, design, build"}
          </p>
        </Reveal>

        <Reveal from="up" distance={12} duration={0.7}>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-3">
            [ role ]
          </p>
          <p className="text-[18px] md:text-[20px] tracking-[-0.04em] leading-[1.4] text-[#1f1f1f]">
            Strategy, design, build
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PullQuote({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-32 border-t border-[#1f1f1f]/15">
      <Reveal from="up" distance={24} duration={1}>
        <blockquote
          className="max-w-[1100px] mx-auto text-center font-[family-name:var(--font-playfair)] italic font-normal text-[#1f1f1f]"
          style={{
            fontSize: "clamp(28px, 4.5vw, 72px)",
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
          }}
        >
          {project.description}
        </blockquote>
      </Reveal>
    </section>
  );
}

function CaseStudyArticle({
  num,
  label,
  body,
}: {
  num: string;
  label: string;
  body: string;
}) {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-20 border-t border-[#1f1f1f]/15">
      <div className="max-w-[760px] mx-auto">
        <Reveal from="up" distance={16} duration={0.8}>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-3">
            [ {num} / {label.toLowerCase()} ]
          </p>
          <hr className="border-t border-[#1f1f1f]/30 mb-6 md:mb-8" />
          <p className="text-[17px] md:text-[19px] tracking-[-0.04em] leading-[1.6] text-[#1f1f1f]">
            {body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ImageBreak({ project }: { project: ProjectDetail }) {
  return (
    <RevealImage className="relative w-full aspect-[16/9] md:aspect-[5/2] overflow-hidden bg-[#f1efea]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.imageUrl}
        alt={project.alt}
        className="absolute inset-0 size-full object-cover"
      />
    </RevealImage>
  );
}

function InlineCTA() {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-20 border-t border-[#1f1f1f]/15">
      <div className="max-w-[760px] mx-auto">
        <Reveal from="up" distance={16} duration={0.8}>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-3">
            [ next ]
          </p>
          <hr className="border-t border-[#1f1f1f]/30 mb-6 md:mb-8" />
        </Reveal>

        <Reveal from="up" distance={16} duration={0.8}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
            <h3
              className="font-light uppercase text-black"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.04em",
                lineHeight: "1.1",
              }}
            >
              Want a project{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-normal normal-case">
                like this?
              </span>
            </h3>
            <Magnetic strength={0.4} className="w-fit shrink-0">
              <SlideButton href="/contact" variant="filled">Let&apos;s talk</SlideButton>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type Stat = { value: string; label: string };

function StatsCallout({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-20 border-t border-[#1f1f1f]/15">
      <div className="max-w-[760px] mx-auto">
        <Reveal from="up" distance={16} duration={0.8}>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-3">
            [ outcome / by the numbers ]
          </p>
          <hr className="border-t border-[#1f1f1f]/30 mb-2" />
        </Reveal>

        <div className="flex flex-col">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              from="up"
              distance={12}
              duration={0.7}
              delay={i * 0.06}
            >
              <div
                className={`flex items-baseline justify-between gap-6 py-5 md:py-7 ${
                  i > 0 ? "border-t border-[#1f1f1f]/15" : ""
                }`}
              >
                <p
                  className="font-light leading-none text-black"
                  style={{
                    fontSize: "clamp(40px, 6.5vw, 80px)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {stat.value}
                </p>
                <p className="font-[family-name:var(--font-geist-mono)] text-[12px] md:text-[14px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.3] text-right">
                  [ {stat.label} ]
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NextProject({ next }: { next: NextProjectLink }) {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <Link
        href={`/projects/${next.slug}`}
        className="group block relative h-[55vh] min-h-[420px]"
      >
        {/* Preview thumbnail of the next project, with a subtle scroll parallax
            and a hover zoom — matches the treatment used on the projects list */}
        <ParallaxLayer y={80} scale={1.08} className="absolute inset-0">
          <div className="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={next.imageUrl}
              alt={next.alt}
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: "50% 50%" }}
            />
          </div>
        </ParallaxLayer>

        {/* Darken so the white type stays readable across any photo */}
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
            <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
              [ up next ]
            </p>
          </Reveal>

          <Reveal from="up" distance={20} duration={0.9}>
            <h2
              className="font-bold italic uppercase tracking-[-0.04em] leading-[1.05] text-white flex items-center gap-4 md:gap-6 flex-wrap"
              style={{ fontSize: "clamp(40px, 7.5vw, 110px)" }}
            >
              <span className="relative inline-block transition-transform duration-300 ease-out group-hover:translate-x-3 pr-[0.18em] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[0.05em] after:h-[0.06em] after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
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

function ProjectCTA() {
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

export default function ProjectClient({
  project,
  next,
}: {
  project: ProjectDetail;
  next: NextProjectLink;
}) {
  // Placeholder copy — wire these to Sanity once the schema is extended.
  const brief =
    "A short paragraph describing the brief, the audience, and the constraints we were designing inside. What was the brand trying to say, who needed to hear it, and what was getting in the way?";
  const approach =
    "How we approached the project — the workshops, the research, the moves we made. The thinking that shaped the outcome and why those decisions were the right ones.";
  const outcome =
    "What shipped, and what changed for the brand once it did. Recognition, conversion, momentum — the measurable shifts that justified the work.";

  // Placeholder stats — also wire to Sanity once available.
  const stats: Stat[] = [
    { value: "+47%", label: "brand recognition" },
    { value: "3.2M", label: "campaign reach" },
    { value: "9wks", label: "from kickoff to launch" },
  ];

  return (
    <>
      <PageHeader project={project} />
      <SnapshotBar project={project} />
      <PullQuote project={project} />
      <CaseStudyArticle num="01" label="Brief" body={brief} />
      <CaseStudyArticle num="02" label="Approach" body={approach} />
      <ImageBreak project={project} />
      <CaseStudyArticle num="03" label="Outcome" body={outcome} />
      <StatsCallout stats={stats} />
      <InlineCTA />
      <NextProject next={next} />
      <ProjectCTA />
    </>
  );
}
