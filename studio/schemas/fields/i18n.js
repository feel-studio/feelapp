import config from "../../sanity.json";
import { collections } from "../documents";
const { locales } = config.project;

const outputReference = (i) =>
  locales.map(({ code, title, emoji, ...rest }) => ({
    title: `Translation (${emoji} ${title})`,
    name: `translation_${code}`,
    type: "reference",
    to: collections.map(({ name }) => ({ type: name })),
    hidden: ({ document }) =>
      !document?.i18n?.locale || document?.i18n?.locale === code,
    options: {
      filter: ({ document }) =>
        !document?.i18n?.locale
          ? false
          : {
              filter: "i18n.locale == $locale && _id != $id && _type == $type",
              params: {
                locale: code,
                id: document?._id,
                type: document?._type,
              },
            },
    },
  }));

const [i18n, i18nReference] = ["singleton", "collection"].map((type) => ({
  title: "Localization",
  name: `i18n${type === "collection" ? "Reference" : ""}`,
  type: "object",
  hidden: !locales || locales?.length < 2,
  fields: [
    {
      title: "Locale",
      name: "locale",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: locales?.[0].code,
      readOnly: type === "singleton",
      options: {
        list: locales.map(({ code: value, ...rest }) => ({
          value,
          ...rest,
        })),
      },
    },
    ...(type === "collection" ? outputReference() : []),
  ],
}));

export default [i18n, i18nReference];
