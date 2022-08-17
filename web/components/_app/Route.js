import { NextSeo } from "next-seo";
import { motion, useScroll } from "framer-motion";
import { useIdleTimer } from "react-idle-timer";

import { getImgUrl } from "@/lib/sanity";

import config from "@config";

import { Footer, Header } from ".";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useRouter } from "next/router";

export default function Route({ seo, title, className, children, info }) {
  const { index = true, follow = true, description, preview } = seo || {};

  const [isIdle, setIdle] = useState(true),
    [section, setSection] = useState("top"),
    [canScroll, setCanScroll] = useState(false);

  const { windowW, windowH } = useWindowSize();

  const { pathname } = useRouter();

  const ref = useRef();

  const { scrollYProgress } = useScroll({
    container: pathname === "/" ? undefined : ref,
  });

  useEffect(() => {
    setCanScroll(document.body.clientHeight > window.innerHeight);
  }, [canScroll, windowW, windowH]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setSection(latest > 0.1 ? (latest < 0.9 ? "center" : "bottom") : "top");
    });
  }, [pathname]);

  const onIdle = () => {
    setIdle(true);
    // Close Modal Prompt
    // Do some idle action like log out your user
  };

  const onActive = (event) => {
    setIdle(false);
    // Close Modal Prompt
    // Do some active action
  };

  const idleTimer = useIdleTimer({
    onIdle,
    onActive,
    timeout: 1000,
    events: [
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
    ],
  });

  return (
    <>
      <Header
        info={info}
        isIdle={isIdle}
        section={section}
        canScroll={canScroll}
      />

      <NextSeo
        title={title}
        description={description}
        noindex={!index}
        nofollow={!follow}
        openGraph={{
          type: "website",
          title,
          description,
          site_name: config?.title,
          images: !preview
            ? undefined
            : [
                {
                  url: getImgUrl(preview),
                  width: 1200,
                  height: 630,
                },
              ],
        }}
      />
      <motion.div
        className={["Route", className].join(" ")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: "white" }}
        ref={ref}
      >
        {children}
      </motion.div>

      <Footer info={info} isIdle={isIdle} section={section} />

      <style jsx global>{`
        .Route {
          flex-grow: 1;
        }
      `}</style>
    </>
  );
}
