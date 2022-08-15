import { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";

import useFetch from "@/hooks/useFetch";

const Embed = ({ url, placeholder = true }) => {
  const noembedUrl = `https://noembed.com/embed?url=${url}&nowrap=on`;

  const [ratio, setRatio] = useState(1.7778),
    [playing, setPlay] = useState(false);

  const [data, loading] = useFetch(noembedUrl);

  useEffect(() => {
    if (data) {
      const { width, height, thumbnail_url } = data;
      setRatio(data?.error ? 16 / 9 : width / height);
    }
  }, [data]);

  return (
    <>
      <div
        className="wrapper"
        data-loaded={!loading}
        onClick={() => setPlay(true)}
        style={{ "--ratio": ratio }}
      >
        {data?.error ? (
          <span className="error">
            Error:
            <br />
            {data?.error}
          </span>
        ) : (
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  showinfo: 1,
                  controls: 1,
                  modestbranding: 1,
                  playsinline: 1,
                  rel: 0,
                  color: "white",
                  autoplay: false,
                },
              },
              vimeo: {
                playerOptions: {
                  autoplay: false,
                  byline: false,
                  color: "#ffffff",
                  playsinline: true,
                  portrait: false,
                },
              },
            }}
          />
        )}
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: calc(100% / var(--ratio));
          overflow: hidden;
          background: black;
        }

        .error {
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;
          background: #ddd;
          color: red;
        }

        .wrapper :global(> *) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Embed;
