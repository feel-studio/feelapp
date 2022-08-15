import { styles } from "./styles";
import { decorators } from "./decorators";
import { annotations } from "./annotations";

const blockText = {
  title: "Block Text",
  name: "blockText",
  type: "block",
  styles: [],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  marks: {
    decorators,
    annotations,
  },
};

// Extend base text capabilities if needed
const blockTextFull = {
  title: "Block Text (Full)",
  name: "blockTextFull",
  type: "block",
  styles,
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  marks: {
    decorators: [...decorators],
    annotations: [...annotations],
  },
};

export default [blockText, blockTextFull];
