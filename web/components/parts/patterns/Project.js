import { useEffect, useMemo, useRef, useState } from "react";

import { Gallery, Slide } from "@/components/parts/patterns";
import { useInView, motion } from "framer-motion";
import useStore from "@/hooks/useStore";
import useHasMounted from "@/hooks/useHasMounted";
import useWindowSize from "@/hooks/useWindowSize";

const Project = ({ project }) => {
  const { slides, title, slug } = project || {};

  const { windowW } = useWindowSize();

  const slidesPrepared = useMemo(
    () =>
      slides
        .map((slide) =>
          windowW > 767 || slide?.content?.length < 2
            ? [slide]
            : slide?.content.map((el, i) => ({
                ...slide,
                _key: slide?._key + "-" + i,
                content: [el],
              }))
        )
        .flat(),
    [slides, windowW]
  );

  console.log({ slidesPrepared, slides });

  const [status, setStatus] = useState({
      slug: slug.current,
      indexActive: 0,
      keyActive: null,
      length: slidesPrepared?.length || 0,
    }),
    [goToIndex, setGoTo] = useState(null);

  const { index, slugActive } = useStore();

  const updateIndex = useStore((state) => state.updateIndex),
    setSlug = useStore((state) => state.setSlug);

  const hasMounted = useHasMounted();

  useEffect(() => {
    console.log({ hasMounted, index, slugActive, status, project });
    updateIndex(status);
  }, [hasMounted, status]);

  const ref = useRef();

  const isInView = useInView(ref, { once: false, amount: 0.66 });

  useEffect(() => {
    isInView && setSlug(slug.current);
  }, [isInView]);

  return (
    <>
      <motion.article className="Project" ref={ref} id={slug?.current}>
        <div className="details">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h3>
          <br />

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{
              duration: isInView ? 0.5 : 0.15,
              //   delay: isInView ? 0.25 : 0,
            }}
          >
            <span>{status?.indexActive + 1}</span> /{" "}
            <span>{slidesPrepared?.length}</span>
          </motion.span>
        </div>
        {slidesPrepared && (
          <Gallery setStatus={setStatus} status={status} goToIndex={goToIndex}>
            {slidesPrepared?.map((slide, i) => (
              <Slide key={slide?._key} slide={slide} />
            ))}
          </Gallery>
        )}
      </motion.article>

      <style jsx global>{`
        .Project {
          width: 100vw;
          height: 100vh;
          position: relative;
          scroll-snap-align: center;
        }

        .Project .details {
          position: fixed;
          width: 100%;
          left: 0;
          bottom: calc(var(--hHeader) - var(--padS));
          z-index: 777;
          padding: var(--padS);
          color: hsla(0 0% 100% / var(--active));
          transition: color 0.66s;
          mix-blend-mode: difference;
          pointer-events: none;
        }

        .Project .details > * {
          pointer-events: all;
        }

        .Project .details span span {
          min-width: 5ch;
        }

        .Project .details span span:first-child {
          text-align: right;
          margin-right: 0.5ch;
        }

        .Project .details span span:last-child {
          margin-left: 0.5ch;
        }

        @media (max-width: 767px) {
          .Project .details {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }

        @media (min-width: 768px) {
          .Project .details {
            bottom: unset;
            top: calc(var(--hHeader));
            padding: 0 var(--padL) var(--padS) var(--padL);
          }

          .Project .details br {
            display: none;
          }

          .Project .details > *:first-child {
            margin-bottom: calc(var(--lH) / 2);
          }
        }
      `}</style>
    </>
  );
};

export default Project;
