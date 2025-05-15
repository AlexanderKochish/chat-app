import * as Popover from "@radix-ui/react-popover";
import { ReactNode, useRef, useState } from "react";
import s from "./PopoverCustom.module.css";

type Props = {
  trigger: ReactNode;
  children: ReactNode;
};

const PopoverCustom = ({ trigger, children }: Props) => {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={s.iconWrapper}
        >
          <button className={s.iconButton}>{trigger}</button>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={s.popoverContent}
          sideOffset={8}
        >
          {children}
          <Popover.Arrow className={s.arrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverCustom;
