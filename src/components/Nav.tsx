"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Magnetic from "@/components/Magnetic";
import MobileNav from "@/components/MobileNav";
import SlideButton from "@/components/SlideButton";

// Anchor links use the `/#section` form so they navigate (and scroll)
// correctly from any route, not just the home page.
const NAV_LINKS: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

// Fade range — at FADE_START or below, nav is fully transparent;
// at FADE_END or beyond, nav is fully dark; scroll position interpolates between.
const FADE_START = 100;
const FADE_END = 500;

export default function Nav() {
  const pathname = usePathname();
  // Routes whose hero is dark — nav text needs to stay white at the top
  // of the page, otherwise black text disappears against the photo.
  // Match individual project / news pages (which have dark photo heros) but
  // NOT the /projects or /news list pages (which are light-themed). The
  // trailing slash forces sub-route match.
  const darkHero =
    pathname?.startsWith("/services") ||
    pathname?.startsWith("/about") ||
    pathname?.startsWith("/projects/") ||
    pathname?.startsWith("/news/") ||
    false;

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
  // Force white text on dark-hero routes; otherwise interpolate black → white as nav darkens.
  const textChannel = darkHero ? 255 : Math.round(255 * (1 - transparency));

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
        <Link href="/" className="font-semibold text-[16px] tracking-[-0.64px] capitalize">
          H.Studio
        </Link>
        <div className="hidden md:flex gap-14 font-semibold text-[16px] tracking-[-0.64px] capitalize">
          {NAV_LINKS.map(({ label, href }) => (
            <Magnetic key={label} strength={0.25}>
              <Link
                href={href}
                className="relative inline-block group py-1"
              >
                {label}
                <span className="absolute left-0 -bottom-0.5 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            </Magnetic>
          ))}
        </div>
        <Magnetic strength={0.4} className="hidden md:block">
          <SlideButton variant={atTop && !darkHero ? "filled" : "inverse"}>
            Let&apos;s talk
          </SlideButton>
        </Magnetic>
        <MobileNav />
      </div>
    </nav>
  );
}
