import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaLoadingIndicator,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaCaptionsButton,
  MediaAirplayButton,
  MediaPipButton,
  MediaFullscreenButton,
  MediaPosterImage,
  MediaTextDisplay,
} from "media-chrome/dist/react";

const Interface = ({ children }) => {
  return (
    <>
      <MediaControlBar>
        {children && <MediaTextDisplay>{children}</MediaTextDisplay>}
        <MediaPlayButton>
          {/* <svg slot="play">Play</svg>
			<svg slot="pause">Pause</svg> */}
        </MediaPlayButton>
        <MediaTimeRange></MediaTimeRange>
        {/* <MediaSeekBackwardButton></MediaSeekBackwardButton>
			  <MediaSeekForwardButton></MediaSeekForwardButton> */}
        <MediaMuteButton></MediaMuteButton>
        {/* <MediaVolumeRange></MediaVolumeRange> */}
        <MediaFullscreenButton>
          <svg aria-hidden="true" slot="enter" viewBox="0 0 28 28">
            <g transform="translate(2, 6)">
              <polygon points="8 0 6 0 5.04614258 0 0 0 0 5 2 5 2 2 8 2"></polygon>
              <polygon
                transform="translate(4, 13.5) scale(1, -1) translate(-4, -13.5) "
                points="8 11 6 11 5.04614258 11 0 11 0 16 2 16 2 13 8 13"
              ></polygon>
              <polygon
                transform="translate(20, 2.5) scale(-1, 1) translate(-20, -2.5) "
                points="24 0 22 0 21.0461426 0 16 0 16 5 18 5 18 2 24 2"
              ></polygon>
              <polygon
                transform="translate(20, 13.5) scale(-1, -1) translate(-20, -13.5) "
                points="24 11 22 11 21.0461426 11 16 11 16 16 18 16 18 13 24 13"
              ></polygon>
            </g>
          </svg>
          <svg aria-hidden="true" slot="exit" viewBox="0 0 28 28">
            <g transform="translate(3, 6)">
              <polygon
                transform="translate(19.000000, 3.000000) scale(-1, 1) translate(-19.000000, -3.000000) "
                points="22 0 20 0 20 4 16 4 16 6 22 6"
              ></polygon>
              <polygon
                transform="translate(19.000000, 13.000000) scale(-1, -1) translate(-19.000000, -13.000000) "
                points="22 10 20 10 20 14 16 14 16 16 22 16"
              ></polygon>
              <polygon points="6 0 4 0 4 4 0 4 0 6 6 6"></polygon>
              <polygon
                transform="translate(3.000000, 13.000000) scale(1, -1) translate(-3.000000, -13.000000) "
                points="6 10 4 10 4 14 0 14 0 16 6 16"
              ></polygon>
            </g>
          </svg>
        </MediaFullscreenButton>
      </MediaControlBar>

      <style jsx global>{`
        :host {
          display: inline-block;
        }

        media-controller {
          width: 100%;
          height: 100%;
          border-radius: 0.33rem;
          background-color: transparent;

          --media-range-thumb-background: rgba(255, 255, 255, 1);
          --media-range-track-height: 0.25rem;
          --media-range-track-border-radius: 9999px;

          --media-range-track-transition: height 0.2s ease;
          --media-range-track-background: rgba(255, 255, 255, 0.1);
          --media-range-bar-color: rgba(255, 255, 255, 1);
          --media-control-hover-background: none;
          --media-control-background: none;

          --media-button-icon-width: var(--fSM);
          --media-button-icon-height: var(--fSM);
          --media-button-icon-transform: scale(1);
          --media-button-icon-transition: transform 0.2s ease;
          --media-poster-border-radius: 1rem;
        }

        media-time-range {
          height: auto;
          --media-range-thumb-height: 0;
          --media-range-thumb-width: 0;
          --media-range-thumb-border-radius: 9999px;
          --media-time-buffered-color: rgba(255, 255, 255, 0.5);
        }

        media-time-range:hover {
          --media-range-track-height: 1rem;
        }

        media-control-bar {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          position: relative;
          z-index: 99;
          color: white;
          z-index: 10;
        }

        media-control-bar::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            hsla(0, 0%, 0%, 0) 0%,
            hsla(0, 0%, 0%, 0.006) 8.1%,
            hsla(0, 0%, 0%, 0.024) 15.5%,
            hsla(0, 0%, 0%, 0.052) 22.5%,
            hsla(0, 0%, 0%, 0.088) 29%,
            hsla(0, 0%, 0%, 0.13) 35.3%,
            hsla(0, 0%, 0%, 0.176) 41.2%,
            hsla(0, 0%, 0%, 0.225) 47.1%,
            hsla(0, 0%, 0%, 0.275) 52.9%,
            hsla(0, 0%, 0%, 0.324) 58.8%,
            hsla(0, 0%, 0%, 0.37) 64.7%,
            hsla(0, 0%, 0%, 0.412) 71%,
            hsla(0, 0%, 0%, 0.448) 77.5%,
            hsla(0, 0%, 0%, 0.476) 84.5%,
            hsla(0, 0%, 0%, 0.494) 91.9%,
            hsla(0, 0%, 0%, 0.5) 100%
          );
          opacity: 0.5;
          z-index: -1;
          pointer-events: none;
        }

        media-airplay-button[media-airplay-unavailable] {
          display: none;
        }

        media-volume-range[media-volume-unavailable] {
          display: none;
        }

        media-mute-button[media-volume-level="off"] {
          display: none;
        }

        media-pip-button[media-pip-unavailable] {
          display: none;
        }

        media-play-button,
        media-seek-backward-button,
        media-seek-forward-button,
        media-mute-button,
        media-fullscreen-button {
        }

        @media (min-width: 768px) {
        }
      `}</style>
    </>
  );
};

export default Interface;
