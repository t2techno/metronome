import * as PopoverBase from "@radix-ui/react-popover";
import { XCircle } from "react-feather";
import styles from "./popover.module.css";
import { PropsWithChildren, ReactNode } from "react";

interface iPopoverProps {
  trigger: ReactNode;
}

const Popover: React.FC<PropsWithChildren<iPopoverProps>> = ({
  children,
  trigger,
}) => {
  return (
    <PopoverBase.Root>
      <PopoverBase.Trigger asChild>
        <button className={styles.TriggerButton}>{trigger}</button>
      </PopoverBase.Trigger>
      <PopoverBase.Anchor />
      <PopoverBase.Portal>
        <PopoverBase.Content className={styles.PopoverContent}>
          {children}
          <PopoverBase.Close className={styles.PopoverClose}>
            <XCircle size={24} />
          </PopoverBase.Close>
          <PopoverBase.Arrow className={styles.PopoverArrow} />
        </PopoverBase.Content>
      </PopoverBase.Portal>
    </PopoverBase.Root>
  );
};

export default Popover;
