import { useState } from "react";

import styles from "./music-page.module.css";
import TimeSignature from "../../components/TimeSignature";
import Beat from "../../components/Beat";
import GroupInfo, { iBeatGroup } from "../../components/GroupInfo";
import GroupTab from "../../components/GroupTab";

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
        <div className={styles.groupSection}>
          <GroupInfo
            currentMeasure={currentMeasure}
            group={beatGroups[currentGroup]}
            updateGroup={() => {}}
          />

          <div className={styles.groupTabWrapper}>
            {beatGroups.map((group, idx) => (
              <GroupTab
                key={group.key}
                name={group.name}
                onLongPress={() => {
                  console.log("long press, opening group " + idx);
                  setCurrentGroup(idx);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <button className={styles.addGroupButton} onClick={createNewGroup}>
        Add group
      </button>
    </div>
  );
};

export default MusicPage;
