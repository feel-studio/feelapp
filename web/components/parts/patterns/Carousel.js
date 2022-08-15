import { useRef } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/flicking/dist/flicking.css";

const Carousel = ({ children }) => {
  const ref = useRef();

  return (
    <>
      <Flicking
        className="Carousel"
        ref={ref}
        hideBeforeInit={true}
        viewportTag="div"
        cameraTag="div"
        align="prev"
        bound={true}
        onReady={({ currentTarget }) =>
          currentTarget.addPlugins(new Pagination({ type: "bullet" }))
        }
        onClick={(e) => {
          const flk = ref.current;
          flk.index < flk.panelCount - 1
            ? flk.next().catch(() => void 0)
            : flk.moveTo(0).catch(() => void 0);
        }}
      >
        {children}
        <ViewportSlot>
          <div className="flicking-pagination"></div>
        </ViewportSlot>
      </Flicking>

      <style jsx global>{`
        .Carousel {
          cursor: grab;
        }

        .Carousel:active {
          cursor: grabbing;
        }

        .Carousel .flicking-viewport {
          z-index: 0;
        }

        .Carousel .flicking-pagination {
          bottom: 0;
          display: flex;
          justify-content: center;
          padding: 0.5rem;
          mix-blend-mode: difference;
        }

        .Carousel .flicking-pagination-bullet {
          display: block;
          background: rgba(255, 255, 255, 0.2);
        }

        .Carousel .flicking-pagination-bullet-active {
          background: white;
        }
      `}</style>
    </>
  );
};

export default Carousel;
