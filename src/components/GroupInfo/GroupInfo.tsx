import { useContext, useState } from "react";
import Field from "../GroupField";
import TimeSignature from "../TimeSignature";
import styles from "./group-info.module.css";
import InputPopover from "../Popover/InputPopover";
import {
  iBeatGroup,
  GroupFields,
  MusicContext,
} from "../../provider/MusicProvider";

type InputFields = "start" | "end" | "tempo" | "current" | "timeSig";

const GroupInfo = () => {
  const { beatGroups, setBeatGroups, currentGroup, currentMeasure } =
    useContext(MusicContext);
  const [editField, setEditField] = useState<InputFields | "">("");
  const group = beatGroups[currentGroup];

  const handleClick = (field: InputFields) => {
    if (field === editField) {
      setEditField("");
    } else {
      setEditField(field);
    }
  };

  const handleFieldChange = (field: GroupFields, newVal: number) => {
    console.log(field + " - " + newVal);
    const newGroups = [...beatGroups];
    newGroups[currentGroup] = { ...group, [field]: newVal };
    setBeatGroups(newGroups);
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
            min={currentGroup === 0 ? 1 : beatGroups[currentGroup - 1].end + 1}
            max={group.end - 1}
            value={group.start}
            onValueChange={(val) => handleFieldChange("start", val)}
          />
          {group.start}
        </Field>
        <Field label="End" onLongPress={() => handleClick("end")}>
          <InputPopover
            isOpen={editField === "end"}
            onClose={() => setEditField("")}
            label="end"
            type="number"
            min={group.start + 1}
            max={
              currentGroup === beatGroups.length - 1
                ? undefined
                : beatGroups[currentGroup + 1].start - 1
            }
            value={group.end}
            onValueChange={(val) => handleFieldChange("end", val)}
          />
          {group.end}
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
