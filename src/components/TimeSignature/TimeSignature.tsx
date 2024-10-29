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
      <p>{beatsPerMeasure}</p>
      <hr />
      <p>{subdivision}</p>
    </div>
  );
};

export default TimeSignature;
