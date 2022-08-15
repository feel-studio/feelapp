import blocks from "./blocks";

const contentText = {
  title: "Content",
  name: "contentText",
  type: "array",
  of: [{ type: "blockText" }],
};

const contentFull = {
  title: "Content (Full)",
  name: "contentFull",
  type: "array",
  of: [
    { type: "blockTextFull" },
    { type: "blockMediaSingle" },
    { type: "blockMediaEmbed" },
  ],
};

export default [...blocks, contentText, contentFull];
