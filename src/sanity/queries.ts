import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(displayOrder asc, _createdAt asc){
    _id,
    title,
    "slug": slug.current,
    image,
    tags
  }
`);
