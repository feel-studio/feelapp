import { groq } from "next-sanity";
import { i18nQueryParam, i18nQueryReferences } from "@/lib/helpers";

const refVideo = `mediaType == 'video' => @ {..., video {asset->}}, mediaType != 'video' => @}`;

export default {
  projects: groq`*[_type == "documentProject" && status == 'visible']|order(orderRank){slug, thumbnails[]{mediaType == 'video' => @ {..., video {asset->}}, mediaType != 'video' => @}}`,
  info: groq`*[_type == "documentInfo"${i18nQueryParam()}]`,
};
