import Field from "../BeatGroupField/BeatGroupField";
import TimeSignature from "../TimeSignature";
import styles from "./beat-group.module.css";

export interface iBeatGroup {
  key: number;
  start: number;
  end: number;
  tempo: number;
  beatsPerMeasure: number;
  subdivision: number;
}

export type GroupFields =
  | "start"
  | "end"
  | "tempo"
  | "beatsPerMeasure"
  | "subdivision";

interface iBeatProps {
  currentMeasure: number;
  group: iBeatGroup;
  updateGroup: (newGroup: iBeatGroup) => void;
}
const BeatGroup: React.FC<iBeatProps> = ({
  group,
  currentMeasure,
  updateGroup,
}) => {
  return (
    <div className={styles.wrapper}>
      <Field label="Start">{group.start}</Field>
      <Field label="End">{group.end >= 0 ? group.end : "-"}</Field>
      <Field label="Current">{currentMeasure}</Field>
      <Field label="TimeSignature">
        <TimeSignature
          beatsPerMeasure={group.beatsPerMeasure}
          subdivision={group.subdivision}
        />
      </Field>
      <Field label="Tempo">{group.tempo}</Field>
    </div>
  );
};

export default BeatGroup;
