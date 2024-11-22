import styles from "./beat.module.css";

interface iBeatProps {
  active: boolean;
}

const Beat: React.FC<iBeatProps> = ({ active }) => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="50"
        className={`${styles.beat} ${active && styles.active}`}
      />
    </svg>
  );
};

export default Beat;
