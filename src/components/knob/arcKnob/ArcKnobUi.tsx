import styles from "./arc-knob.module.css";
import { volumeArc } from "../knob.utilities";

interface iKnobUiProps {
  value: number;
  valueColor: string;
  centerZero: boolean;
}

const KnobUi: React.FC<iKnobUiProps> = ({ value, valueColor, centerZero }) => {
  const rotate = centerZero ? (value / 2) * 270 + 135 : value * 270;
  const arcValue = centerZero ? value / 2 : value;

  return (
    <div draggable="false">
      <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="50" stroke="white" />
        <circle
          cx="50"
          cy="100"
          r="5"
          fill="white"
          transform={`rotate(${rotate}, 75,75)`}
        />
        <path
          className={styles.svgPath}
          fill="transparent"
          stroke="black"
          strokeWidth="6px"
          d={volumeArc(75, 72, arcValue)}
          transform={centerZero ? "rotate(135, 75,75)" : undefined}
        />
        <path
          className={`${styles.svgPath} ${styles.volumeArc}`}
          fill="transparent"
          stroke={valueColor}
          strokeWidth="3px"
          d={volumeArc(75, 72, value)}
          style={{ ["--line-style" as any]: value == 0 ? "revert" : "round" }}
        />
      </svg>
    </div>
  );
};

export default KnobUi;
