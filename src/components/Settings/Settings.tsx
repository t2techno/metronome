import { useContext, useState } from "react";
import MenuDialog from "../MenuDialog";
import styles from "./settings.module.css";
import Select from "../Select";
import { MetronomeContext } from "../../provider/MetronomeProvider";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { beatsPerMeasure, base, updateState } =
    useContext(MetronomeContext);
  const handleOpenChange = () => {
    setIsOpen((s) => !s);
  };
  const handleBaseChange = (val: string) => {
    updateState("base", val);
  };
  const handleBeatsPerMeasureChange = (val: string) => {
    updateState("beatsPerMeasure", val);
  };
  return (
    <MenuDialog
      className={`caveat-600 ${styles.wrapper}`}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <div className={`${styles.timSigSection}`}>
        <p>TimeSignature:</p>
        <hr />
        <div className={styles.timeSigEdit}>
          <input
            value={Number.parseInt(beatsPerMeasure)}
            onChange={(e) => handleBeatsPerMeasureChange(e.target.value)}
            type="number"
            min={1}
            max={16}
            className={styles.beatsPerMeasure}
          />
          /
          <Select
            label="base"
            value={base}
            onValueChange={handleBaseChange}
            triggerClassName={styles.baseSelect}
            options={["1", "2", "4", "8", "16"]}
          />
        </div>
      </div>
    </MenuDialog>
  );
};

export default Settings;
