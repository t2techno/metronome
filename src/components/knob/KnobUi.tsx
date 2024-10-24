import { useMemo } from "react";
import { arcLocation } from "./knob.utilities";
import styles from "./knob-ui.module.css";

interface iKnobUiProps {
  value: number;
  valueColor: string;
}

interface iLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const viewBoxSize = 150;
const circleSize = viewBoxSize / 3;
const center = 75;
const numTicks = 80;

const KnobUi: React.FC<iKnobUiProps> = ({ value, valueColor }) => {
  // Value indicator
  const rotate = value * 270;
  const [markX2, markY2] = arcLocation(center, 65, value);
  const xSlope = markX2 - center;
  const ySlope = markY2 - center;
  const markX1 = markX2 - xSlope / 6;
  const markY1 = markY2 - ySlope / 6;

  const ticks: Array<iLine> = useMemo(() => {
    const tickArray = [];
    for (let i = 0; i < numTicks + 1; i += 1) {
      const [x2, y2] = arcLocation(center, 65, i / numTicks);
      const xSlope = x2 - center;
      const ySlope = y2 - center;
      const x1 = x2 - xSlope / 10;
      const y1 = y2 - ySlope / 10;
      tickArray.push({ x1, y1, x2, y2 });
    }
    return tickArray;
  }, []);

  return (
    <div draggable="false">
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="knobTexture"
            x="150"
            y="150"
            patternUnits="userSpaceOnUse"
            height={viewBoxSize}
            width={viewBoxSize}
          >
            <image x="0" y="0" xlinkHref="/knobTexture.jpg"></image>
          </pattern>
        </defs>
        <circle
          fill="url(#knobTexture)"
          cx={center}
          cy={center}
          r={circleSize}
          stroke="white"
        />
        <circle
          className={styles.knobHandle}
          cx="50"
          cy="100"
          r="5"
          fill="white"
          transform={`rotate(${rotate}, ${center}, ${center})`}
        />
        {ticks.map((tick) => (
          <line
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="#555"
          />
        ))}
        <line
          x1={markX1}
          y1={markY1}
          x2={markX2}
          y2={markY2}
          stroke={valueColor}
          strokeWidth={2}
        />
      </svg>
    </div>
  );
};

export default KnobUi;
