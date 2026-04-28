import { BracketSide } from "@/components/Brackets";

type Project = {
  title: string;
  tags: string[];
  img: string;
};

const PROJECTS: Project[] = [
  { title: "Surfers paradise", tags: ["Social Media", "Photography"], img: "/images/work-1.png" },
  { title: "Cyberpunk caffe", tags: ["Social Media", "Photography"], img: "/images/work-2.png" },
  { title: "Agency 976", tags: ["Social Media", "Photography"], img: "/images/work-3.png" },
  { title: "Minimal Playground", tags: ["Social Media", "Photography"], img: "/images/work-4.png" },
];

function ArrowIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M11 21 L21 11 M13 11 H21 V19"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="backdrop-blur-[10px] bg-white/30 rounded-full px-2 py-1 text-[14px] font-medium tracking-[-0.04em] text-[#111] leading-none">
      {label}
    </span>
  );
}

function ProjectCard({
  project,
  imageHeight,
  titleSize,
}: {
  project: Project;
  imageHeight: string;
  titleSize: string;
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div
        className="relative w-full overflow-hidden flex items-end pb-4 pl-4"
        style={{ height: imageHeight }}
      >
        <img
          src={project.img}
          alt={project.title}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="relative flex gap-3 items-center">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h3
          className="font-black uppercase leading-[1.1] text-black"
          style={{ fontSize: titleSize, letterSpacing: "-0.04em" }}
        >
          {project.title}
        </h3>
        <ArrowIcon />
      </div>
    </div>
  );
}

function CTABox() {
  return (
    <div className="flex items-center gap-3 w-full md:w-[465px] text-[#1f1f1f]">
      <BracketSide side="left" />
      <div className="flex-1 flex flex-col gap-[10px] py-3">
        <p className="italic text-[14px] tracking-[-0.04em] leading-[1.3]">
          Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
        </p>
        <button className="bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-[24px] w-fit hover:bg-neutral-800 transition-colors">
          Let&apos;s talk
        </button>
      </div>
      <BracketSide side="right" />
    </div>
  );
}

export default function Work() {
  return (
    <section id="projects" className="bg-white py-12 md:py-20 px-4 md:px-8">

      {/* ── Mobile header ── */}
      <div className="md:hidden flex flex-col gap-4 uppercase">
        <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
          [ portfolio ]
        </p>
        <div className="flex items-start justify-between">
          <div
            className="font-light text-black"
            style={{ fontSize: "32px", letterSpacing: "-0.08em", lineHeight: "0.86" }}
          >
            <p>Selected</p>
            <p>Work</p>
          </div>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
            004
          </p>
        </div>
      </div>

      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-center justify-between uppercase">
        <div className="flex gap-[10px] items-start">
          <div
            className="font-light text-black"
            style={{ fontSize: "96px", letterSpacing: "-0.08em", lineHeight: "0.86" }}
          >
            <p>Selected</p>
            <p>Work</p>
          </div>
          <p className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
            004
          </p>
        </div>
        <div className="flex h-[110px] items-center justify-center w-[15px]">
          <p
            className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase whitespace-nowrap leading-[1.1] -rotate-90"
          >
            [ portfolio ]
          </p>
        </div>
      </div>

      {/* ── Mobile — single stacked column ── */}
      <div className="md:hidden flex flex-col gap-6 mt-8">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} imageHeight="390px" titleSize="24px" />
        ))}
        <CTABox />
      </div>

      {/* ── Desktop — staggered two-column grid ── */}
      <div className="hidden md:flex gap-6 items-end mt-[61px]">
        <div className="flex-1 flex flex-col items-start justify-between self-stretch gap-6">
          <ProjectCard project={PROJECTS[0]} imageHeight="744px" titleSize="36px" />
          <ProjectCard project={PROJECTS[1]} imageHeight="699px" titleSize="36px" />
          <CTABox />
        </div>
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
          <ProjectCard project={PROJECTS[2]} imageHeight="699px" titleSize="36px" />
          <ProjectCard project={PROJECTS[3]} imageHeight="744px" titleSize="36px" />
        </div>
      </div>

    </section>
  );
}
