import Field from "../GroupField";

const GroupTab = ({ name, onLongPress }: { name: string; onLongPress: () => void }) => {
  return (
    <Field label="Section" onLongPress={onLongPress}>
      {name}
    </Field>
  );
};

export default GroupTab;
