import { useState } from "react";
import Knob from "../../components/knob/Knob";
import styles from "./metronome-page.module.css";

const MetronomePage = () => {
  const [bpm, setBpm] = useState(60);
  const handleChange = (newVal: number) => {
    setBpm(newVal);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.tempoWrapper}>
        <button
          onClick={() => {
            setBpm(bpm - 1);
          }}
        >
          -
        </button>
        <h2>{bpm}</h2>
        <button
          onClick={() => {
            setBpm(bpm + 1);
          }}
        >
          +
        </button>
      </div>
      <p>BPM</p>
      <Knob
        className={styles.knob}
        value={bpm}
        step={1}
        min={1}
        max={320}
        onChange={handleChange}
      />
    </div>
  );
};

export default MetronomePage;
