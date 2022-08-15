import { useEffect, useState, useRef } from "react";
import { useWindowSize } from "@react-hook/window-size/throttled";

function useLayoutType() {
  const [type, setType] = useState(null);
  const [wWindow, hWindow] = useWindowSize();

  const labels = useRef();

  useEffect(() => {
    const w = wWindow;

    let [isSmall, isLarge] = Array(2).fill(false);

    switch (true) {
      case w < 768:
        setType("small");
        isSmall = true;
        break;
      default:
        setType("large");
        isLarge = true;
        break;
    }

    labels.current = { isSmall, isLarge };
  }, [wWindow, hWindow]);

  return { type, ...labels.current };
}

export default useLayoutType;
