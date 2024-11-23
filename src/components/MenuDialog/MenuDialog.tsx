import * as BaseDialog from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";
import { Settings } from "react-feather";
import styles from "./menu-dialog.module.css";

interface iMenuDialog {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  className?: string;
}

const MenuDialog: React.FC<PropsWithChildren<iMenuDialog>> = ({
  children,
  isOpen,
  onOpenChange,
  className,
}) => {
  return (
    <BaseDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <BaseDialog.Trigger asChild>
        <button aria-label="Open navigation menu" className={styles.triggerBtn}>
          <Settings className={styles.menu} size={36} />
        </button>
      </BaseDialog.Trigger>
      <BaseDialog.Content
        className={`${styles.drawer} ${!isOpen && styles.closed} ${
          className && className
        }`}
      >
        <BaseDialog.Title className={styles.title}>Settings</BaseDialog.Title>
        {children}
        <BaseDialog.Close asChild>
          <button className={styles.closeBtn}>Close</button>
        </BaseDialog.Close>
      </BaseDialog.Content>
    </BaseDialog.Root>
  );
};

export default MenuDialog;
