import { PropsWithChildren } from "react";
import styles from "./group-field.module.css";
import useLongPress from "../../hooks/useLongPress";

interface iFieldProps {
  label: string;
  onLongPress: () => void;
}

const BeatGroupField: React.FC<PropsWithChildren<iFieldProps>> = ({
  label,
  onLongPress,
  children,
}) => {
  const longPress = useLongPress(onLongPress);
  return (
    <button className={`${styles.wrapper} caveat-800`} {...longPress}>
      <p>{label}</p>
      {children}
    </button>
  );
};

export default BeatGroupField;
