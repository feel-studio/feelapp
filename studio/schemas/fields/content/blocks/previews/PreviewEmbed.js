import React from "react";
import getVideoId from "get-video-id";

export const PreviewEmbed = ({ value }) => {
  const url = value.url;
  const responsiveVideoContainer = {};

  const responsiveVideoPlayer = {
    width: "178px",
    height: "100px",
    margin: "0.5rem",
    display: "block",
  };

  if (url) {
    const id = getVideoId(url).id;
    const service = getVideoId(url).service;

    const vimeoEmbedUrl = "https://player.vimeo.com/video/" + id;
    const youtubeEmbedUrl = "https://www.youtube.com/embed/" + id;

    if (!id) {
      return <div>Missing YouTube or Vimeo URL</div>;
    }

    if (service === "vimeo") {
      return (
        <div style={responsiveVideoContainer}>
          <iframe
            src={vimeoEmbedUrl}
            style={responsiveVideoPlayer}
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></iframe>
        </div>
      );
    }

    if (service === "youtube") {
      return (
        <div style={responsiveVideoContainer}>
          <iframe
            src={youtubeEmbedUrl}
            style={responsiveVideoPlayer}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
  }

  return <div></div>;
};
