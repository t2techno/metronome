import useTimer from "./useTimer";

export const useMetronome = (
  onTick: (now: number, soundId: string) => void,
  soundIds: Array<string>,
  interval: number,
  onError: () => void
) => {
  const tick = (elapsed: number) => {
    onTick(elapsed, soundIds[elapsed % soundIds.length]);
  };
  return useTimer(tick, interval, onError);
};
