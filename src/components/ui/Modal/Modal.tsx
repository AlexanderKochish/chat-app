import { ReactElement } from "react";
import { Dialog } from "radix-ui";
import s from "./Modal.module.css";
import { CloseIcon } from "../../../assets/icons";

type Props = {
  trigger: ReactElement;
  children: ReactElement;
};

const DialogModal = ({ trigger, children }: Props) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={s.Overlay} />
      <Dialog.Content className={s.Content}>
        <Dialog.Title className={s.Title}>Search</Dialog.Title>
        <Dialog.Description className={s.Description}></Dialog.Description>
        {children}
        <Dialog.Close asChild>
          <button className={s.IconButton} aria-label="Close">
            <CloseIcon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogModal;
