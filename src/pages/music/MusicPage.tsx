import { useState } from "react";
import BeatGroup, { iBeatGroup } from "../../components/BeatGroup";
import styles from "./music-page.module.css";
import TimeSignature from "../../components/TimeSignature";
import Beat from "../../components/Beat";

const testGroup: iBeatGroup = {
  key: Math.random(),
  name: "A",
  start: 1,
  end: 25,
  tempo: 60,
  beatsPerMeasure: 4,
  subdivision: 4,
};

const MusicPage = () => {
  const [beatGroups, setBeatGroups] = useState<Array<iBeatGroup>>([testGroup]);
  const [openGroup, setOpenGroup] = useState(-1);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentMeasure, setCurrentMeasure] = useState(0);

  const handleGroupUpdate = (idx: number, newGroup: iBeatGroup) => {
    const newGroups = [...beatGroups];
    newGroups[idx] = newGroup;
    setBeatGroups(newGroups);
  };

  const beats = new Array(beatGroups[currentGroup].beatsPerMeasure)
    .fill(0)
    .map((_, idx) => (
      <Beat key={idx} size={0.5} active={false} onClick={() => {}} />
    ));

  const nextName = () => {
    const newCharCode = 65 + (beatGroups.length % 26);
    console.log(`length: ${beatGroups.length}`);
    const multiple = Math.ceil(beatGroups.length / 25);
    const newName = String.fromCharCode(newCharCode).repeat(multiple);
    return newName;
  };

  const createNewGroup = () => {
    const groups = [...beatGroups];
    const lastGroup = groups[groups.length - 1];
    // A = 65 ascii
    const newGroup: iBeatGroup = {
      ...lastGroup,
      name: nextName(),
      key: Math.random(),
      start: lastGroup.end + 1,
      end: lastGroup.end + 2,
    };
    groups.push(newGroup);
    setBeatGroups(groups);
  };

  return (
    <div className={`${styles.wrapper} caveat-600`}>
      {beatGroups.length > 0 && (
        <>
          <TimeSignature
            beatsPerMeasure={beatGroups[currentGroup].beatsPerMeasure}
            subdivision={beatGroups[currentGroup].subdivision}
          />
          <div className={styles.beatRow}>{beats}</div>
        </>
      )}
      <hr />

      <div className={styles.groupWrapper}>
        {beatGroups.map((group, idx) => (
          <BeatGroup
            key={group.key}
            currentMeasure={currentMeasure}
            group={group}
            updateGroup={(newGroup: iBeatGroup) => {
              handleGroupUpdate(idx, newGroup);
            }}
          />
        ))}
      </div>
      <button className={styles.addGroupButton} onClick={createNewGroup}>
        Add group
      </button>
    </div>
  );
};

export default MusicPage;
