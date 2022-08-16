import { Media } from "@/components/media";
import Link from "next/link";
import {} from "./";

const Home = ({ projects }) => {
  console.log({ projects });

  return (
    <>
      <main className="Home">
        {projects.map(({ title, _key, slug, content }) => {
          return content
            .filter(({ status }) => !!status)
            .map((media) => (
              <Link href={"/project/" + slug?.current}>
                <a>
                  <Media media={media} />
                </a>
              </Link>
            ));
        })}
      </main>

      <style jsx global>{`
        .Home {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(calc(264px + 2rem), 1fr)
          );
          gap: 1rem;
          padding: 1rem;
        }

        .Home a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          aspect-ratio: 1;
        }

        .Home .Media[data-orientation="portrait"] {
          height: 100%;
          aspect-ratio: var(--ratio);
        }

        .Home .Media[data-orientation="landscape"] {
          width: 100%;
          aspect-ratio: var(--ratio);
        }

        @media (max-width: 767px) {
        }

        @media (min-width: 768px) {
        }
      `}</style>
    </>
  );
};

export default Home;
