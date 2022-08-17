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
          display: inline-flex;
          justify-content: space-between;
        }

        .Footer .links {
          display: inline-flex;
          justify-content: center;
          gap: 1rem;
          margin-right: 1rem;
        }

        .Footer .links a {
          margin-bottom: -1px;
          border-bottom: 1px solid;
        }

        @media (max-width: 427px) {
          .Footer {
            justify-content: flex-end;
            gap: calc(var(--lH) * 5);
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
