import { useEffect, useState } from "react";
import { useWindowSize } from "@react-hook/window-size/throttled";

function useRem(factor = 1) {
  const [rem, setRem] = useState(0);
  const [windowW, windowH] = useWindowSize();

  useEffect(() => {
    const rootFontSize = parseFloat(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("font-size")
    );

    setRem(rootFontSize);
  }, [windowH, windowW]);

  return rem * factor;
}

export default useRem;
