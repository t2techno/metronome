import { createContext, PropsWithChildren, useState } from "react";

export type GroupFields =
  | "name"
  | "start"
  | "end"
  | "tempo"
  | "beatsPerMeasure"
  | "subdivision";

export interface iBeatGroup {
  key: number;
  name: string;
  start: number;
  end: number;
  tempo: number;
  beatsPerMeasure: number;
  subdivision: number;
}

const initGroup = {
  key: 0,
  name: "A",
  start: 1,
  end: 2,
  tempo: 60,
  beatsPerMeasure: 4,
  subdivision: 4,
};

interface iContextData {
  beatGroups: Array<iBeatGroup>;
  setBeatGroups: React.Dispatch<React.SetStateAction<iBeatGroup[]>>;
  currentGroup: number;
  currentMeasure: number;
  setCurrent: (field: "group" | "beat", val: number) => void;
  reset: () => void;
}

const initContextData = {
  beatGroups: [],
  setBeatGroups: () => {},
  currentGroup: 0,
  currentMeasure: 1,
  setCurrent: () => {},
  reset: () => {},
};

export const MusicContext = createContext<iContextData>(initContextData);

const MusicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [beatGroups, setBeatGroups] = useState<Array<iBeatGroup>>([initGroup]);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentMeasure, setCurrentMeasure] = useState(0);

  const setCurrent = (field: "group" | "beat", val: number) => {
    if (field === "beat") {
      setCurrentMeasure(val);
    } else {
      setCurrentGroup(val);
    }
  };

  const updateBeatGroups = (newGroups: Array<iBeatGroup>) => {
    setBeatGroups(newGroups);
  };

  const reset = () => {
    setBeatGroups([initGroup]);
    setCurrentGroup(0);
    setCurrentMeasure(0);
  };

  const data: iContextData = {
    beatGroups,
    setBeatGroups,
    currentGroup,
    currentMeasure,
    setCurrent,
    reset,
  };
  return <MusicContext.Provider value={data}>{children}</MusicContext.Provider>;
};

export default MusicProvider;
