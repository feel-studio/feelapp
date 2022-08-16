import { groq } from "next-sanity";
import { i18nQueryParam, i18nQueryReferences } from "@/lib/helpers";

export default {
  project: groq`*[_type == "documentProject" && slug.current == $slug${i18nQueryParam()} && status != 'archive']{..., content[status match 'visible']{mediaType == 'video' => @ {..., video {asset->}}, mediaType != 'video' => @}}`,
  info: groq`*[_type == "documentInfo"${i18nQueryParam()}]`,
};
