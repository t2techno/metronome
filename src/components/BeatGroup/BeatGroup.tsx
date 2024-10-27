import styles from "./beat-group.module.css";
const BeatGroup = () => {
  return (
    <div className={styles.wrapper}>
      <p>Time Signature</p>
      <p>Tempo</p>
      <p>Current Measure</p>
      <p>Current Beat</p>
    </div>
  );
};

export default BeatGroup;
