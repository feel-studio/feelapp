import { NextSeo } from "next-seo";
import { motion } from "framer-motion";

import { getImgUrl } from "@/lib/sanity";

import config from "@config";

import { Footer } from ".";

export default function Route({ seo, title, className, children, info }) {
  const { index = true, follow = true, description, preview } = seo || {};

  return (
    <>
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
      >
        {children}
        <Footer info={info} />
      </motion.div>

      <style jsx global>{`
        .Route {
        }
      `}</style>
    </>
  );
}
