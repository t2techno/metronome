//https://stackoverflow.com/a/44337628/21901410

import { useRef } from "react";

const useTimer = (
  onTick: (now: number) => void,
  interval: number,
  onError: () => void
) => {
  const intervalRef = useRef(0);
  const count = useRef(0);
  const lastStep = useRef(0);
  const expected = useRef(0);
  const timeout = useRef(0);
  const isPlaying = useRef(false);

  const start = () => {
    tick();
    expected.current = Date.now() + interval;
    count.current = 0;
    isPlaying.current = true;
    intervalRef.current = interval;
    timeout.current = window.setTimeout(step, interval);
  };

  const stop = () => {
    isPlaying.current = false;
    window.clearTimeout(timeout.current);
  };

  const step = () => {
    // adjust timer by drift amount to prevent long-term inaccuracy
    const drift = Date.now() - expected.current;
    expected.current += interval;

    if (drift > interval || drift < -100) {
      console.log("drift way too high");
      console.log(`drift: ${drift}`);
      timeout.current = window.setTimeout(step, Math.max(0, interval));
    } else {
      console.log(`drift: ${drift}`);
      timeout.current = window.setTimeout(step, Math.max(0, interval - drift));
    }
    tick();
  };

  const tick = () => {
    lastStep.current = Date.now();
    onTick(count.current);
    count.current += 1;
  };

  // update interval mid click on change
  if (
    isPlaying.current &&
    !Number.isNaN(interval) &&
    interval != 0 &&
    intervalRef.current != interval
  ) {
    console.log("prop change");
    const intervalDif = interval - intervalRef.current;
    console.log(
      `interval: ${interval} - intervalRef: ${intervalRef.current}, df: ${intervalDif}`
    );
    intervalRef.current = interval;
    expected.current += intervalDif;
    window.clearTimeout(timeout.current);
    const now = Date.now();
    if (now < expected.current) {
      const delay = expected.current - now;
      timeout.current = window.setTimeout(step, delay);
    } else {
      tick();
      const delay = now - expected.current;
      timeout.current = window.setTimeout(step, delay);
    }
  }

  return { start, stop };
};

export default useTimer;
