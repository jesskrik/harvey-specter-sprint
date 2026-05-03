import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import ProjectsClient, {
  type ProjectCardData,
} from "@/components/sections/ProjectsClient";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PROJECTS_QUERY } from "@/sanity/queries";

type SanityImageSource = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

type Project = {
  _id: string;
  title: string;
  slug: string | null;
  tags: string[] | null;
  image: SanityImageSource & { alt?: string };
  description?: string | null;
};

const DESCRIPTION_FALLBACK =
  "A short overview of the brief, the audience, and what we shipped — strategy, design, and build delivered end-to-end from the studio.";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);

  // Pre-build image URLs server-side so the client component stays a plain
  // renderer with no Sanity helper imports — keeps its bundle small.
  const cards: ProjectCardData[] = projects
    .filter((p): p is Project & { slug: string } => Boolean(p.slug))
    .map((p) => ({
      _id: p._id,
      slug: p.slug,
      title: p.title,
      tags: p.tags,
      imageUrl: urlFor(p.image).width(1600).quality(85).auto("format").url(),
      alt: p.image.alt ?? p.title,
      description: p.description?.trim() || DESCRIPTION_FALLBACK,
    }));

  return (
    <>
      <Nav />
      <main className="relative md:z-10 bg-white overflow-x-hidden">
        <ProjectsClient projects={cards} />
      </main>
      <Footer />
    </>
  );
}
