import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

import { renderEmoji, renderMedia } from "../../utils";

const title = "Project",
  type = "document",
  icon = renderEmoji("📁"),
  name = type + title,
  previewPath = "/project/[slug]";

export default {
  initialValue: { status: "visible" },
  fields: [
    orderRankField({ type: "project" }),
    {
      title: "Status",
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Visible", value: "visible" },
          { title: "Link only", value: "linkOnly" },
          { title: "Archive", value: "archive" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
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
      title: "Information",
      name: "information",
      type: "contentText",
    },
    {
      title: "Content",
      name: "content",
      type: "mediaCollection",
    },
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      media0: "content.0",
      media1: "content.1",
      media2: "content.2",
      media3: "content.3",
      media4: "content.4",
      media5: "content.5",
      media6: "content.6",
      media7: "content.7",
      media8: "content.8",
      media9: "content.9",
    },
    prepare({ status, title, ...selection }) {
      const icon =
          status === "visible" ? "" : status === "linkOnly" ? "🔗" : "💾",
        mediaCollection = Object.values(selection);

      return {
        title: [icon, title].join(" "),
        media: renderMedia(
          mediaCollection.find((m) => m.status === "featured")
        ),
      };
    },
  },
  type,
  name,
  icon,
  title: title + "s",
  previewPath,
};
