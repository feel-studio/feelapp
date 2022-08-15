import { renderLarge, renderHeadline } from "./renderers.js";

export const styles = [
  { title: "Normal", value: "normal" },
  {
    title: "Large",
    value: "large",
    blockEditor: {
      render: renderLarge,
    },
  },
  {
    title: "Headline",
    value: "headline",
    blockEditor: {
      render: renderHeadline,
    },
  },
];
