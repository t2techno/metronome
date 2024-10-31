import Field from "../GroupField";
import TimeSignature from "../TimeSignature";
import styles from "./group-info.module.css";

export interface iBeatGroup {
  key: number;
  name: string;
  start: number;
  end: number;
  tempo: number;
  beatsPerMeasure: number;
  subdivision: number;
}

export type GroupFields =
  | "name"
  | "start"
  | "end"
  | "tempo"
  | "beatsPerMeasure"
  | "subdivision";

interface iGroupInfoProps {
  currentMeasure: number;
  group: iBeatGroup;
  updateGroup: (newGroup: iBeatGroup) => void;
}

const GroupInfo: React.FC<iGroupInfoProps> = ({
  group,
  currentMeasure,
  updateGroup,
}) => {
  const handleClick = () => {
    //todo
  };
  let position = "";
  if (currentMeasure < group.start) {
    position = `${group.start - currentMeasure} before`;
  } else if (currentMeasure > group.end) {
    position = `${currentMeasure - group.end} after`;
  } else {
    position = `${currentMeasure - group.start}`;
  }

  return (
    <div className={styles.wrapper}>
      <Field label="Section" onLongPress={handleClick}>
        {group.name}
      </Field>
      <Field label="Start" onLongPress={handleClick}>
        {group.start}
      </Field>
      <div className={styles.seperator} />
      <Field label="End" onLongPress={handleClick}>
        {group.end >= 0 ? group.end : "-"}
      </Field>
      <div className={styles.seperator} />
      <Field label="Current" onLongPress={handleClick}>
        {position}
      </Field>
      <div className={styles.seperator} />
      <Field label="TimeSignature" onLongPress={handleClick}>
        <TimeSignature
          beatsPerMeasure={group.beatsPerMeasure}
          subdivision={group.subdivision}
        />
      </Field>
      <div className={styles.seperator} />
      <Field label="Tempo" onLongPress={handleClick}>
        {group.tempo}
      </Field>
    </div>
  );
};

export default GroupInfo;
