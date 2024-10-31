import Field from "../GroupField";

interface iGroupTabProps {
  name: string;
  start: number;
  end: number;
  onLongPress: () => void;
}

const GroupTab: React.FC<iGroupTabProps> = ({
  name,
  start,
  end,
  onLongPress,
}) => {
  return (
    <Field label="Section" onLongPress={onLongPress}>
      {`${name}: ${start} - ${end}`}
    </Field>
  );
};

export default GroupTab;
