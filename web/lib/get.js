import { groq } from "next-sanity";
import { usePreviewSubscription } from "@/lib/sanity";
import { getClient } from "@/lib/sanity.server";

// Helper function to return the correct version of the document
// If we're in "preview mode" and have multiple documents, return the draft
// export const filterDataToSingleItem = (data, preview) => {
//   if (!data) return null;
//   if (!Array.isArray(data)) return data;
//   if (data?.length === 1 && data?.[0]) return data?.[0];
//   if (preview)
//     return data?.find((item) => item._id.startsWith(`drafts.`)) || data?.[0];

//   return data?.[0] || null;
// };

export const filterDataToSingleItem = (data, preview) => {
  if (!data) return null;
  if (!Array.isArray(data)) return [data];

  if (preview) {
    const draftIds = data.map(({ _id }) => _id.startsWith(`drafts.`) && _id);
    const dataPreview = data.filter(
      ({ _id }) => !draftIds.includes(`drafts.${_id}`)
    );
    return dataPreview;
  } else {
    return data;
  }
};

export const getProps = async (queries, queryParams = {}, preview = false) => {
  if (!queries) return null;

  const res = await Promise.all(
    Object.values(queries)?.map((query) =>
      getClient(preview).fetch(query, queryParams)
    )
  );

  let isEmpty = (a) => Array.isArray(a) && a.every(isEmpty);

  return (
    !isEmpty(res) &&
    res?.map((el, i) => {
      return el && filterDataToSingleItem(el);
    })
  );
};

export const getSubscriptionProps = (data, queries, queryParams, preview) => {
  if (!queries) return null;

  const res = Object.values(queries)?.map((query, i) => {
    const { data: previewData, error } = usePreviewSubscription(query, {
      params: queryParams ?? {},
      initialData: data?.[i],
      enabled: preview,
    });

    error && console.error(error);

    return previewData;
  });

  return res
    ?.map((el) => el && filterDataToSingleItem(el))
    .reduce((a, v, i) => ({ ...a, [Object.keys(queries)[i]]: v }), {});
};

export const promiseAllFromObject = async (promisesObject) =>
  Object.keys(promisesObject).reduce(async (acc, key) => {
    const lastResult = await acc;
    return Object.assign(lastResult, { [key]: await promisesObject[key] });
  }, Promise.resolve({}));

export const getAppProps = async (
  queries,
  queryParams = {},
  preview = false
) => {
  if (!queries) return null;

  const res = await Object.assign(
    ...Object.keys(queries)?.map((k) => {
      const data = {
        [k]: getClient(preview)
          .fetch(queries[k], queryParams)
          .then((r) => filterDataToSingleItem(r)),
      };

      return data;
    })
  );

  return promiseAllFromObject(res);
};

export const getPaths = async (_type, key, dir) => {
  const docs = await getClient(false).fetch(
    groq`*[_type=="${_type}" && defined(${key})]{slug, i18n}`
  );

  const paths = docs?.map(({ slug, i18n }) => ({
    params: { slug: slug?.current },
    locale: i18n?.locale,
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
