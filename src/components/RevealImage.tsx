"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function RevealImage({ children, className, style }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const img = wrapper.querySelector("img");
      if (!img) return;

      gsap.fromTo(
        img,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className={className} style={style}>
      {children}
    </div>
  );
}
