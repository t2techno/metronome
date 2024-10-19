import { useCallback, useRef } from "react";
import styles from "./knob.module.css";
import KnobUi from "./KnobUi";
import * as Slider from "@radix-ui/react-slider";

export interface iOptionalKnobProps {
  controlDirection?: "horizontal" | "vertical";
  centerZero?: boolean;
  label?: string;
  valueColor?: string;
  className?: string;
}

export type KnobProps = iOptionalKnobProps & {
  value: number;
  max: number;
  min: number;
  step: number;
  onChange: (value: number) => void;
};

const Knob: React.FC<KnobProps> = ({
  value,
  step,
  onChange,
  className,
  label = "",
  controlDirection = "vertical",
  valueColor = "var(--primary-light)",
}) => {
  const oldMouseY = useRef(-1);
  const currentMouseY = useRef(-1);
  const newValRef = useRef(0);
  const oldValRef = useRef(0);

  const handlePointerUp = useCallback(() => {
    newValRef.current = 0;
    oldValRef.current = 0;
    window.removeEventListener("pointerup", handlePointerUp);
    window.removeEventListener("pointermove", handlePointerMove, true);
    currentMouseY.current = -1;
    oldMouseY.current = -1;
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    currentMouseY.current = e.clientY;
  }, []);

  const boundsCheck = (val: number) => {
    return Math.min(Math.max(val, 0.0), 1.0);
  };

  const handleValueChange = (newVal: number) => {
    if (newValRef.current == 0) {
      newValRef.current = newVal;
      oldValRef.current = value;
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointermove", handlePointerMove, true);
    }

    if ((newVal === 0 || newVal === 1) && value != 0 && value != 1) {
      // moved down
      if (currentMouseY.current < oldMouseY.current) {
        newVal = value + 2 * step;
      } else {
        newVal = value - 2 * step;
      }
    } else {
      const valDiff = newVal - newValRef.current;
      newVal = oldValRef.current + valDiff;
    }

    oldMouseY.current = currentMouseY.current;
    onChange(boundsCheck(newVal));
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <h4 className={styles.label}>{label}</h4>
      <Slider.Root
        className={styles.knobSlider}
        orientation={controlDirection}
        value={[value]}
        max={1.0}
        min={0.0}
        step={step}
        onValueChange={(value: number[]) => {
          handleValueChange(value[0]);
        }}
      >
        <KnobUi value={value / 1.0} valueColor={"orange"} />
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb aria-label="" />
      </Slider.Root>
    </div>
  );
};

export default Knob;
