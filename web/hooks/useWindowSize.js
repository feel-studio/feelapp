import { useState, useEffect } from "react";

function useWindowSize() {
  const isWindowClient = typeof window === "object",
    [windowW, setWindowW] = useState(
      isWindowClient ? window.innerWidth : undefined
    ),
    [windowH, setWindowH] = useState(
      isWindowClient ? window.innerHeight : undefined
    );

  //👇
  useEffect(() => {
    //a handler which will be called on change of the screen resize
    function setSize() {
      setWindowW(window.innerWidth);
      setWindowH(window.innerHeight);
    }

    if (isWindowClient) {
      //register the window resize listener
      window.addEventListener("resize", setSize);

      //un-register the listener
      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindowClient, setWindowW, setWindowH]);
  //☝️

  return { windowW, windowH };
}

export default useWindowSize;
