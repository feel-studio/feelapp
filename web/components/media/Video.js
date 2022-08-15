import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import Hls from "hls.js";

import { MediaController, MediaPosterImage } from "media-chrome/dist/react";
import { motion } from "framer-motion";
import Interface from "./Interface";

const Video = ({
  media,
  className,
  children,
  ratio: ratioCustom,
  controls: controlsForce = false,
}) => {
  const controls = controlsForce || media?.controls,
    { asset } = media?.video || {};

  const refPlayer = useRef();

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  useEffect(() => {
    if (!asset || !refPlayer?.current || !inView) return;

    const { playbackId, data } = asset,
      src = `https://stream.mux.com/${playbackId}`,
      player = refPlayer.current;

    let hls;

    if (player.canPlayType("application/vnd.apple.mpegurl")) {
      player.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.attachMedia(player);
      hls.loadSource(src);
    } else {
      console.error(
        "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
      );
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [asset, refPlayer, inView, controls]);

  if (!asset) return false;

  const { data, playbackId, thumbTime = 0 } = asset;

  const [width, height] = data.aspect_ratio.split(":"),
    ratio = ratioCustom || parseInt(width) / parseInt(height);

  return (
    <>
      <motion.div
        ref={ref}
        className={["Video", "Media", className].join(" ")}
        data-orientation={ratio < 1 ? "portrait" : "landscape"}
        data-ratio={ratio}
        style={{ "--ratio": ratio }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MediaController autohide="2">
          <video
            slot="media"
            preload="auto"
            muted
            crossOrigin=""
            ref={refPlayer}
            playsInline
            loop
            autoPlay
          ></video>

          <MediaPosterImage
            slot="poster"
            src={`https://image.mux.com/${playbackId}/thumbnail.jpg?time=${thumbTime}`}
            placeholder-src="data:image/jpeg;base64,/9j/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAASACADASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAMEAgUGCP/EACkQAAEDAgMIAgMAAAAAAAAAAAEAAgMEBgUREgcUITFSkZTRQaEiscH/xAAYAQACAwAAAAAAAAAAAAAAAAAABQIDBv/EAB0RAAICAQUAAAAAAAAAAAAAAAABAgMFERUxwfD/2gAMAwEAAhEDEQA/AOZh2P2k/LOhq/Lf7VuPYvZxLQ6iqgXchvrxn9rpY7ojYCBU0IJ5HU3h9rU3NcGJVcVNJh2K4fDPTztlbm5reGRDhnxIzBPwkUc9RJ6dDHaLYojj2HWYeeH1nmSe1OzYXZJ54fW+ZJ7VeWrbO4SPuedpI/IOnB/TgsxJh4yIuGYu+TvAH9UXnafItWJmuTy1oZ0t7JoZ0t7Ii0InGhnS3smhnS3siIA//9k="
          />

          <Interface />
        </MediaController>
        {children}
      </motion.div>

      <style jsx global>{`
        .Video {
          position: relative;
        }

        .Video video {
          pointer-events: none !important;
        }

        media-poster-image {
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default Video;
