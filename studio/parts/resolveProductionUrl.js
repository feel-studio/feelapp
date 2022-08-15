import schema from "part:@sanity/base/schema";
import config from "../sanity.json";
import { replaceParallel } from "../utils";

const { previewSecret, remoteUrl, localUrl } = config.project;

export default function resolveProductionUrl(doc) {
  let { previewPath } = schema.get(doc._type);

  if (!previewPath) {
    console.warn(`Please specify previewPath value for "${doc._type}" schema`);
    return null;
  }

  if (!previewPath.startsWith("/")) {
    console.warn(`previewPath value should start with '/'`);
    previewPath = `/${previewPath}`;
  }

  const regExp = /\[.*?\]/g,
    previewPathParams = previewPath.match(regExp);

  if (previewPathParams?.length > 0) {
    const dynamicValues = previewPathParams.map((param) => {
      const paramStr = param.replace(/(^.*\[|\].*$)/g, "");
      return paramStr === "slug" ? doc.slug?.current : doc[paramStr];
    });

    previewPath = replaceParallel(
      previewPathParams,
      dynamicValues,
      previewPath
    );
  }

  const baseUrl =
      window.location.hostname === "localhost" ? localUrl : remoteUrl,
    previewUrl = new URL(baseUrl);

  previewUrl.pathname = `/api/preview`;
  previewUrl.searchParams.append(`target`, baseUrl + previewPath);
  previewUrl.searchParams.append(`secret`, previewSecret);

  return previewUrl.toString();
}
