import { useCallback, useEffect, useRef, useState } from "react";

const useLongPress = (callback = () => {}, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false);
  const idRef = useRef<number>(-1);

  useEffect(() => {
    if (startLongPress) {
      idRef.current = setTimeout(callback, ms);
    } else {
      clearTimeout(idRef.current);
      idRef.current = -1;
    }

    return () => {
      clearTimeout(idRef.current);
      idRef.current = -1;
    };
  }, [callback, ms, startLongPress]);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);
  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: () => start,
    onMouseUp: () => stop,
    onMouseLeave: () => stop,
    onTouchStart: () => start,
    onTouchEnd: () => stop,
  };
};

export default useLongPress;
