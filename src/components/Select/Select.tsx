import * as SelectBase from "@radix-ui/react-select";
import { ChevronDown } from "react-feather";
import styles from "./select.module.css";

interface iSelectProps {
  label: string;
  options: Array<string>;
  value: string;
  onValueChange: (val: string) => void;
  triggerClassName?: string;
}

const Select: React.FC<iSelectProps> = ({
  label,
  value,
  onValueChange,
  options,
  triggerClassName,
}) => {
  return (
    <SelectBase.Root value={value} onValueChange={onValueChange}>
      <SelectBase.Trigger
        className={`${styles.trigger} ${triggerClassName && triggerClassName}`}
        aria-label={label}
      >
        <SelectBase.Value asChild>
          <p>{value}</p>
        </SelectBase.Value>
        <SelectBase.Icon>
          <ChevronDown />
        </SelectBase.Icon>
      </SelectBase.Trigger>
      <SelectBase.Portal>
        <SelectBase.Content position="popper" className={styles.SelectContent}>
          <SelectBase.Viewport className={styles.SelectViewport}>
            {options.map((option, idx) => (
              <SelectBase.Item
                key={`option_${idx}`}
                className={styles.SelectItem}
                value={option}
              >
                {option}
              </SelectBase.Item>
            ))}
          </SelectBase.Viewport>
        </SelectBase.Content>
      </SelectBase.Portal>
    </SelectBase.Root>
  );
};

export default Select;
