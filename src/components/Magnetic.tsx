"use client";

import {
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  children: ReactNode;
  /** How strongly the element follows the cursor (0–1). 0.25 subtle, 0.45 obvious. */
  strength?: number;
  className?: string;
  style?: CSSProperties;
};

export default function Magnetic({
  children,
  strength = 0.35,
  className,
  style,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      const el = wrapperRef.current;
      if (!el) return;
      xTo.current = gsap.quickTo(el, "x", {
        duration: 0.55,
        ease: "elastic.out(1, 0.5)",
      });
      yTo.current = gsap.quickTo(el, "y", {
        duration: 0.55,
        ease: "elastic.out(1, 0.5)",
      });
    },
    { scope: wrapperRef }
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el || !xTo.current || !yTo.current) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    xTo.current(x * strength);
    yTo.current(y * strength);
  };

  const handleMouseLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
