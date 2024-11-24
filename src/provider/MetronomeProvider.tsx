import { createContext, PropsWithChildren, useState } from "react";

type StateType = "beatsPerMeasure" | "subdivision";

export interface iMetronomeState {
  beatsPerMeasure: string;
  subdivision: string;
  updateState: (type: StateType, val: string) => void;
}

const initMetronomeState: iMetronomeState = {
  beatsPerMeasure: "4",
  subdivision: "4",
  updateState: () => {},
};

export const MetronomeContext =
  createContext<iMetronomeState>(initMetronomeState);

export const MetronomeProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [beatsPerMeasure, setBeatsPerMeasure] = useState("4");
  const [subdivision, setSubdivision] = useState("4");

  const updateState = (type: StateType, value: string) => {
    switch (type) {
      case "beatsPerMeasure":
        setBeatsPerMeasure(value);
        break;
      case "subdivision":
        setSubdivision(value);
        break;
      default:
        console.log("Don't know that type.");
    }
  };

  const contextValue: iMetronomeState = {
    beatsPerMeasure,
    subdivision,
    updateState,
  };

  return (
    <MetronomeContext.Provider value={contextValue}>
      {children}
    </MetronomeContext.Provider>
  );
};
