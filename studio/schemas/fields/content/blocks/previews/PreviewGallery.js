import React from "react";
import { PreviewGalleryItem } from "./";

export function PreviewGallery({ value }) {
  if (!value || !value.content) return null;

  const { content } = value;

  const galleryContainer = {
    display: "flex",
    padding: "0.5rem 0.5rem 0 0",
  };

  let arr = [];

  Object.keys(content).forEach((e) => {
    if (content[e]) {
      arr.push(content[e]);
    }
  });

  return (
    <div style={galleryContainer}>
      {arr.map((item, index) => {
        if (!item || !item.media || !item.media[0]) {
          return null;
        }

        const type = item.media[0]._type;

        return <PreviewGalleryItem type={type} key={index} item={item} />;
      })}
    </div>
  );
}
