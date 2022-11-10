import { getProps, getSubscriptionProps } from "@/lib/get";

import { queriesLegal as queries } from "@/queries/.";

import { Route } from "@/components/_app";
import { Legal } from "@/components/routes/legal";

export default function RouteLegal({ data, queryParams, preview }) {
  const props = getSubscriptionProps(data, queries, queryParams, preview);

  return (
    <Route className="RouteLegal" title="Legal" seo={props?.legal?.[0]?.seo}>
      <Legal {...props} />
    </Route>
  );
}

export const getServerSideProps = async ({
  params,
  preview = false,
  locale,
}) => {
  const queryParams = { locale, slug: params?.slug || "" };

  return {
    props: {
      data: await getProps(queries, queryParams, preview),
      queryParams: { locale, slug: params?.slug || "" },
      preview,
    },
  };
};
