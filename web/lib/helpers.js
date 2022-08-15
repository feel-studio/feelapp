import { default as projectConfig } from "../project.config.json";
import { config as sanityConfig } from "./config";

export const getImgUrl = (source) =>
  createImageUrlBuilder(sanityConfig).image(source);

export const getFileUrl = (_ref) =>
  _ref &&
  `https://cdn.sanity.io/files/${sanityConfig.projectId}/${
    sanityConfig.dataset
  }/${_ref.split("-")[1]}.${_ref.split("-")[2]}?dl=`;

export const getProportions = (ratioNative, orientationNative, ratioCustom) => {
  if (!ratioCustom)
    return { orientation: orientationNative, ratio: ratioNative };

  if (Array.isArray(ratioCustom)) {
    const ratios = [Math.max(...ratioCustom), Math.min(...ratioCustom)],
      ratio = ratios[orientationNative === "portrait" ? 1 : 0],
      orientation = ratio < 1 ? "portrait" : "landscape";
    return { orientation, ratio };
  } else {
    const orientation = ratioCustom < 1 ? "portrait" : "landscape";
    return { orientation, ratio: ratioCustom };
  }
};

export const getTranslations = (doc) =>
  doc &&
  Object.fromEntries(
    Object.entries(doc.i18n)
      .filter(([key]) => key.includes("translation_"))
      .map(([key, value], i) => [key.replace("translation_", ""), value])
  );

export const i18nQueryParam = () =>
  projectConfig?.i18n && Object.keys(projectConfig?.i18n).length > 1
    ? " && i18n.locale == $locale"
    : "";

export const i18nQueryReferences = () =>
  projectConfig?.i18n && Object.keys(projectConfig?.i18n).length > 1
    ? `, i18n{...,${Object.keys(projectConfig?.i18n)
        ?.map((code) => `translation_${code}->`)
        .join(",")}}`
    : "";
