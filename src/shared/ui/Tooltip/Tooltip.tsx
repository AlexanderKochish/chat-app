import { Tooltip } from "radix-ui";
import s from "./Tooltip.module.css";
import { ReactNode } from "react";

type Props = {
  trigger: ReactNode;
  children: ReactNode;
};

const TooltipCustom = ({ trigger, children }: Props) => {
  return (
    <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger asChild>
          <button className={s.iconButton}>{trigger}</button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={s.content}>
            {children}
            <Tooltip.Arrow className={s.arrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipCustom;
