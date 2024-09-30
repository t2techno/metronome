import { useState } from "react";
import styles from "./app.module.css";
import useTimer from "./hooks/useTimer";
import useSound from "use-sound";
import MetronomePage from "./pages/metronome/MetronomePage";


function App() {
  

  return (
    <main className={styles.wrapper}>
      <MetronomePage />
    </main>
  );
}

export default App;
