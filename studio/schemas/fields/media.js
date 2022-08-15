import { renderGIF } from "../../utils";

export default {
  name: "media",
  title: "Media",
  type: "object",
  fields: [
    {
      title: "Select media type",
      description:
        "Choose between Image (supports JPG, SVG, PNG, GIF) or Video (hosted/served via Mux. MP4 recommended)",
      name: "mediaType",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["lqip", "palette"],
      },
      hidden: ({ parent }) => parent?.mediaType !== "image",
    },
    {
      name: "video",
      type: "mux.video",
      title: "Video",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    },
    {
      title: "Show Attributes",
      name: "showAttributes",
      type: "boolean",
      hidden: ({ parent }) => !parent,
    },
    {
      title: "Video Controls enabled?",
      description:
        "Video will autoplay as a muted loop (≈ GIF) when controls are disabled",
      name: "controls",
      type: "boolean",
      hidden: ({ parent }) =>
        parent?.mediaType !== "video" || !parent?.showAttributes,
    },
    {
      name: "alt",
      type: "string",
      title: "Alt Text",
      description: "Beneficial for SEO and visually impaired users",
      hidden: ({ parent }) =>
        parent?.mediaType !== "image" || !parent?.showAttributes,
    },
    {
      name: "blur",
      type: "image",
      title: "Blur",
      description: "Decorative effect (optional)",
      hidden: ({ parent }) => !parent?.showAttributes,
    },
    {
      name: "caption",
      type: "contentText",
      title: "Caption",
      hidden: ({ parent }) => !parent?.showAttributes,
    },
  ],
  preview: {
    select: {
      playbackId: "video.asset.playbackId",
      image: "image",
      mediaType: "mediaType",
    },
    prepare({ playbackId, image, mediaType }) {
      return {
        media: mediaType
          ? mediaType !== "image"
            ? renderGIF(playbackId)
            : image
          : undefined,
      };
    },
  },
};
