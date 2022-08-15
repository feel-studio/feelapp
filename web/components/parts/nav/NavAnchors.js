import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
import animateScrollTo from "animated-scroll-to";

const slugify = require("slugify");

const scrollToSection = (id) =>
  animateScrollTo(document.querySelector(`#${id}`), {
    verticalOffset:
      -1 *
      (document.querySelector("nav > button")?.clientHeight ||
        document.querySelector("nav")?.clientHeight),
    maxDuration: 1000,
  }).then((hasScrolledToPosition) => {});

const Anchors = ({
  sections,
  sectionSlugActive = null,
  isActive = false,
  close,
  children,
}) => {
  const { t } = useTranslation("routes");

  return (
    <>
      <motion.ul
        className="anchors"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        {sections.map((section, i) => (
          <li
            key={i}
            data-active={
              slugify(section, { lower: true }) === sectionSlugActive
            }
          >
            <button
              onClick={() => {
                scrollToSection(slugify(section, { lower: true }));
                close();
              }}
            >
              {t(section)}
            </button>
          </li>
        ))}
        {children}
      </motion.ul>

      <style jsx>{``}</style>
    </>
  );
};

export default Anchors;
