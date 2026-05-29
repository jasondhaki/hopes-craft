import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// 1. Establish the connection client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-27", // Matched exactly to your sanity/env.ts
  useCdn: true, // Enables Edge caching for lightning-fast loading
});

// 2. Initialize the Image Builder
const builder = imageUrlBuilder(client);

// 3. Helper function to generate usable image URLs from Sanity's raw image data
export function urlFor(source: any) {
  return builder.image(source);
}