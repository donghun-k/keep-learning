import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-11-20",
  token: process.env.SANITY_SECRET_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (sorce: SanityImageSource) => {
  return builder.image(sorce).width(800).url();
};
