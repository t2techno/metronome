import { useState } from "react";
import MenuDialog from "../MenuDialog";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = () => {
    setIsOpen((s) => !s);
  };
  return (
    <MenuDialog isOpen={isOpen} onOpenChange={handleOpenChange}>
      Settings and stuff
    </MenuDialog>
  );
};

export default Settings;
