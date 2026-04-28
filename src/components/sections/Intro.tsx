export default function Intro() {
  return (
    <section className="bg-white pt-12 md:pt-[120px] pb-10 md:pb-20 px-4 md:px-8">

      {/* Header — mono label above divider, right-aligned */}
      <div className="mb-10 md:mb-12">
        <p className="text-right font-[family-name:var(--font-geist-mono)] text-[12px] md:text-[14px] text-[#1f1f1f] uppercase tracking-[-0.04em] mb-3">
          [ 8+ years in industry ]
        </p>
        <hr className="border-t border-[#1f1f1f] w-full" />
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden flex flex-col items-center gap-0 text-center">
        <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] tracking-normal mb-2">
          001
        </span>
        <h2
          className="font-light text-[#1f1f1f] uppercase leading-[0.88] w-full"
          style={{ fontSize: "32px", letterSpacing: "-0.03em" }}
        >
          A Creative Director /
          <br />
          Photographer
          <br />
          Born{" "}
          <span className="font-[family-name:var(--font-playfair)] italic font-normal not-uppercase">
            &amp;
          </span>{" "}
          Raised
          <br />
          On The South Side
          <br />
          Of Chicago.
        </h2>
        <p className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] uppercase tracking-[-0.04em] mt-6">
          [ creative freelancer ]
        </p>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:block relative">
        {/* "001" counter — top-right */}
        <span
          className="absolute right-0 top-0 font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] tracking-normal"
        >
          001
        </span>

        <h2
          className="font-light text-[#1f1f1f] uppercase leading-[0.84] w-full"
          style={{
            fontSize: "clamp(48px, 6.67vw, 96px)",
            letterSpacing: "-0.08em",
          }}
        >
          {/* Line 1: "A Creative Director /" — no indent */}
          <span className="block pl-0">
            A Creative Director /
          </span>

          {/* Line 2: "Photographer" — ~15.5% indent */}
          <span className="block" style={{ paddingLeft: "15.55%" }}>
            Photographer
          </span>

          {/* Line 3: "Born & Raised" — ~44.3% indent, & in Playfair italic */}
          <span className="block" style={{ paddingLeft: "44.33%" }}>
            Born{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal">
              &amp;
            </span>{" "}
            Raised
          </span>

          {/* Line 4: "On The South Side" — no indent */}
          <span className="block pl-0">
            On The South Side
          </span>

          {/* Line 5: "Of Chicago." — ~44% indent */}
          <span className="block" style={{ paddingLeft: "44.04%" }}>
            Of Chicago.
          </span>
        </h2>

        {/* Bottom-right label */}
        <p
          className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase tracking-[-0.04em] mt-10 text-right"
        >
          [ creative freelancer ]
        </p>
      </div>

    </section>
  );
}
