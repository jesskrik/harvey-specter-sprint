export function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`shrink-0 ${className}`}
    >
      <path d="M16 0 H0 V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function BracketSide({ side }: { side: "left" | "right" }) {
  return (
    <div className="flex flex-col justify-between self-stretch shrink-0">
      <Corner className={side === "right" ? "rotate-90" : ""} />
      <Corner className={side === "left" ? "-rotate-90" : "rotate-180"} />
    </div>
  );
}
