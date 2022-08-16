import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import config from "@config";
import Content from "../content/Content";
import { Media } from "../media";
import { Hyperlink } from "../parts/utils";

const Footer = ({ info }) => {
  const { information, logo, links } = info || {};
  const { createdAt = "" } = config;
  return (
    <>
      <footer className="Footer">
        <section>
          <figure className="logo">
            <Link href="/">
              <a>
                <Media media={{ mediaType: "image", image: logo }} />
              </a>
            </Link>
          </figure>
          <div className="information">
            <Content blocks={information} />
            <br />
            {links?.map((link, i) => (
              <Hyperlink key={i} link={link} />
            ))}
          </div>
        </section>
        <div className="legal">
          <span>{`© ${new Date().getFullYear()}`} Feel Enterprises LLC</span>
        </div>
      </footer>
      <style jsx global>{`
        .Footer {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          min-height: 50vh;
          min-height: 50svh;
          text-transform: uppercase;
        }

        .RouteProject .Footer {
          min-height: 100vh;
          min-height: 100svh;
          scroll-snap-align: bottom;
          padding: 50vh 1rem 1rem 1rem;
          padding: 50svh 1rem 1rem 1rem;
        }

        .Footer section {
          flex-grow: 1;
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(calc(264px + 2rem), 1fr)
          );
          align-items: center;
          width: 100%;
          margin: 0 auto;
          gap: 1rem;
        }

        .Footer .legal {
          display: flex;
          justify-content: space-between;
        }

        .Footer .information a {
          border-bottom: 1px solid;
          margin-bottom: -1px;
        }

        .Footer .logo {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .Footer .Media {
          --h: calc(var(--lH) * 3);
          width: calc(var(--h) * var(--ratio));
          height: var(--h);
        }

        .Footer :global(a) {
        }

        @media (max-width: 667px) {
          .Footer {
            justify-content: flex-end;
            gap: calc(var(--lH) * 5);
          }

          .Footer section {
            flex-grow: unset;
            display: block;
          }

          .Footer .logo {
            margin-bottom: calc(var(--lH) * 5);
          }
        }

        @media (hover: hover) {
          .Footer :global(a:hover) {
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
