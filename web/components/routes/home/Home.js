import { Media } from "@/components/media";
import Link from "next/link";
import {} from "./";

const Home = ({ projects }) => {
  return (
    <>
      <main className="Home">
        {projects.map(({ slug, thumbnails }) => {
          return thumbnails?.map((media) => (
            <Link key={media?._key} href={"/project/" + slug?.current}>
              <a>
                <Media media={media} gif />
              </a>
            </Link>
          ));
        })}
      </main>

      <style jsx global>{`
        .Home {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          padding: 1rem;
          flex-grow: 1;
        }

        @media (min-width: 428px) {
          .Home {
            grid-template-columns: repeat(
              auto-fill,
              minmax(calc(var(--wCol) + 2rem), 1fr)
            );
          }
        }

        .Home a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          aspect-ratio: 1;
        }

        .Home .Media * {
          pointer-events: none !important;
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
