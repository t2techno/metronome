import { useState } from "react";
import Field from "../BeatGroupField/BeatGroupField";
import TimeSignature from "../TimeSignature";
import styles from "./beat-group.module.css";

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

interface iBeatProps {
  currentMeasure: number;
  group: iBeatGroup;
  updateGroup: (newGroup: iBeatGroup) => void;
}
const BeatGroup: React.FC<iBeatProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.wrapper}>
      {isOpen ? (
        <OpenGroup {...props} />
      ) : (
        <ClosedGroup
          name={props.group.name}
          onClick={() => setIsOpen((state) => !state)}
        />
      )}
    </div>
  );
};

export const OpenGroup: React.FC<iBeatProps> = ({
  group,
  currentMeasure,
  updateGroup,
}) => {
  const handleClick = () => {
    // todo
  };
  return (
    <>
      <Field label="Section" onClick={handleClick}>
        {group.name}
      </Field>
      <Field label="Start" onClick={handleClick}>
        {group.start}
      </Field>
      <VertSeperator />
      <Field label="End" onClick={handleClick}>
        {group.end >= 0 ? group.end : "-"}
      </Field>
      <VertSeperator />
      <Field label="Current" onClick={handleClick}>
        {currentMeasure}
      </Field>
      <VertSeperator />
      <Field label="TimeSignature" onClick={handleClick}>
        <TimeSignature
          beatsPerMeasure={group.beatsPerMeasure}
          subdivision={group.subdivision}
        />
      </Field>
      <VertSeperator />
      <Field label="Tempo" onClick={handleClick}>
        {group.tempo}
      </Field>
    </>
  );
};

export const ClosedGroup = ({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) => {
  return (
    <Field label="Section" onClick={onClick}>
      {name}
    </Field>
  );
};

const VertSeperator = () => {
  return <div className={styles.seperator} />;
};

export default BeatGroup;
