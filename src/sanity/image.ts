import imageUrlBuilder from "@sanity/image-url";
type SanityImageSource = { _type: "image"; asset: { _ref: string; _type: "reference" } };
import { dataset, projectId } from "./env";

const builder = imageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
