import { PropsWithChildren } from "react";
import styles from "./beat-group-field.module.css";

interface iFieldProps {
  label: string;
  onClick: () => void;
  // onLongClick: () => void;
}

const BeatGroupField: React.FC<PropsWithChildren<iFieldProps>> = ({
  label,
  onClick,
  children,
}) => {
  return (
    <button className={`${styles.wrapper} caveat-800`} onClick={onClick}>
      <p>{label}</p>
      {children}
    </button>
  );
};

export default BeatGroupField;
