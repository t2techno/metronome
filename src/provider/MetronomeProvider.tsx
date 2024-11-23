import { createContext, PropsWithChildren } from "react";

export const MetronomeContext = createContext(null);

export interface iMetronomeState {
  beatsPerMeasure: string;
  subdivision: string;
  
}

export const MetronomeProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <MetronomeContext.Provider value={null}>
      {children}
    </MetronomeContext.Provider>
  );
};
