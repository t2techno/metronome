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
  max,
  min,
  step,
  onChange,
  className,
  label = "",
  controlDirection = "vertical",
  valueColor = "var(--primary-light)",
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <h4 className={styles.label}>{label}</h4>
      <Slider.Root
        className={styles.knobSlider}
        orientation={controlDirection}
        value={[value]}
        max={max ?? 1.0}
        min={min ?? 0.0}
        step={step}
        onValueChange={(value: number[]) => {
          onChange(value[0]);
        }}
      >
        <KnobUi
          value={value / max}
          valueColor={"orange"}
        />
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb aria-label="" />
      </Slider.Root>
    </div>
  );
};

export default Knob;
