import styles from "./app.module.css";
import useTimer from "./hooks/useTimer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useSound from "use-sound";
import MetronomePage from "./pages/metronome/MetronomePage";
import TabLayout from "./pages/tab-layout";
import MusicPage from "./pages/music";
import MusicProvider from "./provider/MusicProvider";

const App = () => {
  const [play, { stop }] = useSound("/sounds/cowbellSprite.mp3", {
    sprite: {
      full: [0, 313],
      half: [314, 313],
      quarter: [627, 313],
    },
  });

  return (
    <main className={styles.wrapper}>
      <MetronomePage playSound={play} />
      {/* <BrowserRouter>
        <MusicProvider>
          <Routes>
            <Route path="/" element={<TabLayout />}>
              <Route index element={<MetronomePage playSound={play} />} />
              <Route path="/music" element={<MusicPage />} />
            </Route>
          </Routes>
        </MusicProvider>
      </BrowserRouter> */}
    </main>
  );
};

export default App;
