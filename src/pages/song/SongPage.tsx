import { useState } from "react";
import useSound from "use-sound";

type BeatVolumes = "full" | "half" | "quarter";

const SongPage = () => {
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(6);
  const [subdivision, setSubdivision] = useState(8);
  const [tempo, setTempo] = useState(120);
  // const [beatSizes, setBeatSizes] = useState<Array<BeatVolumes>>(
  //   Array(beatsPerMeasure).fill("quarter")
  // );
  const [currentBeat, setCurrentBeat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound("/sounds/cowbellSprite.mp3", {
    sprite: {
      full: [0, 313],
      half: [314, 313],
      quarter: [627, 313],
    },
  });

  // const playBeat = (elapsed: number) => {
  //   // console.log(elapsed);
  //   setBeatSizes((beatSizes) => {
  //     play({
  //       id: beatSizes[elapsed % beatsPerMeasure],
  //     });
  //     return beatSizes;
  //   });
  //   setCurrentBeat(elapsed);
  // };

  // const msPerBeat = (60 * 1000) / (tempo * (subdivision / 4));
  // const timer = useTimer(playBeat, msPerBeat, () => {
  //   console.log("oops, error");
  // });

  // const togglePlay = () => {
  //   if (isPlaying) {
  //     setCurrentBeat(0);
  //     timer.stop();
  //   } else {
  //     timer.start();
  //   }
  //   setIsPlaying((state) => !state);
  // };

  // const updateBeatSizes = (i: number) => {
  //   const sizes = [...beatSizes];
  //   switch (sizes[i]) {
  //     case "full":
  //       sizes[i] = "half";
  //       break;
  //     case "half":
  //       sizes[i] = "quarter";
  //       break;
  //     case "quarter":
  //       sizes[i] = "full";
  //       break;
  //     default:
  //       console.warn("illegal size: " + sizes[i]);
  //   }
  //   setBeatSizes(sizes);
  // };

  // const getBeatSize = (i: number) => {
  //   switch (beatSizes[i]) {
  //     case "full":
  //       return 1;
  //     case "half":
  //       return 0.5;
  //     case "quarter":
  //       return 0.25;
  //     default:
  //       console.log("unknown value: " + beatSizes[i]);
  //       return 1;
  //   }
  // };

  return (
    <>
      {/* <button
        onClick={() => {
          togglePlay();
        }}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>
      <div className={styles.row}>
        <h2 className={styles.label}>Tempo: </h2>
        <InputPopover
          label="Tempo"
          value={tempo}
          onValueChange={(value: number) => {
            setTempo(value as number);
          }}
        />
      </div>
      <div className={styles.row}>
        <h2 className={styles.label}>Time Signature: </h2>
        <Popover
          trigger={
            <div className={styles.timeSignature}>
              <p>{beatsPerMeasure}</p>
              <hr />
              <p>{subdivision}</p>
            </div>
          }
        >
          <p>stuff</p>
        </Popover>
      </div>
      <div className={styles.grid}>
        {Array.from({ length: beatsPerMeasure }, (_, i) => (
          <Beat
            key={`Beat_${i}`}
            size={getBeatSize(i)}
            active={currentBeat % beatsPerMeasure === i}
            onClick={() => {
              updateBeatSizes(i);
            }}
          />
        ))}
      </div> */}
    </>
  );
};

export default SongPage;
