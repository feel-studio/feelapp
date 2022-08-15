import Embed from "@/components/media/Embed";
import Content from "@/components/content/Content";

const BlockMediaEmbed = ({ node }) => {
  const { url, caption } = node;

  return (
    <>
      <figure className="BlockMediaEmbed">
        <Embed url={url} />
        {caption && (
          <figcaption className="caption">
            <Content blocks={caption} />
          </figcaption>
        )}
      </figure>

      <style jsx>{`
        .BlockMediaEmbed {
          width: 100%;
          position: relative;
        }

        .BlockMediaEmbed {
          margin-top: var(--_1);
        }

        .BlockMediaEmbed:not(:last-child) {
          margin-bottom: var(--_1);
        }

        .caption {
          margin-top: calc(var(--lHS) / 2);
          font-size: var(--fSS);
          line-height: var(--lHS);
          letter-spacing: var(--lSS);
        }
      `}</style>
    </>
  );
};

export default BlockMediaEmbed;
