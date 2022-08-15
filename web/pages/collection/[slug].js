import { getProps, getSubscriptionProps, getPaths } from "@/lib/get";
import { getTranslations } from "@/lib/helpers";

import { queriesCollection as queries } from "@/queries/.";

import { Route } from "@/components/_app";
// import { Collection } from "@/components/routes/collection";

export default function RouteCollection({ data, queryParams, preview }) {
  const props = getSubscriptionProps(data, queries, queryParams, preview);

  return (
    <Route
      className="RouteCollection"
      title={props?.collection?.[0]?.title}
      seo={props?.collection?.[0]?.seo}
      i18n={getTranslations(props?.collection?.[0])}
    >
      {props?.collection?.[0]?.title}
      {/* <Collection {...props} /> */}
    </Route>
  );
}

export const getStaticProps = async ({ params, preview = false, locale }) => {
  const queryParams = { locale, slug: params?.slug || "" };
  const data = await getProps(queries, queryParams, preview);

  return !data?.[0]?.length > 0
    ? { notFound: true }
    : {
        props: {
          data,
          queryParams: { locale, slug: params?.slug || "" },
          preview,
        },
        revalidate: 10,
      };
};

export const getStaticPaths = async () =>
  getPaths("documentCollection", "slug.current", "collection");
