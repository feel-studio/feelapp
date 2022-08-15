import { NextSeo } from "next-seo";
import { motion } from "framer-motion";

import { getImgUrl } from "@/lib/sanity";

import config from "@config";

import { Nav, Footer } from ".";

export default function Route({ seo, title, className, children, i18n }) {
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
      <Nav i18n={i18n} />
      <motion.div
        className={["Route", className].join(" ")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: "white", height: "100%" }}
      >
        {children}
      </motion.div>
      <Footer />

      <style jsx global>{`
        .Route {
          flex-grow: 1;
          height: 100%;
        }
      `}</style>
    </>
  );
}
