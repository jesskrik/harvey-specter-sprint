"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center"
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Full-screen overlay portalled to <body> so it isn't bound by Nav's
          transform-based containing block. */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[60] bg-black flex flex-col px-6 transition-transform duration-300 ease-in-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between h-[72px] shrink-0">
              <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize text-white">
                H.Studio
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center gap-2">
              {NAV_LINKS.map((item, i) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="font-medium text-white capitalize leading-none py-3 border-b border-white/10 hover:opacity-60 transition-opacity"
                  style={{ fontSize: "clamp(36px, 11vw, 56px)", letterSpacing: "-0.03em" }}
                >
                  <span className="text-white/30 text-[14px] font-mono mr-3 tracking-normal">
                    0{i + 1}
                  </span>
                  {item}
                </a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="shrink-0 pb-10">
              <button
                className="bg-white text-black text-[14px] font-medium tracking-[-0.56px] px-6 py-3 rounded-[24px] hover:bg-[#d4a747] hover:text-black transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                Let&apos;s talk
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
