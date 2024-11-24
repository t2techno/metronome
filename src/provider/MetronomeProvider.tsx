import { createContext, PropsWithChildren, useState } from "react";

type StateType = "beatsPerMeasure" | "base";

export interface iMetronomeState {
  beatsPerMeasure: string;
  base: string;
  updateState: (type: StateType, val: string) => void;
}

const initMetronomeState: iMetronomeState = {
  beatsPerMeasure: "4",
  base: "4",
  updateState: () => {},
};

export const MetronomeContext =
  createContext<iMetronomeState>(initMetronomeState);

export const MetronomeProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [beatsPerMeasure, setBeatsPerMeasure] = useState("4");
  const [base, setBase] = useState("4");

  const updateState = (type: StateType, value: string) => {
    switch (type) {
      case "beatsPerMeasure":
        setBeatsPerMeasure(value);
        break;
      case "base":
        setBase(value);
        break;
      default:
        console.log("Don't know that type.");
    }
  };

  const contextValue: iMetronomeState = {
    beatsPerMeasure,
    base,
    updateState,
  };

  return (
    <MetronomeContext.Provider value={contextValue}>
      {children}
    </MetronomeContext.Provider>
  );
};
