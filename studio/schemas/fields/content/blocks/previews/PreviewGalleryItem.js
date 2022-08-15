import React, { useEffect, useState } from "react";
import client from "part:@sanity/base/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function getImgUrl(source) {
  return builder.image(source);
}

export const PreviewGalleryItem = ({ type, item }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    if (type === "video") {
      async function fetchPlaybackId() {
        let res = await client.fetch(
          `*[_id=="${item.media[0].mux.asset._ref}"].playbackId`
        );
        if (!isCancelled) {
          setUrl(
            `https://image.mux.com/${res[0]}/animated.gif?end=2.5&width=400&time=0`
          );
        }
      }

      fetchPlaybackId();
    } else {
      setUrl(getImgUrl(item.media[0].asset).width(200).url());
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  if (!url) return null;

  return (
    <img
      style={{
        height: "100px",
        objectFit: "contain",
        margin: "0 0 0.5rem 0.5rem",
      }}
      src={url}
    />
  );
};
