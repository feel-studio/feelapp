import Link from "next/link";
import { motion } from "framer-motion";
const slugify = require("slugify");

const NavLinks = ({ root, routes, routeSlugActive, isActive, close }) => {
  return (
    <>
      <motion.ul
        className="NavLinks"
        animate={{
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        {routes.map((route, i) => (
          <li
            key={i}
            data-active={
              (route === root && routeSlugActive === "/") ||
              `/${slugify(route, { lower: true })}` === routeSlugActive
            }
          >
            <Link
              onClick={() => close()}
              href={
                route === root ? "/" : `/${slugify(route, { lower: true })}`
              }
            >
              {route}
            </Link>
          </li>
        ))}
      </motion.ul>

      <style jsx>{``}</style>
    </>
  );
};

export default NavLinks;
