import { groq } from "next-sanity";
import { i18nQueryParam } from "@/lib/helpers";

export default {
  settings: groq`*[_type == "documentSettings"${i18nQueryParam()}]`,
};
