import { BracketSide } from "@/components/Brackets";
import Magnetic from "@/components/Magnetic";
import RevealImage from "@/components/RevealImage";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PROJECTS_QUERY } from "@/sanity/queries";
type SanityImageSource = { _type: "image"; asset: { _ref: string; _type: "reference" } };

type Project = {
  _id: string;
  title: string;
  tags: string[] | null;
  image: SanityImageSource & { alt?: string };
};

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
  const imgSrc = urlFor(project.image).width(1200).quality(85).auto("format").url();
  const alt = project.image.alt ?? project.title;

  return (
    <div className="flex flex-col gap-[10px] w-full">
      <RevealImage
        className="relative w-full overflow-hidden flex items-end pb-4 pl-4"
        style={{ height: imageHeight }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={alt}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="relative flex gap-3 items-center">
          {project.tags?.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </RevealImage>
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
        <Magnetic strength={0.4} className="w-fit">
          <button className="bg-black text-white border border-black text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-[24px] hover:bg-white hover:text-black transition-colors duration-300">
            Let&apos;s talk
          </button>
        </Magnetic>
      </div>
      <BracketSide side="right" />
    </div>
  );
}

export const revalidate = 60;

export default async function Work() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);

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
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} imageHeight="390px" titleSize="24px" />
        ))}
        <CTABox />
      </div>

      {/* ── Desktop — staggered two-column grid ── */}
      <div className="hidden md:flex gap-6 items-end mt-[61px]">
        <div className="flex-1 flex flex-col items-start justify-between self-stretch gap-6">
          {projects[0] && (
            <ProjectCard project={projects[0]} imageHeight="744px" titleSize="36px" />
          )}
          {projects[1] && (
            <ProjectCard project={projects[1]} imageHeight="699px" titleSize="36px" />
          )}
          <CTABox />
        </div>
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
          {projects[2] && (
            <ProjectCard project={projects[2]} imageHeight="699px" titleSize="36px" />
          )}
          {projects[3] && (
            <ProjectCard project={projects[3]} imageHeight="744px" titleSize="36px" />
          )}
        </div>
      </div>

    </section>
  );
}
