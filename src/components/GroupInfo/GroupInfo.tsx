import { useState } from "react";
import Field from "../GroupField";
import TimeSignature from "../TimeSignature";
import styles from "./group-info.module.css";
import InputPopover from "../Popover/InputPopover";

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

type InputFields = "start" | "end" | "tempo" | "current" | "timeSig";

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
  const [editField, setEditField] = useState<InputFields | "">("");
  const handleClick = (field: InputFields) => {
    if (field === editField) {
      setEditField("");
    } else {
      setEditField(field);
    }
  };

  const handleFieldChange = (field: GroupFields, newVal: number) => {
    console.log(field + " - " + newVal);
    updateGroup({ ...group, [field]: newVal });
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
      <div className={styles.groupSection}>
        <Field label="Section" onLongPress={() => {}}>
          {group.name}
        </Field>
        <Field
          label="Start"
          onLongPress={() => {
            handleClick("start");
          }}
        >
          <InputPopover
            isOpen={editField === "start"}
            onClose={() => setEditField("")}
            label="start"
            type="number"
            value={group.start}
            onValueChange={(val) => handleFieldChange("start", val)}
          />
          {group.start}
        </Field>
        <Field label="End" onLongPress={() => handleClick("end")}>
          {group.end >= 0 ? group.end : "-"}
        </Field>
        <Field label="Current" onLongPress={() => handleClick("current")}>
          {position}
        </Field>
      </div>
      <div className={styles.groupSection}>
        <Field label="TimeSignature" onLongPress={() => handleClick("timeSig")}>
          <TimeSignature
            beatsPerMeasure={group.beatsPerMeasure}
            subdivision={group.subdivision}
          />
        </Field>
        <Field label="Tempo" onLongPress={() => handleClick("tempo")}>
          {group.tempo}
        </Field>
      </div>
    </div>
  );
};

export default GroupInfo;
