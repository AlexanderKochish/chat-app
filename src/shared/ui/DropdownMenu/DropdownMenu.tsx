import { ReactElement } from "react";
import { DropdownMenu } from "radix-ui";
import s from "./DropdownMenu.module.css";

type Props = {
  trigger: ReactElement;
};
const DropdownMenuCustom = ({ trigger }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content} sideOffset={5}>
          <DropdownMenu.Item
            className={s.item}
            onClick={() => alert("Log Out")}
          >
            Log Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuCustom;
