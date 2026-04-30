"use client";

import { useEffect, useState } from "react";
import MobileNav from "@/components/MobileNav";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export default function Nav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastY;
        if (Math.abs(delta) > 6) {
          setHidden(delta > 0 && currentY > 100);
          lastY = currentY;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 bg-white/80 backdrop-blur-md transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between h-[72px] md:h-[89px]">
        <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">
          H.Studio
        </span>
        <div className="hidden md:flex gap-14 font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:opacity-60 transition-opacity"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="hidden md:flex bg-black text-white text-[14px] font-medium tracking-[-0.56px] px-4 py-3 rounded-[24px] hover:bg-neutral-800 transition-colors">
          Let&apos;s talk
        </button>
        <MobileNav />
      </div>
    </nav>
  );
}
