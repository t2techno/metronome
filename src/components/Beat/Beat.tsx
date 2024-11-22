import styles from "./beat.module.css";

interface iBeatProps {
  active?: boolean;
  downBeat?: boolean;
}

const Beat: React.FC<iBeatProps> = ({ active, downBeat = false }) => {
  let size = downBeat ? 30 : 25;
  if (active) {
    size += size * 0.25;
  }
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r={size}
        className={`${styles.beat} ${active && styles.active}`}
      />
    </svg>
  );
};

export default Beat;
