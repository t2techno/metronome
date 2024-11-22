import styles from "./beat.module.css";

interface iBeatProps {
  size: number;
  active: boolean;
  onClick: () => void;
}

const Beat: React.FC<iBeatProps> = ({
  active,
  onClick,
  size,
}) => {

  return (
    <button
      className={`${styles.wrapper}`}
      onClick={() => {
        onClick();
      }}
    >
      <div
        onClick={onClick}
        className={`${styles.beat} ${active && styles.active}`}
        style={{ scale: `${size}` }}
      />
    </button>
  );
};

export default Beat;
