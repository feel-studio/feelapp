import Media from "@/components/media/Media";
import Content from "../Content";

const BlockMediaSingle = ({ node }) => {
  const { media } = node,
    { mediaType, caption } = media;

  return (
    <>
      <section className="BlockMediaSingle">
        <figure>
          <Media media={media} />

          <figcaption className="caption">
            <Content blocks={caption} />
          </figcaption>
        </figure>
      </section>
      <style jsx>{`
        .BlockMediaSingle {
          display: flex;
          justify-content: center;
          width: 100%;
          position: relative;
        }

        .caption {
          margin-top: calc(var(--lHS) / 2);
          font-size: var(--fSS);
          line-height: var(--lHS);
          letter-spacing: var(--lSS);
        }

        .BlockMediaSingle:not(:first-child) {
          margin-top: var(--_1);
        }

        .BlockMediaSingle:not(:last-child) {
          margin-bottom: var(--_1);
        }

        .BlockMediaSingle figure {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default BlockMediaSingle;
