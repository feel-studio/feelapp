import { memo } from "react";
import BlockContent from "@sanity/block-content-to-react";

import serializers from "./serializers";

const Content = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;
  return (
    <>
      <BlockContent
        className="Content"
        blocks={blocks}
        serializers={serializers}
        renderContainerOnSingleChild
      />

      <style jsx global>{`
        .Content h3 {
          font-size: 0.75em;
        }

        .Content h3:not(:first-child) {
          /*margin-top: var(--__5);*/
        }

        .Content :is(p, ul, ol) + :is(p, ul, ol):not(:empty)::before {
          content: "\A";
          white-space: pre-wrap;
        }

        .Content p a {
          transition: color 0.233s;
        }

        @media (hover: hover) {
          .Content p a:hover {
          }
        }

        .Content ul {
          padding-left: 2.5ch;
        }

        .Content ul li::before {
          content: "·";
          width: 2.5ch;
          margin-left: -2.5ch;
          display: inline-block;
        }

        .Content ol {
          padding-left: 2.5ch;
          counter-reset: num;
        }

        .Content ol li::before {
          counter-increment: num;
          content: counter(num) ". ";
          width: 2.5ch;
          margin-left: -2.5ch;
          display: inline-block;
        }
      `}</style>
    </>
  );
};

export default memo(Content);
