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
  gif = false,
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

  const { data, playbackId, thumbTime = 0 } = asset,
    { duration } = data;

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
            autoPlay={gif || (!controls && duration < 15)}
          ></video>

          <MediaPosterImage
            slot="poster"
            src={`https://image.mux.com/${playbackId}/thumbnail.jpg?time=${thumbTime}`}
            placeholder-src="https://image.mux.com/${playbackId}/thumbnail.jpg?time=${thumbTime}"
          />

          {!gif && <Interface />}
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
