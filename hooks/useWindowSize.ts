import React, { useLayoutEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window?.innerWidth ?? 0, window?.innerHeight ?? 0]);
    }
    window?.addEventListener("resize", updateSize);
    updateSize();
    return () => window?.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
