import * as Slider from "@radix-ui/react-slider";
import styles from "./number-slider.module.css";
import { PropsWithChildren } from "react";

interface iNumberSliderProps {
  value: number;
  label: string;
  min: number;
  max: number;
  updateValue: (val: number) => void;
  className?: string;
}

const NumberSlider: React.FC<PropsWithChildren<iNumberSliderProps>> = ({
  value,
  label,
  min,
  max,
  updateValue,
  className,
  children,
}) => {
  return (
    <Slider.Root
      className={`${styles.wrapper} ${className}`}
      value={[value]}
      onValueChange={(vals: Array<number>) => {
        updateValue(vals[0]);
      }}
      min={min}
      max={max}
      step={1}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label={label} />
      {children}
    </Slider.Root>
  );
};

export default NumberSlider;
