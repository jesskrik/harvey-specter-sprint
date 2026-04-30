import MobileNav from "@/components/MobileNav";
import ParallaxLayer from "@/components/ParallaxLayer";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#d8d5cf] h-[635px] md:min-h-[635px] md:h-[58.82vw]">

      {/* ── Mobile background image — centred, fixed 847px height ── */}
      <ParallaxLayer y={120} scale={1.06}>
        <div
          className="md:hidden absolute"
          style={{
            left: "60%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "139.47%",
            height: "847px",
            maxWidth: "none",
          }}
        >
          <img
            src="/images/hero.jpg"
            alt=""
            className="size-full object-cover object-top"
            fetchPriority="high"
          />
        </div>
      </ParallaxLayer>

      {/* ── Desktop background image — proportional, centred ── */}
      <ParallaxLayer y={150} scale={1.06}>
        <div
          className="hidden md:block absolute"
          style={{
            left: "60%",
            top: "-14.24vw",
            transform: "translateX(-50%)",
            width: "169.58%",
            aspectRatio: "2441.92 / 1434.67",
            maxWidth: "none",
          }}
        >
          <img
            src="/images/hero.jpg"
            alt=""
            className="size-full object-cover object-top"
            fetchPriority="high"
            style={{ maxWidth: "none" }}
          />
        </div>
      </ParallaxLayer>

      {/* ── Frosted glass ── */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[349px] md:h-[24.24vw] backdrop-blur-[10px]"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
        }}
      />

      {/* ── Layout shell — no z-index so blend modes reach the photo ── */}
      <div className="relative h-full flex flex-col px-4 md:px-8">

        {/* Nav — pinned to top on both breakpoints */}
        <nav className="shrink-0 flex items-center justify-between h-[72px] md:h-[89px]">
          <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">
            H.Studio
          </span>
          <div className="hidden md:flex gap-14 font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">
            {NAV_LINKS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-60 transition-opacity">
                {item}
              </a>
            ))}
          </div>
          <button className="hidden md:flex bg-black text-white text-[14px] font-medium tracking-[-0.56px] px-4 py-3 rounded-[24px] hover:bg-neutral-800 transition-colors">
            Let&apos;s talk
          </button>
          <MobileNav />
        </nav>

        {/* Content wrapper
            Mobile:  flex-1 + justify-end  → content pinned to bottom
            Desktop: flex-1 + justify-center → content centred in remaining height
                     so "Harvey Specter" sits at the vertical midpoint of the section
        */}
        <div className="flex-1 flex flex-col justify-end md:justify-center pb-6 md:pb-0">

          {/* Label */}
          <div className="flex justify-center md:block px-[18px]">
            <p
              className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]"
              style={{ mixBlendMode: "overlay" }}
            >
              [ Hello i&apos;m ]
            </p>
          </div>

          {/* Mobile name — two lines, fixed 96px */}
          <ParallaxLayer scale={1.06} opacity={0.4}>
            <h1
              className="md:hidden font-medium text-white text-center capitalize w-full leading-[0.8]"
              style={{ fontSize: "96px", letterSpacing: "-6.72px", mixBlendMode: "overlay" }}
            >
              Harvey<br />Specter
            </h1>
          </ParallaxLayer>

          {/* Desktop name — fills container width exactly at any viewport */}
          <ParallaxLayer scale={1.06} opacity={0.4}>
            <h1
              className="hidden md:block font-medium text-white text-center capitalize w-full leading-[1.1]"
              style={{
                fontSize: "clamp(80px, calc((100vw - 64px) / 6.95), 198px)",
                letterSpacing: "-0.07em",
                mixBlendMode: "overlay",
                whiteSpace: "pre",
              }}
            >
              {"Harvey   Specter"}
            </h1>
          </ParallaxLayer>

          {/* Description + CTA — 2rem below name on mobile, 1rem on desktop */}
          <ParallaxLayer y={-50} className="mt-8 md:mt-4 flex justify-center md:justify-end">
            <div className="w-[293px] md:w-[294px] flex flex-col gap-[17px]">
              <p className="font-bold italic text-[14px] text-[#1f1f1f] tracking-[-0.56px] uppercase leading-[1.1]">
                H.Studio is a{" "}
                <span className="not-italic font-normal">full-service</span>{" "}
                creative studio creating beautiful digital experiences and products.
                We are an{" "}
                <span className="not-italic font-normal">award winning</span>{" "}
                design and art group specializing in branding, web design and engineering.
              </p>
              <button className="bg-black text-white text-[14px] font-medium tracking-[-0.56px] px-4 py-3 rounded-[24px] w-fit hover:bg-neutral-800 transition-colors">
                Let&apos;s talk
              </button>
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
