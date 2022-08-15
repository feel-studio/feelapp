import { SitemapStream, streamToPromise } from "sitemap";
import { getClient } from "@/lib/sanity.server";
import { queriesHome } from "@/queries/.";

import config from "@config";

const Sitemap = async (req, res) => {
  const { url } = config;

  const smStream = new SitemapStream({
    hostname: url,
  });

  // Add frontpage
  smStream.write({
    url: "/",
  });

  // Fetch data from a source which will be used to render the sitemap and all dynamic urls to the sitemap
  // await getClient()
  //   .fetch(`*[_type == "documentTEST" && !(_id in path("drafts.**"))]`, {})
  //   .then((res) => {
  //     res.forEach(({ slug, publishedAt }) => {
  //       smStream.write({
  //         url: `/TEST/${slug.current}`,
  //         lastmod: publishedAt,
  //       });
  //     });
  //   });

  // tell sitemap that there is nothing more to add to the sitemap
  smStream.end();

  // generate a sitemap and add the XML feed to a url which will be used later on.
  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
};

export default Sitemap;
