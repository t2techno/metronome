import styles from "./app.module.css";
import useTimer from "./hooks/useTimer";
import useSound from "use-sound";
import MetronomePage from "./pages/metronome/MetronomePage";

function App() {
  const [play, { stop }] = useSound("/sounds/cowbellSprite.mp3", {
    sprite: {
      full: [0, 313],
      half: [314, 313],
      quarter: [627, 313],
    },
  });

  return (
    <main className={styles.wrapper}>
      <MetronomePage playSound={play}/>
    </main>
  );
}

export default App;
