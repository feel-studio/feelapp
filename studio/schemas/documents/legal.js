import { renderEmoji } from "../../utils";

const title = "Legal",
  type = "document",
  icon = renderEmoji("⚖️"),
  name = type + title,
  previewPath = "/legal";

export default {
  fields: [
    { title: "Localization", name: "i18n", type: "i18n" },
    {
      title: "Disclaimer",
      name: "disclaimer",
      type: "contentFull",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Privacy Policy",
      name: "privacyPolicy",
      type: "contentFull",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title,
        media: icon,
      };
    },
  },
  type,
  name,
  icon,
  title,
  previewPath,
};
