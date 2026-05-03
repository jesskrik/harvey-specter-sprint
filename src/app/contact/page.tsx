"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "@/components/Magnetic";
import Nav from "@/components/Nav";
import SlideButton from "@/components/SlideButton";
import Footer from "@/components/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X.com", href: "#" },
];

const PROJECT_TYPES = [
  "Brand discovery",
  "Web design & dev",
  "Marketing",
  "Photography",
  "Something else",
];

function StickyPortrait() {
  return (
    <div className="md:col-span-4">
      {/* Stays put while the right column scrolls past on desktop. Sticky top
          and height tuned to leave ~32px of breathing room on every side
          (matching the section's `md:px-8` left/right padding). On mobile this
          just renders as a regular portrait at the top of the page. */}
      <div className="md:sticky md:top-[121px] relative w-full aspect-[3/2] md:aspect-auto md:h-[calc(100vh-153px)] overflow-hidden bg-[#1f1f1f]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about.png"
          alt="Harvey Specter, founder"
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: "50% 30%" }}
        />
      </div>
    </div>
  );
}

function ContactHeader() {
  const ref = useRef<HTMLDivElement>(null);

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
        const x = dir === "right" ? 80 : -80;
        gsap.from(el, {
          x,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2 + i * 0.1,
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="flex flex-col gap-6 md:gap-8">
      <p
        data-anim="intro"
        className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]"
      >
        [ contact ]
      </p>

      <h1
        className="text-black w-full"
        style={{
          fontSize: "clamp(44px, 7.2vw, 112px)",
          lineHeight: "0.9",
          letterSpacing: "-0.05em",
        }}
      >
        <span data-slide="left" className="block uppercase font-light">
          Get in
        </span>
        <span
          data-slide="right"
          className="block md:pl-[15%] font-[family-name:var(--font-playfair)] italic font-normal"
        >
          touch.
        </span>
      </h1>

      <p
        data-anim="intro"
        className="font-light text-[#1f1f1f] max-w-[560px]"
        style={{
          fontSize: "clamp(18px, 1.9vw, 22px)",
          lineHeight: "1.4",
          letterSpacing: "-0.02em",
        }}
      >
        Working on something{" "}
        <span className="font-[family-name:var(--font-playfair)] italic font-normal">
          interesting?
        </span>{" "}
        Briefs, hellos, partnership ideas — we read everything that comes through.
      </p>
    </div>
  );
}

function ContactForm() {
  const inputClasses =
    "w-full bg-transparent border-b border-[#1f1f1f]/40 py-3 md:py-4 text-[16px] tracking-[-0.04em] text-[#1f1f1f] placeholder:text-[#1f1f1f]/45 focus:outline-none focus:border-[#1f1f1f] transition-colors";

  return (
    <form
      className="flex flex-col gap-6 md:gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: wire submission handler (Resend / Formspree / API route).
      }}
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-name"
          className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] uppercase leading-[1.1] tracking-[-0.04em]"
        >
          [ your name ]
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="First and last"
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-email"
          className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] uppercase leading-[1.1] tracking-[-0.04em]"
        >
          [ email ]
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="you@brand.com"
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-type"
          className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] uppercase leading-[1.1] tracking-[-0.04em]"
        >
          [ what kind of project? ]
        </label>
        <select
          id="contact-type"
          name="type"
          className={`${inputClasses} appearance-none cursor-pointer`}
          defaultValue=""
        >
          <option value="" disabled>
            Pick one
          </option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] uppercase leading-[1.1] tracking-[-0.04em]"
        >
          [ tell us about it ]
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="The brief, the timeline, what's getting in the way…"
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="pt-2">
        <Magnetic strength={0.4} className="w-fit">
          <SlideButton variant="filled">Send message</SlideButton>
        </Magnetic>
      </div>
    </form>
  );
}

function ContactDetails() {
  return (
    <div className="flex flex-col gap-8 md:gap-10 pt-10 md:pt-12 border-t border-[#1f1f1f]/15">
      <div>
        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-3">
          [ email ]
        </p>
        <a
          href="mailto:hello@hstudio.com"
          className="block font-light text-black tracking-[-0.04em] leading-[1.1] transition-opacity hover:opacity-70"
          style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
        >
          hello@hstudio.com
        </a>
      </div>

      <div>
        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-3">
          [ studio ]
        </p>
        <p className="text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f]">
          South Side, Chicago, IL
          <br />
          By appointment only
        </p>
      </div>

      <div>
        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-3">
          [ social ]
        </p>
        <ul className="flex flex-col gap-2">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f] uppercase transition-opacity hover:opacity-70"
              >
                {s.label} →
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] mb-3">
          [ response time ]
        </p>
        <p className="text-[16px] tracking-[-0.04em] leading-[1.5] text-[#1f1f1f]">
          Within 48 hours, weekdays. Most projects start with a 30-minute discovery call.
        </p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="relative md:z-10 bg-white overflow-x-clip">
        <section className="px-4 md:px-8 pt-[110px] md:pt-[121px] pb-12 md:pb-20">
          <div className="grid md:grid-cols-12 gap-8">
            <StickyPortrait />
            <div className="md:col-span-7 md:col-start-6 flex flex-col gap-10 md:gap-14">
              <ContactHeader />
              <ContactForm />
              <ContactDetails />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
