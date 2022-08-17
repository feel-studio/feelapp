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

  const [section, setSection] = useState("top"),
    [canScroll, setCanScroll] = useState(false);

  const { pathname } = useRouter();

  const { windowW, windowH } = useWindowSize();

  useEffect(() => {
    setCanScroll(
      pathname !== "/" || document.body.clientHeight > window.innerHeight
    );
  }, [canScroll, windowW, windowH, pathname]);

  return (
    <>
      <Header info={info} section={section} canScroll={canScroll} />

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
        key={className}
      >
        <motion.div
          className="sentinel"
          onViewportEnter={() => setSection("top")}
          onViewportLeave={() => setSection("center")}
        ></motion.div>
        {children}
        <motion.div
          className="sentinel"
          onViewportEnter={() => setSection("bottom")}
          onViewportLeave={() => setSection("center")}
        ></motion.div>
      </motion.div>

      <Footer info={info} section={section} />

      <style jsx global>{`
        .Route {
          flex-grow: 1;
        }

        .Route .sentinel {
          width: 100%;
          height: 1rem;
          pointer-events: none;
        }

        .sentinel:first-child {
          margin-bottom: -1rem;
        }

        .sentinel:last-child {
          margin-top: -1rem;
        }
      `}</style>
    </>
  );
}
