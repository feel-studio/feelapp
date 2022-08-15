import IconMediaEmbed from "./icons/iconMediaEmbed"
import { PreviewEmbed } from "./previews"

export default {
  type: "object",
  title: "Embed",
  icon: IconMediaEmbed,
  name: `blockMediaEmbed`,
  fields: [
    {
      name: "url",
      type: "url",
      title: "URL",
    },
    {
      title: "Caption",
      name: "caption",
      type: "contentText",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: PreviewEmbed,
  },
  validation: (Rule) => Rule.required(),
}
