import { BracketSide } from "@/components/Brackets";

const PARA = `Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.`;

export default function About() {
  return (
    <section id="about" className="bg-white py-12 md:py-20 px-4 md:px-8">

      {/* ── Mobile ── */}
      <div className="md:hidden flex flex-col gap-5">
        <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
          002
        </span>
        <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
          [ About ]
        </span>
        <div className="flex items-center gap-3">
          <BracketSide side="left" />
          <p className="flex-1 py-3 text-[14px] leading-[1.3] tracking-[-0.56px] text-[#1f1f1f]">
            {PARA}
          </p>
          <BracketSide side="right" />
        </div>
        <div className="w-full aspect-[422/594] overflow-hidden">
          <img
            src="/images/about.png"
            alt="Harvey Specter portrait"
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-start justify-between">
        <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          [ About ]
        </span>
        <div className="flex-1 flex items-end justify-end gap-8 ml-8">
          {/* Paragraph with corner brackets — capped width */}
          <div className="flex items-center gap-3 w-full max-w-[480px]">
            <BracketSide side="left" />
            <p className="flex-1 py-3 text-[14px] leading-[1.3] tracking-[-0.56px] text-[#1f1f1f]">
              {PARA}
            </p>
            <BracketSide side="right" />
          </div>
          {/* 002 counter + portrait image */}
          <div className="flex flex-col gap-6 shrink-0">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              002
            </span>
            <div
              className="overflow-hidden"
              style={{ width: "clamp(280px, 30.3vw, 436px)", aspectRatio: "436 / 614" }}
            >
              <img
                src="/images/about.png"
                alt="Harvey Specter portrait"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
