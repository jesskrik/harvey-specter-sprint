import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import ProjectClient, {
  type NextProjectLink,
  type ProjectDetail,
} from "@/components/sections/ProjectClient";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
} from "@/sanity/queries";

type SanityImageSource = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

type Project = {
  _id: string;
  title: string;
  slug: string | null;
  image: SanityImageSource & { alt?: string };
  tags: string[] | null;
  description?: string | null;
};

type ProjectSlug = {
  slug: string | null;
  title: string;
  image: SanityImageSource & { alt?: string };
};

const DESCRIPTION_FALLBACK =
  "A short overview of the brief, the audience, and what we shipped — strategy, design, and build delivered end-to-end from the studio.";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<ProjectSlug[]>(PROJECT_SLUGS_QUERY);
  return slugs
    .filter((s): s is ProjectSlug & { slug: string } => Boolean(s.slug))
    .map((s) => ({ slug: s.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [project, allSlugs] = await Promise.all([
    client.fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug }),
    client.fetch<ProjectSlug[]>(PROJECT_SLUGS_QUERY),
  ]);

  if (!project || !project.slug) notFound();

  const ordered = allSlugs.filter(
    (s): s is ProjectSlug & { slug: string } => Boolean(s.slug)
  );
  const currentIndex = ordered.findIndex((s) => s.slug === slug);
  // Wrap to first project after the last — gives a continuous loop through
  // the body of work rather than a dead end.
  const nextIndex = (currentIndex + 1) % ordered.length;
  const nextSlug = ordered[nextIndex];

  const detail: ProjectDetail = {
    title: project.title,
    tags: project.tags,
    description: project.description?.trim() || DESCRIPTION_FALLBACK,
    imageUrl: urlFor(project.image).width(2000).quality(85).auto("format").url(),
    alt: project.image.alt ?? project.title,
    index: currentIndex + 1,
    total: ordered.length,
  };

  const next: NextProjectLink = {
    slug: nextSlug.slug,
    title: nextSlug.title,
    imageUrl: urlFor(nextSlug.image).width(1600).quality(85).auto("format").url(),
    alt: nextSlug.image.alt ?? nextSlug.title,
  };

  return (
    <>
      <Nav />
      <main className="relative md:z-10 bg-white overflow-x-hidden">
        <ProjectClient project={detail} next={next} />
      </main>
      <Footer />
    </>
  );
}
