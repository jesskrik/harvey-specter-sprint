"use client";

import { useEffect, useState } from "react";
import MobileNav from "@/components/MobileNav";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastY;

        setAtTop(currentY < 50);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${atTop ? "bg-transparent text-black" : "bg-black text-white"}`}
    >
      <div className="flex items-center justify-between h-[72px] md:h-[89px]">
        <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize">
          H.Studio
        </span>
        <div className="hidden md:flex gap-14 font-semibold text-[16px] tracking-[-0.64px] capitalize">
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
        <button
          className={`hidden md:flex text-[14px] font-medium tracking-[-0.56px] px-4 py-3 rounded-[24px] transition-colors duration-300 ${
            atTop
              ? "bg-black text-white hover:bg-neutral-800"
              : "bg-white text-black hover:bg-neutral-200"
          }`}
        >
          Let&apos;s talk
        </button>
        <MobileNav />
      </div>
    </nav>
  );
}
