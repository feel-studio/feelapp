import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useMeasure } from "@/hooks/useMeasure";

export function AnimateHeight({
  duration,
  ease = "easeOut",
  variants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { opacity: { delay: 0.15, duration: 0.35 } },
    },
    collapsed: {
      opacity: 0,
      height: 0,
      transition: { height: { delay: 0.15 } },
    },
  },
  isOpen,
  children,
  ...other
}) {
  const ref = useRef(null);
  const bounds = useMeasure(ref);

  return (
    <motion.div
      style={{ overflow: isOpen ? "unset" : "hidden" }}
      initial={isOpen ? "open" : "collapsed"}
      animate={isOpen ? "open" : "collapsed"}
      inherit={false}
      variants={variants}
      transition={{
        ease,
        duration:
          typeof duration === "number"
            ? duration
            : getAutoHeightDuration(bounds.height) / 1000,
      }}
      {...other}
    >
      {typeof children === "function" ? (
        children(ref)
      ) : (
        <div ref={ref}>{children}</div>
      )}
    </motion.div>
  );
}

/**
 * Get the duration of the animation depending upon
 * the height provided.
 * @param {number} height of container
 */

function getAutoHeightDuration(height) {
  if (!height) return 0;
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
