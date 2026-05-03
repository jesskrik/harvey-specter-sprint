import Link from "next/link";
import type { ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  variant?: "filled" | "outlined" | "inverse";
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  /** When provided, renders as a Next.js Link instead of a <button>. */
  href?: string;
  /** Native button type — relevant only when no `href` is set. */
  type?: "button" | "submit" | "reset";
};

export default function SlideButton({
  children,
  variant = "filled",
  className = "",
  onClick,
  href,
  type,
}: Props) {
  const variantClasses =
    variant === "filled"
      ? "bg-black text-white"
      : variant === "inverse"
      ? "bg-white text-black"
      : "border border-white text-white transition-colors duration-300 ease-out hover:border-[#d4a747]";

  const sharedClasses = `group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-3 text-[14px] font-medium tracking-[-0.04em] ${variantClasses} ${className}`;

  const inner = (
    <>
      {/* Dusty-yellow fill slides up from below.
          Use arbitrary `transform: translateY()` rather than Tailwind's
          `translate-*` utilities — those map to the standalone `translate`
          CSS property which doesn't compose with the rest of the codebase's
          `transform`-based animations. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#d4a747] [transform:translateY(101%)] transition-transform duration-300 ease-out group-hover:[transform:translateY(0)]"
      />
      {/* Text — original slides up out, duplicate slides up in */}
      <span className="relative block overflow-hidden leading-[1.2]">
        <span className="block transition-transform duration-300 ease-out group-hover:[transform:translateY(-100%)]">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-black [transform:translateY(100%)] transition-transform duration-300 ease-out group-hover:[transform:translateY(0)]"
        >
          {children}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={sharedClasses}>
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={sharedClasses}>
      {inner}
    </button>
  );
}
