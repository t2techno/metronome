import { useContext, useEffect, useState } from "react";
import Knob from "../../components/knob/Knob";
import styles from "./metronome-page.module.css";
import { Minus, Pause, Play, Plus } from "react-feather";
import useTimer from "../../hooks/useTimer";
import TimeSignature from "../../components/TimeSignature";
import Beat from "../../components/Beat";
import Settings from "../../components/Settings";
import { MetronomeContext } from "../../provider/MetronomeProvider";

const MAX_BPM = 320;
const MIN_BPM = 1;

type PlayFunction = ({ id }: { id: string }) => void;
type BeatSize = "full" | "half" | "quarter";

const MetronomePage = ({ playSound }: { playSound: PlayFunction }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [activeBeat, setActiveBeat] = useState(0);
  const {
    beatsPerMeasure: beatsPerMeasureStr,
    base: baseStr,
    subdiv: subdivStr,
  } = useContext(MetronomeContext);
  const base = Number.parseInt(baseStr);
  const beatsPerMeasure = Number.parseInt(beatsPerMeasureStr);

  let subdiv: number;
  switch (subdivStr) {
    case "eighth":
      subdiv = 2;
      break;
    case "triplet":
      subdiv = 3;
      break;
    case "sixteenth":
      subdiv = 4;
      break;
    default:
      subdiv = 1;
  }
  const [beatSizes, setBeatSizes] = useState(
    new Array(beatsPerMeasure * subdiv).fill(0).map((_, idx) => {
      if (idx === 0) {
        return "full";
      } else if (idx % subdiv === 0) {
        return "half";
      }
      return "quarter";
    })
  );

  useEffect(() => {
    setBeatSizes(
      new Array(beatsPerMeasure * subdiv).fill(0).map((_, idx) => {
        if (idx === 0) {
          return "full";
        } else if (idx % subdiv === 0) {
          return "half";
        }
        return "quarter";
      })
    );
  }, [subdivStr]);

  const playBeat = (elapsed: number) => {
    console.log(elapsed);
    const activeBeat = elapsed % (beatsPerMeasure * subdiv);
    setActiveBeat(activeBeat);

    // hack to get latest state in a timer
    setBeatSizes((s) => {
      playSound({ id: s[activeBeat] });
      return s;
      beatSizes;
    });
  };

  const msPerBeat = 1000 * (60 / (bpm * subdiv));
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

  const beats = beatSizes.map((size, idx) => (
    <Beat
      key={idx}
      isFirst={size === "full"}
      downBeat={size === "half"}
      active={activeBeat === idx}
    />
  ));

  return (
    <div className={styles.wrapper}>
      <Settings />
      <div className={styles.topRow}>
        <div className={`caveat-600 ${styles.timeSigWrapper}`}>
          <TimeSignature beatsPerMeasure={beatsPerMeasure} base={base} />
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
