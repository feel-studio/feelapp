// NOTICE:
// Use forwardRef in each child component to hook up the
// intersection observer

import { cloneElement, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const offsetInner = 49.75;

const Section = ({ children, setEntry }) => {
  const [ref, inView, entry] = useInView({
    rootMargin: `-${offsetInner}% 0px`,
  });

  useEffect(() => inView && setEntry(entry), [inView, entry, setEntry]);

  return cloneElement(children, { ref });
};

const Indicator = () => (
  <hr
    style={{
      "--h": `${100 - 2 * offsetInner}vh`,
      display: "block",
      position: "fixed",
      top: "calc((100% - var(--h)) / 2)",
      left: 0,
      width: "100%",
      height: "var(--h)",
      borderWidth: 0,
      background: "red",
      zIndex: 9999,
    }}
  />
);

const MonitorSections = ({ children, ...props }) => (
  <>
    {children?.map((child, i) => (
      <Section key={i} {...props}>
        {child}
      </Section>
    ))}

    {/* <Indicator /> */}
  </>
);

export default MonitorSections;
