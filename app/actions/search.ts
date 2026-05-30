"use server";

import { client } from "../../lib/sanity";

export async function searchProducts(searchQuery: string) {
  // Don't search if the query is too short
  if (!searchQuery || searchQuery.length < 2) return [];

  // Use GROQ wildcard matching to find anything that matches the search term
  const query = `*[_type == "product" && (title match $searchTerm || name match $searchTerm)] | order(_createdAt desc)[0...5] {
    _id,
    title,
    name,
    "slug": slug.current,
    priceBDT,
    priceUSD,
    "imageUrl": image.asset->url
  }`;

  try {
    const results = await client.fetch(query, { searchTerm: `*${searchQuery}*` });
    return results;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}