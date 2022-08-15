import { groq } from "next-sanity";
import { i18nQueryParam, i18nQueryReferences } from "@/lib/helpers";

export default {
  test: groq`*[_type == "documentTest"${i18nQueryParam()}]`,
};
