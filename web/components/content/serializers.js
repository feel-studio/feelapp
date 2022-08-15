import { Block, BlockMediaEmbed, BlockMediaSingle } from "./blocks";
import { Hyperlink } from "../parts/utils";
import { Mark } from "./marks";

const serializers = {
  undefined: (props) => {
    return null;
  },
  list: ({ type, children }) =>
    type === "bullet" ? (
      <ul>
        {children.map(({ props }, i) => (
          <li key={i}>{props?.children}</li>
        ))}
      </ul>
    ) : (
      <ol>
        {children.map(({ props }, i) => (
          <li key={i}>{props?.children}</li>
        ))}
      </ol>
    ),
  marks: {
    uppercase: (props) => (
      <span style={{ textTransform: "uppercase" }}>{props?.children}</span>
    ),
    link: (props) => {
      props;
      return (
        <Hyperlink link={props?.mark?.attributes}>{props?.children}</Hyperlink>
      );
      //   return <a href={props?.mark?.download?.asset.url}>ABC{props.children}</a>;
    },
  },
  styles: {},
  types: {
    undefined: (props) => {
      return null;
    },
    // blockText: (props) => BlockContent.defaultSerializers.types.block(props),
    // blockTextFull: (props) =>
    //   BlockContent.defaultSerializers.types.block(props),
    blockText: (props) => <Block {...props} />,
    blockTextFull: (props) => <Block {...props} />,
    blockMediaEmbed: (props) => <BlockMediaEmbed {...props} />,
    blockMediaSingle: (props) => <BlockMediaSingle {...props} />,
  },
};

export default serializers;
