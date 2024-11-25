import * as ToggleGroupBase from "@radix-ui/react-toggle-group";
import styles from "./toggle-group.module.css";
import Icon, { IconType } from "../Icons";

interface iToggleGroupProps {
  options: Array<IconType>;
  value: string;
  onValueChange: (val: string) => void;
  className?: string;
}

const ToggleGroup: React.FC<iToggleGroupProps> = ({
  options,
  value,
  onValueChange,
  className,
}) => {
  return (
    <ToggleGroupBase.Root
      className={`${styles.Group} ${className && className}`}
      type="single"
      value={value}
      onValueChange={onValueChange}
      aria-label="Beat Subdivision"
    >
      {options.map((option) => (
        <ToggleGroupBase.Item
          className={styles.Item}
          value={option}
          aria-label={`${option} subdivision`}
        >
          <Icon type={option} />
        </ToggleGroupBase.Item>
      ))}
    </ToggleGroupBase.Root>
  );
};

export default ToggleGroup;
