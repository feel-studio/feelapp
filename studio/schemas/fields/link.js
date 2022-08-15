import { renderEmoji, formatBytes } from "../../utils";

const outputTextField = (i) =>
  i === 0
    ? [
        {
          title: "Text",
          name: "text",
          type: "string",
        },
      ]
    : [];

const [link, linkContent] = [0, 1].map((i) => ({
  name: `link${i === 1 ? "Content" : ""}`,
  title: "Link",
  type: "object",
  fields: [
    ...outputTextField(i),
    {
      title: "Select the type of link",
      description:
        'Choose "Standard" for internal or external links, email addresses or phone numbers. "Download" will link to a file.',
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Download", value: "download" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    },
    {
      title: "URL",
      name: "href",
      type: "url",
      description:
        'Please enter links within this website without any domain prefix (e.g. "/contact"). You can also use "mailto:" / "tel:" for links that should open the email client / initiate calls. (e.g. "mailto:hi@there.com")',
      hidden: ({ parent }) => parent?.type !== "standard", // hidden if link type is not standard
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["https", "http", "mailto", "tel"],
        }),
    },
    {
      title: "Open in new tab?",
      name: "blank",
      type: "boolean",
      hidden: ({ parent }) => parent?.type !== "standard", // hidden if link type is not standard
    },
    {
      name: "file",
      type: "file",
      title: "File",
      hidden: ({ parent }) => parent?.type !== "download", // hidden if link type is not internal
    },
  ],
  preview: {
    select: {
      text: "text",
      type: "type",
      blank: "blank",
      href: "href",
      file: "file",
      url: "file.asset.url",
      size: "file.asset.size",
    },
    prepare({ text, type, blank, href = "-", file, url, size }) {
      return {
        title: text,
        subtitle:
          type !== "standard"
            ? [formatBytes(size), url].join(" • ")
            : [href, blank ? "(new tab)" : undefined].join(" "),
        media: renderEmoji(type !== "standard" ? "💾" : "🔗"),
      };
    },
  },
}));

export default [link, linkContent];
