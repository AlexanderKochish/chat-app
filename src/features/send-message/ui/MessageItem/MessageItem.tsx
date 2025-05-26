import clsx from "clsx";
import { useProfile } from "../../../../shared/api/queries/useProfile";
import { Message } from "../../../../shared/types";
import { LinkifiedText } from "../../../../shared/ui/LinkifiedText/LinkifiedText";
import s from "./MessageItem.module.css";
import { format } from "date-fns";
import { MouseEvent, useState } from "react";
// import DialogModal from "../../../../shared/ui/Modal/Modal";
// import Button from "../../../../shared/ui/Button/Button";
// import Input from "../../../../shared/ui/Input/Input";
import { useForm } from "react-hook-form";
import {
  editMessage,
  editMessageSchemaType,
} from "../../model/zod/editMessage.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import DropDownItem from "../../../../shared/ui/DropdownItem/DropDownItem";
import { BinIcon, PencilIcon } from "../../../../shared/assets/icons";
import { MessageDropdown } from "../../../../shared/ui/MessageDropDown/MessageDropDown";

type Props = {
  item: Message;
  onImageClick: (id: string) => void;
};

const MessageItem = ({ item, onImageClick }: Props) => {
  const { register, handleSubmit, setValue, getValues } =
    useForm<editMessageSchemaType>({
      defaultValues: {
        editMessage: "",
      },
      resolver: zodResolver(editMessage),
    });
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const { me } = useProfile();
  const handleEditMessage = (
    e: MouseEvent<HTMLDivElement>,
    messageId: string,
    owherId: string,
    text: string,
  ) => {
    e.preventDefault();
    const container = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - container.left;
    const clickY = e.clientY - container.top;

    const menuWidth = 160;
    const menuHeight = 80;
    const maxX = container.width - menuWidth;
    const maxY = clickY - menuHeight;

    setDropdownPosition({
      x: Math.min(clickX, maxX),
      y: Math.min(clickY, maxY),
    });

    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div
      onContextMenu={(e) =>
        handleEditMessage(e, item.id, item.ownerId, item.text)
      }
      className={clsx(
        s.message,
        item.ownerId === me?.id ? s.own : "",
        isOpen ? s.editMessage : "",
      )}
    >
      <div
        className={
          item.ownerId === me?.id
            ? `${s.messageWrapper} ${s.own}`
            : s.messageWrapper
        }
      >
        <span>
          <LinkifiedText text={item.text} />
        </span>

        {item.images &&
          item.images.length > 0 &&
          item.images.map(({ id, url }) => (
            <div key={id}>
              <img
                src={url}
                alt="message"
                className={s.messageImage}
                onClick={() => onImageClick(id)}
              />
            </div>
          ))}
        <span className={s.createdAt}>
          {format(new Date(item.createdAt), "hh:mm a")}
        </span>
      </div>

      <MessageDropdown
        isOpen={isOpen}
        position={dropdownPosition}
        onClose={() => setIsOpen(false)}
      >
        <DropDownItem
          icon={<PencilIcon width="15" height="15" />}
          text="Edit"
        />
        <DropDownItem
          icon={<BinIcon width="20" height="20" />}
          className="danger"
          text="Delete"
          //  onClick={() => setIsRemoveChat(true)}
        />
      </MessageDropdown>
    </div>
  );
};

export default MessageItem;

{
  /* <DialogModal position="50" isOpen={isOpen} setIsOpen={setIsOpen} title="Edit Message">
        <div className={s.edit}>
          <form onSubmit={handleSubmit(onSubmit)} className={s.editForm}>
            <textarea id="editMessage" {...register('editMessage')}  defaultValue={value}/>
          </form>
          <div className={s.editBottom}>
          <Button form="editMessage">Edit</Button>
          </div>
          </div>
      </DialogModal> */
}
