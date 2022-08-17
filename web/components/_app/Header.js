import { motion } from "framer-motion";
import Link from "next/link";
import Content from "../content/Content";
import { Media } from "../media";

const Header = ({ info, isIdle, section, canScroll }) => {
  const { information, logo, links } = info || {};
  return (
    <>
      <motion.header
        className="Header"
        data-visible={section === "top"}
        initial={{ opacity: 1 }}
        animate={{ opacity: section === "top" || !canScroll ? 1 : 0 }}
      >
        <Link href="/">
          <a>
            <Media media={{ mediaType: "image", image: logo }} />
          </a>
        </Link>
        <div className="information">
          <Content blocks={information} />
        </div>
      </motion.header>

      <style jsx global>{`
        .Header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: calc(1.5 * var(--lH));
          text-transform: uppercase;
          z-index: 999;
          pointer-events: none;
        }

        .Header[data-visible="false"] {
          pointer-events: none;
        }

        .Header a {
          pointer-events: all;
        }

        .Header .Content {
          width: 40ch;
          text-align: center;
          pointer-events: all;
        }

        .Header .Media {
          --h: calc(var(--lH) * 3);
          width: calc(var(--h) * var(--ratio));
          height: var(--h);
        }
      `}</style>
    </>
  );
};

export default Header;
