import { getProps, getSubscriptionProps } from "@/lib/get";

import { queriesHome as queries } from "@/queries/.";

import { Route } from "@/components/_app";
import { Home } from "@/components/routes/home";

export default function RouteHome({ data, queryParams, preview }) {
  const props = getSubscriptionProps(data, queries, queryParams, preview);

  return (
    <Route
      className="RouteHome"
      seo={props?.home?.[0]?.seo}
      info={props?.info?.[0]}
    >
      <Home {...props} />
    </Route>
  );
}

export const getStaticProps = async ({ params, preview = false, locale }) => {
  const queryParams = { locale, slug: params?.slug || "" };

  return {
    props: {
      data: await getProps(queries, queryParams, preview),
      queryParams: { locale, slug: params?.slug || "" },
      preview,
    },
  };
};
