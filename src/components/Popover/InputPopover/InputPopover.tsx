import { PropsWithChildren } from "react";
import Popover from "../Popover";
import styles from "./input-popover.module.css";

type InputPopoverProps = React.ComponentProps<"input"> & {
  label: string;
  isOpen: boolean;
  onClose: () => void;
  onValueChange: (value: any) => void;
};

const InputPopover: React.FC<InputPopoverProps> = ({
  isOpen,
  onClose,
  label,
  onValueChange,
  ...inputProps
}) => {
  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <fieldset className={styles.Fieldset}>
        <label className={styles.Label}>{label}</label>
        <input
          name={`${label}-input`}
          className={`${styles.Input} ${inputProps.className ?? ""}`}
          min={inputProps.min}
          max={inputProps.max}
          value={inputProps.value}
          onChange={(e) => {
            const newVal = e.target.valueAsNumber;
            onValueChange(!Number.isNaN(newVal) ? newVal : 1);
          }}
          {...inputProps}
        />
      </fieldset>
    </Popover>
  );
};

export default InputPopover;
