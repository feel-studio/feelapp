import { renderEmoji } from "../../utils";

const title = "Settings",
  type = "document",
  icon = renderEmoji("⚙️"),
  name = type + title,
  previewPath = undefined;

export default {
  groups: [
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "socialMedia",
      title: "Social Media",
    },
  ],
  fields: [
    { title: "Localization", name: "i18n", type: "i18n" },
    {
      title: "Default SEO",
      name: "defaultSeo",
      type: "seo",
      group: "seo",
      description:
        "Default SEO information. Will be used as a fallback for all pages without specific SEO Settings",
    },
    {
      title: "Links",
      name: "links",
      type: "array",
      group: "socialMedia",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title,
      };
    },
  },
  type,
  name,
  icon,
  title,
  previewPath,
};
