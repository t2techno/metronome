import { useState } from "react";
import BeatGroup from "../../components/BeatGroup";
import styles from "./music-page.module.css";

interface iBeatGroups {
  start: number;
  length: number;
  tempo: number;
  beatsPerMeasure: number;
  subdivision: number;
}

const MusicPage = () => {
  const [beatGroups, setBeatGroups] = useState<Array<iBeatGroups>>([]);
  return (
    <div className={styles.wrapper}>
      <p>Time Signature</p>
      <p>Beat Indicators...</p>
      <hr />
      <BeatGroup />
    </div>
  );
};

export default MusicPage;
