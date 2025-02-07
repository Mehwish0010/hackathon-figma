import { groq } from "next-sanity";

export const allProducts = groq`
  *[_type == "product"]
`;

export const four = groq`
  *[_type == "product"][0..3]
`;

export const full = groq`
  *[_type == "product"][0..11]
`;

// New query to fetch a single product based on its slug
export const productBySlug = groq`
  *[_type == "product" && slug.current == $slug][0]
`;
