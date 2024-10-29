import { useState } from "react";
import BeatGroup, { iBeatGroup } from "../../components/BeatGroup";
import styles from "./music-page.module.css";
import TimeSignature from "../../components/TimeSignature";

const testGroup: iBeatGroup = {
  key: Math.random(),
  start: 1,
  end: 25,
  tempo: 60,
  beatsPerMeasure: 4,
  subdivision: 4,
};

const MusicPage = () => {
  const [beatGroups, setBeatGroups] = useState<Array<iBeatGroup>>([testGroup]);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentMeasure, setCurrentMeasure] = useState(0);

  const handleGroupUpdate = (idx: number, newGroup: iBeatGroup) => {
    const newGroups = [...beatGroups];
    newGroups[idx] = newGroup;
    setBeatGroups(newGroups);
  };

  const createNewGroup = () => {
    const groups = [...beatGroups];
    const lastGroup = groups[groups.length - 1];
    const newGroup: iBeatGroup = {
      ...lastGroup,
      key: Math.random(),
      start: lastGroup.end + 1,
      end: -1,
    };
    groups.push(newGroup);
    setBeatGroups(groups);
  };

  return (
    <div className={styles.wrapper}>
      {beatGroups.length > 0 && (
        <>
          <TimeSignature
            beatsPerMeasure={beatGroups[currentGroup].beatsPerMeasure}
            subdivision={beatGroups[currentGroup].subdivision}
          />
          {<p>beat indicators...</p>}
        </>
      )}
      <hr />
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
      <button onClick={createNewGroup}>Add group</button>
    </div>
  );
};

export default MusicPage;
