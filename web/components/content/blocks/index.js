import BlockMediaEmbed from "./BlockMediaEmbed";
import BlockMediaSingle from "./BlockMediaSingle";

const Block = ({ children, isInline, node, options }) => {
  const { style } = node;
  if (style == "large") {
    return <p className={style}>{children}</p>;
  } else if (style == "normal") {
    return <p>{children}</p>;
  } else if (style == "headline") {
    return <h3>{children}</h3>;
  } else {
    return <p>{children}</p>;
  }
};

export { Block, BlockMediaEmbed, BlockMediaSingle };
