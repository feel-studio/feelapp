import IconMediaSingle from "./icons/iconMediaSingle";
import { PreviewSingle } from "./previews";

const type = "Media",
  title = "Single";

export default {
  type: "object",
  title: "Media",
  name: `block${type + title}`,
  icon: IconMediaSingle,
  fields: [
    {
      title: "Media",
      name: "media",
      type: "media",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      media: "media",
    },
    component: PreviewSingle,
  },
};
