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
  /** Pixels to translate across the trigger range. Positive = down, negative = up. */
  y?: number;
  /** Final scale at the end of the trigger range. */
  scale?: number;
  /** Final opacity at the end of the trigger range. */
  opacity?: number;
};

export default function ParallaxLayer({
  children,
  className,
  style,
  y = 0,
  scale,
  opacity,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const trigger =
        wrapper.closest("section") || wrapper.parentElement || wrapper;

      const vars: gsap.TweenVars = {
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      };
      if (y) vars.y = y;
      if (scale !== undefined) vars.scale = scale;
      if (opacity !== undefined) vars.opacity = opacity;

      gsap.to(wrapper, vars);
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className={className} style={style}>
      {children}
    </div>
  );
}
