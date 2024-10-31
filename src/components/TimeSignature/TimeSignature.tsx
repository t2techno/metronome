import styles from "./time-signature.module.css";

interface iTimeSigProps {
  beatsPerMeasure: number;
  subdivision: number;
}

const TimeSignature: React.FC<iTimeSigProps> = ({
  beatsPerMeasure,
  subdivision,
}) => {
  return (
    <div className={styles.wrapper}>
      <p>
        {beatsPerMeasure}/{subdivision}
      </p>
    </div>
  );
};

export default TimeSignature;
