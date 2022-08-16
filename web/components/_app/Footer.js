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
          <span>
            {`© ${createdAt}${
              new Date().getFullYear() > createdAt
                ? " – " + new Date().getFullYear().toString().substr(-2)
                : ""
            }`}{" "}
            Feel Enterprises LLC
          </span>
          <Link href="/legal">
            <a>Legal Notice</a>
          </Link>
        </div>
      </footer>
      <style jsx global>{`
        .Footer {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          scroll-snap-align: bottom;
          padding: 50vh 1rem 1rem 1rem;
          text-transform: uppercase;
        }

        .Footer section {
          flex-grow: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          width: calc(100vmin - 2rem);
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

        @media (min-aspect-ratio: 1 / 1) {
          .Footer .logo {
            justify-content: flex-start;
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
