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
      title: "Thumbnail(s)",
      name: "thumbnails",
      type: "mediaCollection",
    },
    {
      title: "Content",
      name: "content",
      type: "mediaCollection",
      options: {},
    },
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      media: "thumbnails.0",
      mediaVideoPlaybackId: "thumbnails.0.video.asset.playbackId",
    },
    prepare({ status, title, media, mediaVideoPlaybackId }) {
      const icon =
        status === "visible" ? "" : status === "linkOnly" ? "🔗" : "🪦";

      return {
        title: [icon, title].join(" "),
        media:
          media &&
          renderMedia({
            ...media,
            video: { mediaVideoPlaybackId },
          }),
      };
    },
  },
  type,
  name,
  icon,
  title: title + "s",
  previewPath,
};
