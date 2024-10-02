import { useState } from "react";
import Knob from "../../components/knob/Knob";
import styles from "./metronome-page.module.css";
import { Minus, Pause, Play, Plus } from "react-feather";
import useTimer from "../../hooks/useTimer";

const MAX_BPM = 320;
const MIN_BPM = 1;

type PlayFunction = ({ id }: { id: string }) => void;

const MetronomePage = ({ playSound }: { playSound: PlayFunction }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);

  const playBeat = (elapsed: number) => {
    // console.log(elapsed);
    playSound({ id: "full" });
  };

  const msPerBeat = 1000 * (60 / bpm);
  const timer = useTimer(playBeat, msPerBeat, () => {
    console.log("oops, error");
  });

  const togglePlay = () => {
    if (isPlaying) {
      timer.stop();
    } else {
      timer.start();
    }
    setIsPlaying((state) => !state);
  };

  const handleBpmChange = (newVal: number) => {
    setBpm(newVal);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.tempoWrapper}>
        <button
          className={styles.button}
          onClick={() => {
            setBpm(bpm - 1);
          }}
        >
          <Minus size={64} />
        </button>
        <p className={`caveat-800 ${styles.tempo}`}>{bpm}</p>
        <button
          className={styles.button}
          onClick={() => {
            setBpm(bpm + 1);
          }}
        >
          <Plus size={40} />
        </button>
      </div>
      <p className={`caveat-600 ${styles.bpmLabel}`}>BPM</p>
      <Knob
        className={styles.knob}
        value={bpm}
        step={1}
        min={MIN_BPM}
        max={MAX_BPM}
        onChange={handleBpmChange}
      />
      <button
        className={`${styles.bottom} ${styles.button}`}
        onClick={() => {
          togglePlay();
        }}
      >
        {isPlaying ? (
          <Pause size={40} />
        ) : (
          <Play size={40} className={styles.play} />
        )}
      </button>
    </div>
  );
};

export default MetronomePage;
