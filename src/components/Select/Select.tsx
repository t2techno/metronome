import * as SelectBase from "@radix-ui/react-select";
import { ChevronDown } from "react-feather";
import styles from "./select.module.css";

interface iSelectProps {
  label: string;
  options: Array<string>;
  triggerClassName?: string;
}

const Select: React.FC<iSelectProps> = ({
  options,
  triggerClassName,
}) => {
  return (
    <SelectBase.Root>
      <SelectBase.Trigger
        className={`${styles.trigger} ${triggerClassName && triggerClassName}`}
        aria-label="Subdivisions"
      >
        <SelectBase.Value placeholder="Subdivision" />
        <SelectBase.Icon className="SelectIcon">
          <ChevronDown />
        </SelectBase.Icon>
      </SelectBase.Trigger>
      <SelectBase.Portal>
        <SelectBase.Content position="popper" className={styles.SelectContent}>
          <SelectBase.Viewport className={styles.SelectViewport}>
            {options.map((option, idx) => (
              <SelectBase.Item key={`option_${idx}`} value={option}>
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
