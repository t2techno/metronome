import { createContext, PropsWithChildren, useState } from "react";

export type SubdivType = "" | "eighth" | "triplet" | "sixteenth";

type StateType = "beatsPerMeasure" | "base" | "subdiv";

export interface iMetronomeState {
  beatsPerMeasure: string;
  base: string;
  subdiv: SubdivType;
  updateState: (type: StateType, val: string) => void;
}

const initMetronomeState: iMetronomeState = {
  beatsPerMeasure: "4",
  base: "4",
  subdiv: "",
  updateState: () => {},
};

export const MetronomeContext =
  createContext<iMetronomeState>(initMetronomeState);

export const MetronomeProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [beatsPerMeasure, setBeatsPerMeasure] = useState("4");
  const [base, setBase] = useState("4");
  const [subdiv, setSubdiv] = useState<SubdivType>("");

  const updateState = (type: StateType, value: string) => {
    switch (type) {
      case "beatsPerMeasure":
        setBeatsPerMeasure(value);
        break;
      case "base":
        setBase(value);
        break;
      case "subdiv":
        setSubdiv(value as SubdivType);
        break;
      default:
        console.log("Don't know that type.");
    }
  };

  const contextValue: iMetronomeState = {
    beatsPerMeasure,
    base,
    subdiv,
    updateState,
  };

  return (
    <MetronomeContext.Provider value={contextValue}>
      {children}
    </MetronomeContext.Provider>
  );
};
