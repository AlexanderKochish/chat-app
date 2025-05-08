import { ReactElement, ReactNode } from "react";
import { DropdownMenu } from "radix-ui";
import s from "./DropdownMenu.module.css";

type Props = {
  trigger: ReactElement;
  children: ReactNode;
};
const DropdownMenuCustom = ({ trigger, children }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content} sideOffset={5}>
          <DropdownMenu.Arrow className={s.arrow} />
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuCustom;
