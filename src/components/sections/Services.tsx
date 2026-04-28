type Service = {
  num: string;
  title: string;
  description: string;
  img: string;
  /** Photography (item 4) needs a custom crop — the source image is portrait
   *  and the design pulls it up so the lotion bottle is centred in the 151px square. */
  cropPortrait?: boolean;
};

const DESCRIPTION =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

const SERVICES: Service[] = [
  { num: "1", title: "Brand Discovery", description: DESCRIPTION, img: "/images/service-1.png" },
  { num: "2", title: "Web design & Dev", description: DESCRIPTION, img: "/images/service-2.png" },
  { num: "3", title: "Marketing", description: DESCRIPTION, img: "/images/service-3.png" },
  { num: "4", title: "Photography", description: DESCRIPTION, img: "/images/service-4.png", cropPortrait: true },
];

function ServiceImage({ src, cropPortrait }: { src: string; cropPortrait?: boolean }) {
  return (
    <div className="relative size-[151px] shrink-0 overflow-hidden">
      <img
        src={src}
        alt=""
        className={
          cropPortrait
            ? "absolute left-0 w-full max-w-none"
            : "absolute inset-0 size-full object-cover"
        }
        style={cropPortrait ? { height: "149.93%", top: "-42.25%" } : undefined}
      />
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-black text-white py-12 md:py-20 px-4 md:px-8">

      {/* Top label */}
      <p className="font-[family-name:var(--font-geist-mono)] text-[14px] uppercase leading-[1.1]">
        [ services ]
      </p>

      {/* Big header — [4] DELIVERABLES */}
      <div
        className="flex items-center justify-between w-full font-light uppercase whitespace-nowrap mt-8 md:mt-12"
        style={{
          fontSize: "clamp(32px, 6.67vw, 96px)",
          letterSpacing: "-0.08em",
          lineHeight: "1",
        }}
      >
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service list */}
      <div className="flex flex-col gap-8 md:gap-12 mt-8 md:mt-12">
        {SERVICES.map((s) => (
          <article key={s.num} className="w-full">

            {/* Number + divider */}
            <div className="flex flex-col gap-[9px] mb-3 md:mb-[9px]">
              <p className="font-[family-name:var(--font-geist-mono)] text-[14px] uppercase leading-[1.1]">
                [ {s.num} ]
              </p>
              <hr className="border-t border-white/80 w-full" />
            </div>

            {/* ── Mobile — stacked: title → description → image ── */}
            <div className="md:hidden flex flex-col gap-4">
              <h3 className="font-bold italic text-[36px] tracking-[-0.04em] uppercase leading-[1.1]">
                {s.title}
              </h3>
              <p className="text-[14px] tracking-[-0.04em] leading-[1.3]">
                {s.description}
              </p>
              <ServiceImage src={s.img} cropPortrait={s.cropPortrait} />
            </div>

            {/* ── Desktop — title left, description+image right ── */}
            <div className="hidden md:flex items-start justify-between gap-8">
              <h3 className="font-bold italic text-[36px] tracking-[-0.04em] uppercase leading-[1.1] shrink-0">
                {s.title}
              </h3>
              <div className="flex items-start gap-6 shrink-0">
                <p className="text-[14px] tracking-[-0.04em] leading-[1.3] w-[393px]">
                  {s.description}
                </p>
                <ServiceImage src={s.img} cropPortrait={s.cropPortrait} />
              </div>
            </div>

          </article>
        ))}
      </div>

    </section>
  );
}
