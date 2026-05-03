import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import NewsArticleClient from "@/components/sections/NewsArticleClient";
import { NEWS } from "@/data/news";

export function generateStaticParams() {
  return NEWS.map((post) => ({ slug: post.slug }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const index = NEWS.findIndex((post) => post.slug === slug);
  if (index === -1) notFound();

  const post = NEWS[index];
  // Wrap to first article after the last so the "up next" handoff loops.
  const next = NEWS[(index + 1) % NEWS.length];

  return (
    <>
      <Nav />
      <main className="relative md:z-10 bg-white overflow-x-hidden">
        <NewsArticleClient post={post} next={next} />
      </main>
      <Footer />
    </>
  );
}
