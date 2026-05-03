"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right" | "none";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Slide direction. "up" = enters from below. */
  from?: Direction;
  /** Translation distance in px. Default 60. */
  distance?: number;
  /** Tween duration in seconds. Default 0.9. */
  duration?: number;
  /** Delay in seconds. Default 0. */
  delay?: number;
  /** ScrollTrigger start. Default "top 85%". */
  start?: string;
};

export default function Reveal({
  children,
  className,
  style,
  from = "up",
  distance = 60,
  duration = 0.9,
  delay = 0,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const vars: gsap.TweenVars = { opacity: 0, duration, delay, ease: "power3.out" };
      if (from === "up") vars.y = distance;
      else if (from === "down") vars.y = -distance;
      else if (from === "left") vars.x = -distance;
      else if (from === "right") vars.x = distance;

      gsap.from(el, {
        ...vars,
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
