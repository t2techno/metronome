import { PropsWithChildren } from "react";
import styles from "./beat-group-field.module.css";

const BeatGroupField: React.FC<PropsWithChildren<{ label: string }>> = ({
  label,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <p>{label}</p>
      {children}
    </div>
  );
};

export default BeatGroupField;
