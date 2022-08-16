import Content from "@/components/content/Content";
import { Media } from "@/components/media";

const Project = ({ project }) => {
  const { title, content, information } = project?.[0] || {};

  return (
    <>
      {content?.map((media, i) => (
        <figure className="ProjectMedia" key={media?._key}>
          <Media media={media} />
        </figure>
      ))}
      <div className="ProjectDescription">
        <h2>{title}</h2>
        <br />
        <Content blocks={information} />
      </div>

      <style jsx global>{`
        .RouteProject {
          width: 100vw;
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y proximity;
        }

        .ProjectMedia:not(:first-child) {
          margin-top: calc(25vh - 2rem);
        }

        .ProjectMedia,
        .ProjectDescription {
          width: 100vmin;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          margin: 0 auto;
          scroll-snap-align: center;
          position: relative;
        }

        .ProjectMedia .Media {
          --size: calc(100vmin - 2rem);
        }

        .ProjectMedia .Media[data-orientation="portrait"] {
          width: calc(var(--size) * var(--ratio));
          height: var(--size);
        }

        .ProjectMedia .Media[data-orientation="landscape"] {
          width: var(--size);
          height: calc(var(--size) / var(--ratio));
        }

        .ProjectDescription {
          height: 100vh;
          flex-direction: column;
          text-align: center;
          text-transform: uppercase;
          scroll-snap-align: center;
          margin-bottom: -50vh;
        }
      `}</style>
    </>
  );
};

export default Project;
