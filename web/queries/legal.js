import { groq } from "next-sanity";
import { i18nQueryParam } from "@/lib/helpers";

export default {
  legal: groq`*[_type == "documentLegal"${i18nQueryParam()}]`,
};
