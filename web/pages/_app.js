import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";

import { getImgUrl } from "@/lib/sanity";
import { queriesApp as queries } from "@/queries/.";
import { getAppProps } from "@/lib/get";

import config from "@config";
import "../styles/index.css";

import Preview from "@/components/_app/Preview";

export function App({ Component, pageProps, settings, banners, jobs }) {
  const { locale } = useRouter();

  const settingsProps = settings?.[0] || {},
    { preview = false } = pageProps || {};

  const {
    index = false,
    follow = false,
    description = "",
    preview: ogPreview,
  } = settingsProps?.defaultSeo || {};

  const { title = "", url = "" } = config;

  return (
    <>
      <DefaultSeo
        titleTemplate={`${title} | %s`}
        defaultTitle={title}
        noindex={!index}
        nofollow={!follow}
        description={description}
        openGraph={{
          type: "website",
          url,
          title,
          description,
          site_name: title,
          images: !ogPreview
            ? undefined
            : [
                {
                  url: getImgUrl(ogPreview),
                  width: 1200,
                  height: 630,
                },
              ],
        }}
      />
      {preview && <Preview />}

      <AnimatePresence
        mode="wait"
        onExitComplete={() =>
          typeof window !== "undefined" && window.scrollTo({ top: 0 })
        }
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
}

App.getInitialProps = async ({ router }) => {
  const { locale } = router;

  const { settings, banners, jobs } = await getAppProps(
    queries,
    {
      locale: locale || "",
    },
    false
  );

  return { settings, banners, jobs };
};

export default App;
