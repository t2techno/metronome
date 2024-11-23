import { useState } from "react";
import Knob from "../../components/knob/Knob";
import styles from "./metronome-page.module.css";
import { Minus, Pause, Play, Plus } from "react-feather";
import useTimer from "../../hooks/useTimer";
import TimeSignature from "../../components/TimeSignature";
import Beat from "../../components/Beat";
import Settings from "../../components/Settings";

const MAX_BPM = 320;
const MIN_BPM = 1;

type PlayFunction = ({ id }: { id: string }) => void;

const MetronomePage = ({ playSound }: { playSound: PlayFunction }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [subdivision, setSubdivision] = useState(4);
  const [activeBeat, setActiveBeat] = useState(0);

  const playBeat = (elapsed: number) => {
    console.log(elapsed);
    setActiveBeat(elapsed % beatsPerMeasure);
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

  const beats = new Array(beatsPerMeasure)
    .fill(0)
    .map((_, idx) => <Beat key={idx} active={activeBeat === idx} />);

  return (
    <div className={styles.wrapper}>
      <Settings />
      <div className={styles.topRow}>
        <div className={`caveat-600 ${styles.timeSigWrapper}`}>
          <TimeSignature
            beatsPerMeasure={beatsPerMeasure}
            subdivision={subdivision}
          />
        </div>
      </div>
      <div className={styles.beatRow}>{beats}</div>
      <div className={styles.tempoWrapper}>
        <button
          className={styles.button}
          onClick={() => {
            setBpm(Math.max(bpm - 1, MIN_BPM));
          }}
        >
          <Minus size={64} />
        </button>
        <p className={`caveat-800 ${styles.tempo}`}>{bpm}</p>
        <button
          className={styles.button}
          onClick={() => {
            setBpm(Math.min(bpm + 1, MAX_BPM));
          }}
        >
          <Plus size={40} />
        </button>
      </div>
      <p className={`caveat-600 ${styles.bpmLabel}`}>BPM</p>
      <Knob
        className={styles.knob}
        value={bpm / MAX_BPM}
        step={1 / MAX_BPM}
        min={0}
        max={1}
        onChange={(val) => setBpm(Math.max(Math.round(val * MAX_BPM), 1))}
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
