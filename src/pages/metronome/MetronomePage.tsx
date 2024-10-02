import { useState } from "react";
import Knob from "../../components/knob/Knob";
import styles from "./metronome-page.module.css";
import { Minus, Pause, Play, Plus } from "react-feather";

const MAX_BPM = 320;
const MIN_BPM = 1;

const MetronomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);
  const handleChange = (newVal: number) => {
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
        onChange={handleChange}
      />
      <button
        className={`${styles.bottom} ${styles.button}`}
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? (
          <Play size={40} className={styles.play} />
        ) : (
          <Pause size={40} />
        )}
      </button>
    </div>
  );
};

export default MetronomePage;
