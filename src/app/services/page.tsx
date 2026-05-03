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

type Service = {
  num: string;
  title: string;
  img: string;
  description: string;
  deliverables: string[];
  cropPortrait?: boolean;
};

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Brand Discovery",
    img: "/images/service-1.png",
    description:
      "We work alongside founders to articulate the unique voice and positioning that sets a brand apart. Through workshops, audits, and immersive research we surface the ideas that should anchor every visual and editorial decision downstream.",
    deliverables: [
      "Brand strategy & positioning",
      "Audience & competitor research",
      "Tone of voice guidelines",
      "Visual direction & moodboards",
    ],
  },
  {
    num: "02",
    title: "Web Design & Dev",
    img: "/images/service-2.png",
    description:
      "Beautiful, performant sites built end-to-end. We design custom interfaces from the ground up and ship them on a stack that scales with your team — Next.js, headless CMS, smooth animation, and accessible defaults out of the box.",
    deliverables: [
      "UX architecture & wireframes",
      "Bespoke visual design",
      "Front-end engineering",
      "CMS integration & handover",
    ],
  },
  {
    num: "03",
    title: "Marketing",
    img: "/images/service-3.png",
    description:
      "Strategy, content, and creative campaigns that meet your audience where they are. We pair editorial thinking with measurable execution — paid media, organic content, email, and the social systems that hold it all together.",
    deliverables: [
      "Campaign concept & copy",
      "Editorial & content calendars",
      "Paid media production",
      "Performance tracking",
    ],
  },
  {
    num: "04",
    title: "Photography",
    img: "/images/service-4.png",
    cropPortrait: true,
    description:
      "Brand-led photography for the web, retail, and editorial. From product still-life to long-form documentary, we treat every shoot as a chapter of the brand world we've helped build.",
    deliverables: [
      "Pre-production & creative direction",
      "Studio & on-location shoots",
      "Retouching & art direction",
      "Asset libraries for ongoing use",
    ],
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
      {/* Background photo — quiet studio still life, on-theme for services */}
      <ParallaxLayer y={150} scale={1.18} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/news-2.png"
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </ParallaxLayer>

      {/* Darken slightly so plain white text stays readable end-to-end */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-black/35"
      />

      <div className="relative h-full flex flex-col">

        {/* TOP — mono label under the nav */}
        <div className="flex items-start px-4 md:px-8 pt-[96px] md:pt-[120px]">
          <p
            data-anim="intro"
            className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]"
          >
            [ services ]
          </p>
        </div>

        {/* MIDDLE — stacked statement, plain white for guaranteed contrast */}
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
              Strategy /
            </span>
            <span data-slide="right" className="block md:pl-[15%]">
              <span className="font-[family-name:var(--font-playfair)] italic font-normal">
                Craft /
              </span>
              <span className="uppercase font-light"> Story.</span>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function ServicesIntro() {
  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-28">
      <Reveal from="up" distance={12} duration={0.7}>
        <div className="flex items-start justify-between mb-10 md:mb-16">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ approach ]
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ how we work ]
          </p>
        </div>
      </Reveal>

      <div className="md:pl-[10%] max-w-[1100px]">
        <p
          className="font-light text-[#1f1f1f] mb-10 md:mb-16"
          style={{
            fontSize: "clamp(24px, 3.5vw, 48px)",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
        >
          Every brand has a story already underway. Our job is to tell it{" "}
          <span className="font-[family-name:var(--font-playfair)] italic font-normal">
            sharper,
          </span>{" "}
          faster, and with conviction.
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Reveal from="up" distance={12} duration={0.7}>
            <p className="text-[15px] md:text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f]">
              We work end-to-end. From positioning workshops and brand systems to launch campaigns and editorial photography, every output ships with the same standard of craft.
            </p>
          </Reveal>
          <Reveal from="up" distance={12} duration={0.7}>
            <p className="text-[15px] md:text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f]">
              Engagements range from quick one-off projects to multi-month retainers. We size scope to fit your stage — whether you&apos;re starting fresh or doubling down on what&apos;s already working.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceDetailBlock({ service }: { service: Service }) {
  return (
    <section className="border-t border-[#1f1f1f]/15 px-4 md:px-8 py-12 md:py-20">
      {/* Number + divider */}
      <Reveal from="up" distance={12} duration={0.7}>
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ {service.num} ]
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            {service.num} / 04
          </p>
        </div>
      </Reveal>

      <Reveal from="up" distance={20} duration={0.9}>
        <h2
          className="font-bold italic uppercase tracking-[-0.04em] leading-[1.05] text-black mb-8 md:mb-16"
          style={{ fontSize: "clamp(40px, 7.5vw, 110px)" }}
        >
          {service.title}
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
        {/* Image — DOM-first so mobile sees it under the title */}
        <Reveal from="up" distance={12} duration={0.7} className="w-full md:order-2">
          <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-[#f1efea]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.img}
              alt={service.title}
              className={
                service.cropPortrait
                  ? "absolute left-0 w-full max-w-none"
                  : "absolute inset-0 size-full object-cover"
              }
              style={
                service.cropPortrait
                  ? { height: "149.93%", top: "-42.25%" }
                  : undefined
              }
            />
          </div>
        </Reveal>

        <div className="flex flex-col gap-8 md:gap-12 md:order-1">
          <Reveal from="up" distance={12} duration={0.7}>
            <p className="text-[16px] md:text-[18px] tracking-[-0.04em] leading-[1.45] text-[#1f1f1f]">
              {service.description}
            </p>
          </Reveal>

          <Reveal from="up" distance={12} duration={0.7}>
            <div>
              <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-4">
                [ deliverables ]
              </p>
              <ul className="flex flex-col gap-3">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="text-[16px] tracking-[-0.04em] leading-[1.3] text-[#1f1f1f] flex gap-3"
                  >
                    <span aria-hidden>—</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesCTA() {
  return (
    <section className="relative bg-black text-white px-4 md:px-8 py-12 md:py-20 overflow-hidden border-b border-white">
      {/* Top — labels */}
      <Reveal from="up" distance={12} duration={0.7}>
        <div className="flex items-start justify-between mb-8 md:mb-12">
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] uppercase tracking-[-0.04em] leading-[1.1]">
            [ next step ]
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] uppercase tracking-[-0.04em] leading-[1.1] text-[#d4a747]">
            [ 005 ]
          </p>
        </div>
      </Reveal>

      {/* Headline — bold, with Playfair italic accent in dusty yellow */}
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

      {/* Bottom — short context + CTA */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
        <Reveal from="up" distance={12} duration={0.7} className="max-w-[440px]">
          <p className="text-[15px] tracking-[-0.04em] leading-[1.5] text-white/70">
            Tell us about your brand, your goals, and what&apos;s in the way. We&apos;ll come back with a proposal.
          </p>
        </Reveal>
        <Reveal from="up" distance={12} duration={0.7}>
          <Magnetic strength={0.4} className="w-fit">
            <SlideButton href="/contact" variant="inverse">Let&apos;s talk</SlideButton>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="relative md:z-10 bg-white overflow-x-hidden">
        <PageHeader />
        <ServicesIntro />
        {SERVICES.map((s) => (
          <ServiceDetailBlock key={s.num} service={s} />
        ))}
        <ServicesCTA />
      </main>
      <Footer />
    </>
  );
}
