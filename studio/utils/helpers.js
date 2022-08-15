import React from "react";
import config from "../sanity.json";

// Render Emoji
export const renderEmoji = (emoji) => () => (
  <span role="img" style={{ fontSize: "1.5rem" }}>
    {emoji}
  </span>
);

const { locales } = config.project;

// Get Locale
export const getLocale = (code) =>
  locales.length > 1 && locales.find((locale) => locale.code === code);

// Render Media
export const renderMedia = (media) => {
  const { mediaType, image, video } = media || {};
  if (!image && !video) return undefined;

  return mediaType === "image" ? (
    image
  ) : (
    <img
      style={{ objectFit: "cover" }}
      src={`https://image.mux.com/${video?.mediaVideoPlaybackId}/animated.gif?end=2.5&width=400&time=0`}
    />
  );
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024,
    dm = decimals < 0 ? 0 : decimals,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// Render GIF
export const renderGIF = (playbackId) =>
  playbackId && (
    <img
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      src={`https://image.mux.com/${playbackId}/animated.gif?end=2.5&width=400&time=0`}
    />
  );

//  search and replace are arrays (btw string is an array of characters)
//  replaceParallel('ab', 'ba', 'abc') -> bac
//  replaceParallel(['123', '2', '3', 'a'], ['2', '123', 'a', '3'], '1232322ac3') -> 2123a1231233ca
//  Note: order matters if one search string begins with another

export const replaceParallel = (search, replace, str) => {
  var t,
    ret = "",
    replaced = false,
    cursor = 0;

  while (cursor < str.length) {
    replaced = false;

    for (t = 0; t < search.length; t++) {
      if (str.substr(cursor, search[t].length) === search[t]) {
        replaced = true;
        ret += replace[t];
        cursor += search[t].length;
        break;
      }
    }

    if (!replaced) ret += str[cursor++];
  }

  return ret;
};
