import { groq } from "next-sanity";
import { i18nQueryParam, i18nQueryReferences } from "@/lib/helpers";

export default {
  collection: groq`*[_type == "documentCollection" && slug.current == $slug${i18nQueryParam()}]{...${i18nQueryReferences()}}`,
  // collections: groq`*[_type == "documentCollection"${i18nQueryParam()}]`,
};
