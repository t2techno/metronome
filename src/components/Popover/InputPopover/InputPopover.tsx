import Popover from "../Popover";
import styles from "./input-popover.module.css";

interface iPopover {
  label: string;
  value: any;
  onValueChange: (value: any) => void;
}

const InputPopover: React.FC<iPopover> = ({ label, value, onValueChange }) => {
  return (
    <Popover trigger={<p>{value}</p>}>
      <fieldset className={styles.Fieldset}>
        <label className={styles.Label}>{label}</label>
        <input
          name={`${label}-input`}
          className={styles.Input}
          type="number"
          min={1}
          max={320}
          value={value}
          onChange={(e) => {
            const newVal = e.target.valueAsNumber;
            onValueChange(!Number.isNaN(newVal) ? newVal : 1);
          }}
        />
      </fieldset>
    </Popover>
  );
};

export default InputPopover;
