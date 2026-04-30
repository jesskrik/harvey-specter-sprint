"use client";

import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";
import MobileNav from "@/components/MobileNav";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

// Fade range — at FADE_START or below, nav is fully transparent;
// at FADE_END or beyond, nav is fully dark; scroll position interpolates between.
const FADE_START = 100;
const FADE_END = 500;

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  // 1 = fully transparent + black text (at top). 0 = fully dark bg + white text.
  const [transparency, setTransparency] = useState(1);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastY;

        const t = Math.max(
          0,
          Math.min(1, (FADE_END - currentY) / (FADE_END - FADE_START))
        );
        setTransparency(t);

        if (Math.abs(delta) > 6) {
          setHidden(delta > 0 && currentY > 100);
          lastY = currentY;
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const atTop = transparency > 0.5;
  const motion = hidden
    ? "transition-transform duration-300 ease-in"
    : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";
  const textChannel = Math.round(255 * (1 - transparency));

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 ${motion} ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        backgroundColor: `rgba(0, 0, 0, ${1 - transparency})`,
        color: `rgb(${textChannel}, ${textChannel}, ${textChannel})`,
      }}
    >
      <div className="flex items-center justify-between h-[72px] md:h-[89px]">
        <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize">
          H.Studio
        </span>
        <div className="hidden md:flex gap-14 font-semibold text-[16px] tracking-[-0.64px] capitalize">
          {NAV_LINKS.map((item) => (
            <Magnetic key={item} strength={0.25}>
              <a
                href={`#${item.toLowerCase()}`}
                className="relative inline-block group py-1"
              >
                {item}
                <span className="absolute left-0 -bottom-0.5 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </Magnetic>
          ))}
        </div>
        <Magnetic strength={0.4} className="hidden md:block">
          <button
            className={`text-[14px] font-medium tracking-[-0.56px] px-4 py-3 rounded-[24px] border transition-colors duration-300 ${
              atTop
                ? "bg-black text-white border-black hover:bg-white hover:text-black"
                : "bg-white text-black border-white hover:bg-black hover:text-white"
            }`}
          >
            Let&apos;s talk
          </button>
        </Magnetic>
        <MobileNav />
      </div>
    </nav>
  );
}
