import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const envText = readFileSync(resolve(projectRoot, ".env.local"), "utf8");
const env = Object.fromEntries(
  envText
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    })
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-02-01",
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const PROJECTS = [
  { title: "Surfers paradise", slug: "surfers-paradise", file: "work-1.png", tags: ["Social Media", "Photography"], displayOrder: 10 },
  { title: "Cyberpunk caffe", slug: "cyberpunk-caffe", file: "work-2.png", tags: ["Social Media", "Photography"], displayOrder: 20 },
  { title: "Agency 976", slug: "agency-976", file: "work-3.png", tags: ["Social Media", "Photography"], displayOrder: 30 },
  { title: "Minimal Playground", slug: "minimal-playground", file: "work-4.png", tags: ["Social Media", "Photography"], displayOrder: 40 },
];

for (const p of PROJECTS) {
  const id = `project-${p.slug}`;
  const filePath = resolve(projectRoot, "public/images", p.file);
  console.log(`Uploading ${p.file}...`);
  const asset = await client.assets.upload("image", readFileSync(filePath), {
    filename: p.file,
  });
  console.log(`  asset _id: ${asset._id}`);

  const doc = {
    _id: id,
    _type: "project",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: p.title,
    },
    tags: p.tags,
    displayOrder: p.displayOrder,
  };

  await client.createOrReplace(doc);
  console.log(`  created ${id}`);
}

console.log("Done.");
