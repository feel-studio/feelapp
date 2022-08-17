import { getImgUrl } from "@/lib/sanity";
import { getProportions } from "@/lib/helpers";
import { memo, useState, useMemo } from "react";

import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const Image = ({ media, className, ratio: ratioCustom, children }) => {
  const [loaded, setLoaded] = useState(false);

  const { alt, image, blur } = media || {},
    asset = image?.asset;

  const memoizedAsset = useMemo(() => {
    if (!asset) return null;
    const [assetType, id, dimensions, fileType] = asset?._ref.split("-"),
      [width, height] = dimensions.split("x"),
      ratioNative = width / height,
      orientationNative = ratioNative < 1 ? "portrait" : "landscape",
      { ratio, orientation } = getProportions(
        ratioNative,
        orientationNative,
        ratioCustom
      );

    const sizes = [
        200, 420, 840, 1060, 1280, 1500, 1720, 1940, 2160, 2380, 2600, 2820,
        3040,
      ],
      srcLQ = getImgUrl(asset).width(300).blur(100).auto("format").url(),
      srcset = sizes
        .map(
          (size) =>
            size <= width &&
            `${getImgUrl(asset).width(size).auto("format").url()} ${size}w`
        )
        .filter((n) => n)
        .join(", ");

    return {
      ratio,
      orientation,
      id,
      height,
      width,
      srcset,
      alt,
      srcLQ,
      fileType,
    };
  }, [asset, alt, ratioCustom]);

  const { ratio, orientation, id, height, width, srcset, srcLQ, fileType } =
    memoizedAsset || {};

  return !memoizedAsset ? null : (
    <>
      <div
        className={["Image", "Media", className].join(" ")}
        data-orientation={orientation}
        data-ratio={ratio}
        style={{
          "--ratio": ratio,
        }}
      >
        <img
          key={id}
          src={
            fileType === "svg"
              ? getImgUrl(asset).url()
              : "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          }
          width={width}
          height={height}
          data-srcset={srcset}
          alt={alt || ""}
          decoding="async"
          data-sizes="auto"
          className="lazyload"
          draggable="false"
        />

        <img
          key={id + "LQ"}
          src={srcLQ}
          width={width}
          height={height}
          draggable="false"
          alt=""
        />

        <div></div>
        {children}
      </div>

      <style jsx>{`
        .Image {
          position: relative;
          overflow: hidden;
        }

        .Image > img {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          user-select: none;
          will-change: filter;
        }

        .Image > div {
          width: 100%;
          height: 0;
          padding-bottom: calc(100% / var(--ratio));
        }

        .Image > img.lazyload:not(.lazyloaded) ~ div::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;

          transition: opacity 0.5s 0.25s;
          opacity: 1;
          pointer-events: none;
        }

        .Image > img.lazyload + img {
          transition: opacity 0.25s;
          opacity: 1;
          z-index: 2;
        }

        .Image > img + img {
          opacity: 0;
          pointer-events: none;
        }

        .Image > img.lazyloading + img {
          opacity: 1;
        }

        .Image > img.lazyloaded ~ div::before {
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default memo(Image);
