import { useState, forwardRef, useImperativeHandle } from "react";

import { AnimateHeight } from "./AnimateHeight";

const Accordion = forwardRef((props, ref) => {
  const [isOpen, setAccordion] = useState(false);

  const toggleAccordion = () => {
    setAccordion(!isOpen);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleAccordion,
    };
  });

  return (
    <>
      <div className="Accordion" data-open={isOpen}>
        {props.children[0]}
        <AnimateHeight isOpen={isOpen}>{props.children[1]}</AnimateHeight>
      </div>

      <style jsx>{`
        .Accordion :global(> *:first-child) {
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .Accordion {
            padding-right: calc(25vw - 1rem);
          }
        }
      `}</style>
    </>
  );
});

Accordion.displayName = "Accordion";

export default Accordion;
