import styles from "./time-signature.module.css";

interface iTimeSigProps {
  beatsPerMeasure: number;
  base: number;
}

const TimeSignature: React.FC<iTimeSigProps> = ({
  beatsPerMeasure,
  base,
}) => {
  return (
    <div className={styles.wrapper}>
      <p>
        {beatsPerMeasure}/{base}
      </p>
    </div>
  );
};

export default TimeSignature;
