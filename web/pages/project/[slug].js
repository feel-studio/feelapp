import { getProps, getSubscriptionProps, getPaths } from "@/lib/get";
import { queriesProject as queries } from "@/queries/.";

import { Route } from "@/components/_app";
import { Project } from "@/components/routes/project";

export default function RouteProject({ data, queryParams, preview }) {
  const props = getSubscriptionProps(data, queries, queryParams, preview);

  return (
    <Route
      className="RouteProject"
      title={props?.project?.[0]?.title}
      seo={props?.project?.[0]?.seo}
      info={props?.info?.[0]}
    >
      <Project {...props} />
    </Route>
  );
}

export const getServerSideProps = async ({ params, preview = false }) => {
  const queryParams = { slug: params?.slug || "" };
  const data = await getProps(queries, queryParams, preview);

  return !data?.[0]?.length > 0
    ? { notFound: true }
    : {
        props: {
          data,
          queryParams: { slug: params?.slug || "" },
          preview,
        },
      };
};

// export const getStaticPaths = async () =>
//   getPaths(
//     "documentProject",
//     "slug.current",
//     "&& status != 'archive'",
//     "project"
//   );
