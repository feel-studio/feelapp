import { groq } from "next-sanity";
import { i18nQueryParam, i18nQueryReferences } from "@/lib/helpers";

export default {
  projects: groq`*[_type == "documentProject"${i18nQueryParam()}]`,
  info: groq`*[_type == "documentInfo"${i18nQueryParam()}]`,
};
