import Magnetic from "@/components/Magnetic";
import ParallaxLayer from "@/components/ParallaxLayer";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#d8d5cf] h-[80vh] min-h-[635px]">

      {/* ── Mobile background image — centred, fixed 847px height ── */}
      <ParallaxLayer
        y={120}
        scale={1.18}
        className="md:hidden absolute inset-0"
      >
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: "50% 25%" }}
          fetchPriority="high"
        />
      </ParallaxLayer>

      {/* ── Desktop background image — always fills section ── */}
      <ParallaxLayer
        y={150}
        scale={1.18}
        className="hidden md:block absolute inset-0"
      >
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: "50% 25%" }}
          fetchPriority="high"
        />
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
      <div className="relative h-full flex flex-col px-6 md:px-8 pt-[72px] md:pt-[89px]">

        {/* Content wrapper
            Mobile:  flex-1 + justify-end  → content pinned to bottom
            Desktop: flex-1 + justify-center → content centred in remaining height
                     so "Harvey Specter" sits at the vertical midpoint of the section
        */}
        <div className="flex-1 flex flex-col justify-end md:justify-center pb-12 md:pb-0">

          {/* All foreground text translates DOWN together so spacing is preserved
              and the headline + description stay readable longer as you scroll past.
              useTop animates `top` (not transform) so the headline's mix-blend-mode
              still resolves against the section's bg image. */}
          <ParallaxLayer y={140} yMobile={-100} useTop className="flex flex-col">

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
            <h1
              className="md:hidden font-medium text-white text-center capitalize w-full leading-[0.8]"
              style={{ fontSize: "96px", letterSpacing: "-6.72px", mixBlendMode: "overlay" }}
            >
              Harvey<br />Specter
            </h1>

            {/* Desktop name — fills container width exactly at any viewport */}
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

            {/* Description + CTA — 2rem below name on mobile, 1rem on desktop */}
            <div className="mt-8 md:mt-4 flex md:justify-end">
              <div className="w-full px-6 md:w-[294px] md:px-0 flex flex-col gap-[17px]">
                <p className="font-bold italic text-[14px] text-[#1f1f1f] tracking-[-0.56px] uppercase leading-[1.1]">
                  H.Studio is a{" "}
                  <span className="not-italic font-normal">full-service</span>{" "}
                  creative studio creating beautiful digital experiences and products.
                  We are an{" "}
                  <span className="not-italic font-normal">award winning</span>{" "}
                  design and art group specializing in branding, web design and engineering.
                </p>
                <Magnetic strength={0.4} className="w-fit">
                  <button className="bg-black text-white text-[14px] font-medium tracking-[-0.56px] px-4 py-3 rounded-[24px] hover:bg-[#d4a747] hover:text-black transition-colors duration-300">
                    Let&apos;s talk
                  </button>
                </Magnetic>
              </div>
            </div>

          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
