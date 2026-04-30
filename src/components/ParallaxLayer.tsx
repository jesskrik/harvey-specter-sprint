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
  /** Pixels to translate the layer across the trigger range. Positive = down (slower-than-scroll feel). */
  y?: number;
};

export default function ParallaxLayer({ children, className, style, y = 120 }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const trigger = wrapper.parentElement || wrapper;

      gsap.to(wrapper, {
        y,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className={className} style={style}>
      {children}
    </div>
  );
}
