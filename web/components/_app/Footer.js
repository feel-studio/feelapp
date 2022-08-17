import { motion } from "framer-motion";
import config from "@config";
import { Hyperlink } from "../parts/utils";

const Footer = ({ info, isIdle, section }) => {
  const { information, logo, links } = info || {};
  const { createdAt = "" } = config;
  return (
    <>
      <motion.footer
        className="Footer"
        data-visible={section !== "center"}
        initial={{ opacity: 1 }}
        animate={{ opacity: section !== "center" ? 1 : 0 }}
      >
        <ul className="links">
          {links?.map((link, i) => (
            <li key={i}>
              <Hyperlink link={link} />
            </li>
          ))}
        </ul>
        <div className="legal">
          <span>{`© ${new Date().getFullYear()}`} Feel Enterprises LLC</span>
        </div>
      </motion.footer>
      <style jsx global>{`
        .Footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1rem;
          text-transform: uppercase;
          display: flex;
          gap: calc(var(--lH) / 2) 1rem;
          flex-wrap: wrap;
          flex-direction: row;
        }

        .Footer[data-visible="false"] {
          pointer-events: none;
        }

        .RouteProject .Footer {
          min-height: 100vh;
          min-height: 100svh;
          scroll-snap-align: bottom;
          padding: 50vh 1rem 1rem 1rem;
          padding: 50svh 1rem 1rem 1rem;
        }

        .Footer .legal {
          display: flex;
          justify-content: space-between;
          white-space: nowrap;
        }

        .Footer .links {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .Footer .links a {
          margin-bottom: -1px;
          border-bottom: 1px solid;
        }
      `}</style>
    </>
  );
};

export default Footer;
