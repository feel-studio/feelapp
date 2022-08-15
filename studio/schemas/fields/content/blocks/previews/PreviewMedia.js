import React, { useEffect, useState } from "react";
import client from "part:@sanity/base/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function getImgUrl(source) {
  return builder.image(source);
}

export const PreviewMedia = ({ media: mediaSrc }) => {
  if (!mediaSrc) return null;

  const { media } = mediaSrc,
    { mediaType, image, video } = media || {};

  if (!mediaType || (!image && !video)) return null;

  let url;

  if (mediaType === "image") {
    url = getImgUrl(image?.asset).width(200).url();
  } else {
    // url = `https://image.mux.com/${media}/animated.gif?end=2.5&width=400&time=0`;
  }

  return (
    <img
      style={{
        display: "block",
        height: "100px",
        marginRight: "0.5rem",
      }}
      src={url}
    />
  );
};
