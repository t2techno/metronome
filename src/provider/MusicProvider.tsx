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
  addBeatGroup: () => void;
  updateBeatGroups: (field: GroupFields, newVal: number) => void;
  currentGroup: number;
  currentMeasure: number;
  setCurrent: (field: "group" | "beat", val: number) => void;
  reset: () => void;
}

const initContextData = {
  beatGroups: [],
  addBeatGroup: () => {},
  updateBeatGroups: () => {},
  currentGroup: 0,
  currentMeasure: 1,
  setCurrent: () => {},
  reset: () => {},
};

export const MusicContext = createContext<iContextData>(initContextData);

const MusicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [beatGroups, setBeatGroups] = useState<Array<iBeatGroup>>([initGroup]);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentMeasure, setCurrentMeasure] = useState(1);

  const setCurrent = (field: "group" | "beat", val: number) => {
    if (field === "beat") {
      setCurrentMeasure(val);
    } else {
      setCurrentGroup(val);
    }
  };

  const updateBeatGroups = (field: GroupFields, newVal: number) => {
    console.log(field + " - " + newVal);
    const newGroups = [...beatGroups];
    switch (field) {
      case "start": {
        newGroups[currentGroup] = { ...newGroups[currentGroup], start: newVal };
        newGroups[currentGroup - 1] = {
          ...newGroups[currentGroup - 1],
          end: newVal - 1,
        };
        break;
      }

      case "end": {
        newGroups[currentGroup] = { ...newGroups[currentGroup], end: newVal };
        if (currentGroup < beatGroups.length - 1) {
          newGroups[currentGroup + 1] = {
            ...newGroups[currentGroup + 1],
            start: newVal + 1,
          };
        }
        break;
      }
    }
    setBeatGroups(newGroups);
  };

  const nextName = () => {
    const newCharCode = 65 + (beatGroups.length % 26);
    const multiple = Math.ceil(beatGroups.length / 25);
    const newName = String.fromCharCode(newCharCode).repeat(multiple);
    return newName;
  };

  const addBeatGroup = () => {
    const groups = [...beatGroups];
    const lastGroup = groups[groups.length - 1];
    // A = 65 ascii
    const newGroup: iBeatGroup = {
      ...lastGroup,
      name: nextName(),
      key: Math.random(),
      start: lastGroup.end + 1,
      end: lastGroup.end + 2,
    };
    groups.push(newGroup);
    setBeatGroups(groups);
    setCurrent("group", groups.length - 1);
  };

  const reset = () => {
    setBeatGroups([initGroup]);
    setCurrentGroup(0);
    setCurrentMeasure(0);
  };

  const data: iContextData = {
    beatGroups,
    addBeatGroup,
    updateBeatGroups,
    currentGroup,
    currentMeasure,
    setCurrent,
    reset,
  };
  return <MusicContext.Provider value={data}>{children}</MusicContext.Provider>;
};

export default MusicProvider;
