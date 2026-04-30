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
  /** Override `y` on viewports < 768px. Use 0 to disable mobile parallax. */
  yMobile?: number;
  /** Final scale at the end of the trigger range. */
  scale?: number;
  /** Final opacity at the end of the trigger range. */
  opacity?: number;
  /** Animate `top` instead of `transform: translateY`. Use when descendants need
   *  mix-blend-mode — a transformed ancestor creates a new stacking context and
   *  breaks the blend's backdrop. */
  useTop?: boolean;
};

export default function ParallaxLayer({
  children,
  className,
  style,
  y = 0,
  yMobile,
  scale,
  opacity,
  useTop = false,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const trigger =
        wrapper.closest("section") || wrapper.parentElement || wrapper;

      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;
      const effectiveY = isMobile && yMobile !== undefined ? yMobile : y;

      const vars: gsap.TweenVars = {
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      };

      if (useTop) {
        if (effectiveY) vars.top = effectiveY;
      } else {
        if (effectiveY) vars.y = effectiveY;
        if (scale !== undefined) vars.scale = scale;
        if (opacity !== undefined) vars.opacity = opacity;
      }

      gsap.to(wrapper, vars);
    },
    { scope: wrapperRef }
  );

  const wrapperStyle: CSSProperties = useTop
    ? { position: "relative", top: 0, ...style }
    : style ?? {};

  return (
    <div ref={wrapperRef} className={className} style={wrapperStyle}>
      {children}
    </div>
  );
}
