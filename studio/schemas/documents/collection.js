import { renderEmoji, getLocale } from "../../utils";

const title = "Collection",
  type = "document",
  icon = renderEmoji("📁"),
  name = type + title,
  previewPath = "/case/[slug]";

export default {
  fields: [
    {
      title: "Localization",
      name: "i18n",
      type: "i18nReference",
      to: [{ type: name }],
    },
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Text",
      name: "text",
      type: "contentFull",
    },
  ],
  preview: {
    select: {
      title: "title",
      localeCode: "i18n.locale",
    },
    prepare({ title, localeCode }) {
      return {
        title: [getLocale(localeCode)?.emoji, title].join(" "),
        media: renderEmoji("📄"),
      };
    },
  },
  type,
  name,
  icon,
  title: title + "s",
  previewPath,
};
