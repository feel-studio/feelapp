import ResizeObserver from "resize-observer-polyfill";
import { useState, useEffect, useCallback } from "react";

const useCallbackRef = () => {
  const [ref, setRef] = useState(null);
  const fn = useCallback((node) => {
    setRef(node);
  }, []);

  return [ref, fn];
};

export function useMeasure(ref) {
  const [element, attachRef] = useCallbackRef();
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    function onResize([entry]) {
      setBounds({
        height: entry.contentRect.height,
      });
    }

    const observer = new ResizeObserver(onResize);

    if (element && element.current) {
      observer.observe(element.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [element]);

  useEffect(() => {
    attachRef(ref);
  }, [attachRef, ref]);

  return bounds;
}
