import { renderEmoji } from "../../utils";

const title = "Info",
  type = "document",
  icon = renderEmoji("ℹ️"),
  name = type + title,
  previewPath = "/info";

export default {
  fields: [
    {
      title: "Information",
      name: "information",
      type: "contentText",
      validation: (Rule) => Rule.required(),
    },
    { title: "Links", name: "links", type: "array", of: [{ type: "link" }] },
    { title: "Logo", name: "logo", type: "image" },
    {
      title: "Content",
      name: "content",
      type: "mediaCollection",
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
