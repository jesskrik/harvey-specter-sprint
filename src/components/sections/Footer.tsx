import Magnetic from "@/components/Magnetic";

function HaveAProject() {
  return (
    <p className="text-[24px] uppercase tracking-[-0.04em] leading-[1.1] w-[298px]">
      <span className="font-light italic">Have a </span>
      <span className="font-black not-italic">project</span>
      <span className="font-light italic"> in mind?</span>
    </p>
  );
}

function LetsTalkOutlined() {
  return (
    <Magnetic strength={0.4} className="w-fit">
      <button className="border border-white rounded-full px-4 py-3 text-[14px] font-medium tracking-[-0.04em] hover:bg-white hover:text-black transition-colors">
        Let&apos;s talk
      </button>
    </Magnetic>
  );
}

function StudioBig({ size }: { size: string }) {
  return (
    <h2
      className="font-semibold capitalize whitespace-nowrap"
      style={{
        fontSize: size,
        letterSpacing: "-0.06em",
        lineHeight: "0.8",
        transform: "translateY(0.06em)",
      }}
    >
      H.Studio
    </h2>
  );
}

const SOCIALS_LEFT = ["Facebook", "Instagram"];
const SOCIALS_RIGHT = ["x.com", "Linkedin"];

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-white overflow-hidden">

      {/* ── Mobile ── */}
      <div className="md:hidden pt-12 px-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <HaveAProject />
            <LetsTalkOutlined />
          </div>
          <ul className="flex flex-col gap-3">
            {[...SOCIALS_LEFT, ...SOCIALS_RIGHT].map((name) => (
              <li
                key={name}
                className="text-[18px] uppercase tracking-[-0.04em] leading-[1.1]"
              >
                {name}
              </li>
            ))}
          </ul>
          <hr className="border-t border-white w-full mt-2" />
        </div>

        <div className="mt-12 flex flex-col gap-4 items-center">
          <div className="flex gap-[34px] pb-4 text-[12px] uppercase tracking-[-0.04em] leading-[1.1]">
            <a href="#" className="underline">licences</a>
            <a href="#" className="underline">Privacy policy</a>
          </div>
          <div className="w-full flex flex-col gap-3 items-start overflow-hidden">
            <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase">
              [ Coded By Claude ]
            </span>
            <StudioBig size="91.425px" />
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex flex-col pt-12 px-8 gap-[120px]">

        {/* TOP — CTA + socials + divider */}
        <div className="flex flex-col gap-12">
          <div className="flex items-start justify-between gap-8">
            <div className="flex flex-col gap-3 w-[298px]">
              <HaveAProject />
              <LetsTalkOutlined />
            </div>
            <div className="w-[298px] text-center text-[18px] uppercase tracking-[-0.04em] leading-[1.1]">
              {SOCIALS_LEFT.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
            <div className="w-[298px] text-right text-[18px] uppercase tracking-[-0.04em] leading-[1.1]">
              {SOCIALS_RIGHT.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
          </div>
          <hr className="border-t border-white w-full" />
        </div>

        {/* BOTTOM — H.Studio + rotated mono + legal links */}
        <div className="flex items-end justify-between gap-2">
          <div
            className="flex-1 relative h-[219px]"
            style={{ containerType: "inline-size" }}
          >
            {/* Rotated [ Coded By Claude ] */}
            <div className="absolute left-0 top-1/2 h-[160px] w-[15px] flex items-center justify-center -translate-y-1/2">
              <span className="-rotate-90 whitespace-nowrap font-[family-name:var(--font-geist-mono)] text-[14px] uppercase">
                [ Coded By Claude ]
              </span>
            </div>
            <div className="absolute left-5 bottom-0">
              <StudioBig size="clamp(100px, 25cqw, 290px)" />
            </div>
          </div>

          <div className="flex gap-[34px] items-center pb-8 shrink-0">
            <a
              href="#"
              className="text-[12px] uppercase tracking-[-0.04em] leading-[1.1] underline"
            >
              licences
            </a>
            <a
              href="#"
              className="text-[12px] uppercase tracking-[-0.04em] leading-[1.1] underline"
            >
              Privacy policy
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}
