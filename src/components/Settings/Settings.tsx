import { useContext, useState } from "react";
import MenuDialog from "../MenuDialog";
import styles from "./settings.module.css";
import Select from "../Select";
import { MetronomeContext } from "../../provider/MetronomeProvider";
import ToggleGroup from "../ToggleGroup";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { beatsPerMeasure, base, subdiv, updateState } =
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
      <div className={`${styles.settingSection}`}>
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
      <div className={`${styles.settingSection}`}>
        <p>Subdivision:</p>
        <hr />
        <div className={styles.subdivSection}>
          <ToggleGroup
            className={styles.subdivToggleGroup}
            options={["eighth", "triplet", "sixteenth"]}
            value={subdiv}
            onValueChange={(val) => updateState("subdiv", val)}
          />
        </div>
      </div>
    </MenuDialog>
  );
};

export default Settings;
