import { Eighth } from "./Eighth";
import { Triplet } from "./Triplet";
import { Sixteenth } from "./Sixteenth";
import { SubdivType } from "../../provider/MetronomeProvider";

// this will union other specific icon types if I make them
export type IconType = SubdivType;

interface iIconProps {
  type: IconType;
  className?: string;
}

const Icon: React.FC<iIconProps> = ({ type, className }) => {
  let icon;
  switch (type) {
    case "eighth":
      icon = <Eighth />;
      break;
    case "triplet":
      icon = <Triplet />;
      break;
    case "sixteenth":
      icon = <Sixteenth />;
      break;
    default:
      console.error("There isn't a " + type + " icon.");
  }

  return <div className={className}>{icon}</div>;
};

export default Icon;
