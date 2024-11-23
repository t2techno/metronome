import { useState } from "react";
import MenuDialog from "../MenuDialog";
import styles from "./settings.module.css";
import Select from "../Select";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = () => {
    setIsOpen((s) => !s);
  };
  return (
    <MenuDialog isOpen={isOpen} onOpenChange={handleOpenChange}>
      <div className={styles.timSigSection}>
        <p>TimeSignature:</p>
        <hr />
        <div className={styles.timeSigEdit}>
          <input
            type="number"
            min={1}
            max={16}
            className={styles.beatsPerMeasure}
          />
          /
          <Select
            label="subdivision"
            triggerClassName={styles.subdivisionSelect}
            options={["1", "2", "4", "8", "16"]}
          />
        </div>
      </div>
    </MenuDialog>
  );
};

export default Settings;
