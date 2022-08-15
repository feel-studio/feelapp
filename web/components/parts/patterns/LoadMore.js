import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LoadMore = ({ children, batch = 10 }) => {
  const [showing, setShowing] = useState(batch);

  return children.length <= batch ? (
    children
  ) : (
    <>
      <motion.div className="LoadMore" layout transition={{ duration: 0.1 }}>
        <AnimatePresence>
          {children
            ?.filter((child, i) => i < showing)
            .map((child, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
              >
                {child}
              </motion.div>
            ))}
        </AnimatePresence>

        <motion.button
          layout="position"
          onClick={() =>
            setShowing(showing < children.length ? showing + batch : batch)
          }
        >
          {showing < children.length
            ? `Show ${
                children.length - showing >= batch
                  ? batch
                  : children.length - showing
              } more`
            : "Show less"}
        </motion.button>
      </motion.div>

      <style jsx>{``}</style>
    </>
  );
};

export default LoadMore;
