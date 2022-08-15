import { MdOutlineAddLink } from "react-icons/md";

// Annotate text with additional information
export const annotations = [
  {
    name: "link",
    type: "object",
    title: "Link",
    blockEditor: {
      icon: MdOutlineAddLink,
    },
    fields: [
      {
        title: "Attributes",
        name: "attributes",
        type: "linkContent",
      },
    ],
  },
];
