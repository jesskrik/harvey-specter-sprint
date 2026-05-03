import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(displayOrder asc, _createdAt asc){
    _id,
    title,
    "slug": slug.current,
    image,
    tags,
    description
  }
`);

// Single project by slug — used by /projects/[slug]
export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    image,
    tags,
    description
  }
`);

// Ordered nav list — used to compute "up next" on individual project
// pages. Includes the image so the next-project tile can render a
// preview thumbnail.
export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(displayOrder asc, _createdAt asc){
    "slug": slug.current,
    title,
    image
  }
`);
