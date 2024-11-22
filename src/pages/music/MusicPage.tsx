import { useContext } from "react";

import styles from "./music-page.module.css";
import TimeSignature from "../../components/TimeSignature";
import Beat from "../../components/BeatBackup";
import GroupInfo from "../../components/GroupInfo";
import GroupTab from "../../components/GroupTab";
import { MusicContext } from "../../provider/MusicProvider";

const MusicPage = () => {
  const {
    beatGroups,
    addBeatGroup,
    currentGroup,
    currentMeasure,
    setCurrent,
    reset,
  } = useContext(MusicContext);

  const beats = new Array(beatGroups[currentGroup].beatsPerMeasure)
    .fill(0)
    .map((_, idx) => (
      <Beat key={idx} size={0.5} active={false} onClick={() => {}} />
    ));

  return (
    <div className={`${styles.wrapper} caveat-600`}>
      {beatGroups.length > 0 && (
        <>
          <TimeSignature
            beatsPerMeasure={beatGroups[currentGroup].beatsPerMeasure}
            subdivision={beatGroups[currentGroup].subdivision}
          />
          {currentMeasure}
          <div className={styles.beatRow}>{beats}</div>
        </>
      )}
      <hr />

      <div className={styles.groupSection}>
        <div className={styles.infoRow}>
          <button className={styles.groupButton} onClick={addBeatGroup}>
            Add group
          </button>
          <GroupInfo />
          <button className={styles.groupButton} onClick={reset}>
            Reset
          </button>
        </div>

        <div className={styles.groupTabs}>
          {beatGroups.map((group, idx) => (
            <GroupTab
              key={group.key}
              name={group.name}
              start={group.start}
              end={group.end}
              onLongPress={() => {
                console.log("long press, opening group " + idx);
                setCurrent("group", idx);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
