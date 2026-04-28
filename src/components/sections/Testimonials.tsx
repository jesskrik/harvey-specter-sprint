type Testimonial = {
  quote: string;
  author: string;
  logo: string;
  logoHeight: number;
  /** Desktop: x position from left at 1440px viewport (will scale via vw) */
  x: number;
  /** Desktop: y position from top of section, fixed px */
  y: number;
  /** Card rotation, degrees */
  rotate: number;
  /** Mobile rotation override (degrees) */
  mobileRotate: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    author: "Marko Stojković",
    logo: "/images/logo-1.svg",
    logoHeight: 19,
    x: 102, y: 142, rotate: -6.85, mobileRotate: -3.5,
  },
  {
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    author: "Lukas Weber",
    logo: "/images/logo-2.svg",
    logoHeight: 19,
    x: 676, y: 272, rotate: 2.9, mobileRotate: 2,
  },
  {
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don’t just make things look good; they solve business problems through visual clarity.",
    author: "Sarah Jenkins",
    logo: "/images/logo-3.svg",
    logoHeight: 31,
    x: 305, y: 553, rotate: 2.23, mobileRotate: -2.5,
  },
  {
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    author: "Sofia Martínez",
    logo: "/images/logo-4.svg",
    logoHeight: 36,
    x: 987, y: 546, rotate: -4.15, mobileRotate: 3,
  },
];

function TestimonialCard({
  t,
  width,
}: {
  t: Testimonial;
  width: number;
}) {
  return (
    <div
      className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4"
      style={{ width: `${width}px` }}
    >
      <img
        src={t.logo}
        alt=""
        className="block w-auto"
        style={{ height: `${t.logoHeight}px` }}
      />
      <p className="text-[18px] tracking-[-0.04em] leading-[1.3] text-[#1f1f1f]">
        {t.quote}
      </p>
      <p className="text-[16px] font-black tracking-[-0.04em] uppercase leading-[1.1] text-black">
        {t.author}
      </p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white overflow-hidden">

      {/* ── Mobile — heading + horizontal-scroll cards ── */}
      <div className="md:hidden py-16 px-4 flex flex-col gap-8">
        <h2
          className="font-medium text-center capitalize text-black"
          style={{
            fontSize: "64px",
            letterSpacing: "-0.07em",
            lineHeight: "0.8",
          }}
        >
          Testimonials
        </h2>
        <div className="-mx-4 px-4 overflow-x-auto pb-4">
          <div className="flex gap-2 w-max items-center">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="shrink-0"
                style={{ transform: `rotate(${t.mobileRotate}deg)` }}
              >
                <TestimonialCard t={t} width={260} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop — scattered cards around centred headline ── */}
      <div className="hidden md:block relative w-full" style={{ height: "950px" }}>
        {/* Headline centred */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2
            className="font-medium capitalize text-black whitespace-nowrap"
            style={{
              fontSize: "clamp(96px, 13.75vw, 198px)",
              letterSpacing: "-0.07em",
              lineHeight: "1.1",
            }}
          >
            Testimonials
          </h2>
        </div>

        {/* Cards — left scaled to viewport via vw, top fixed in px */}
        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            className="absolute"
            style={{
              left: `${(t.x / 1440) * 100}vw`,
              top: `${t.y}px`,
              transform: `rotate(${t.rotate}deg)`,
              transformOrigin: "center",
            }}
          >
            <TestimonialCard t={t} width={353} />
          </div>
        ))}
      </div>

    </section>
  );
}
