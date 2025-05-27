import clsx from "clsx";
import { useProfile } from "../../../../shared/api/queries/useProfile";
import { Message } from "../../../../shared/types";
import { LinkifiedText } from "../../../../shared/ui/LinkifiedText/LinkifiedText";
import s from "./MessageItem.module.css";
import { format } from "date-fns";
import { MouseEvent, useState } from "react";
import DropDownItem from "../../../../shared/ui/DropdownItem/DropDownItem";
import { BinIcon, CopyIcon, PencilIcon } from "../../../../shared/assets/icons";
import { useEditMessage } from "../../model/store/editMessage.store";
import { MessageDropdown } from "../../../../shared/ui/MessageDropDown/MessageDropdown";
import { useSendMessage } from "../../model/hooks/useSendMessage";

type Props = {
  item: Message;
  onImageClick: (id: string) => void;
};

const MessageItem = ({ item, onImageClick }: Props) => {
  const { removeMessage } = useSendMessage();
  const { openMessageId, setOpenMessageId, setEditMessageId, setEditText } =
    useEditMessage();
  const isOpen = openMessageId === item.id;

  const [dropdownPosition, setDropdownPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const { me } = useProfile();
  const handleEditMessage = (
    e: MouseEvent<HTMLDivElement>,
    messageId: string,
  ) => {
    e.preventDefault();
    const container = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - container.left;
    const clickY = e.clientY - container.top;

    const menuWidth = 160;
    const menuHeight = 120;
    const maxX = container.width - menuWidth;
    const maxY = clickY - menuHeight;

    setDropdownPosition({
      x: Math.min(clickX, maxX),
      y: Math.min(clickY, maxY),
    });

    setOpenMessageId(messageId);
  };

  return (
    <div
      onContextMenu={(e) => handleEditMessage(e, item.id)}
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
        onClose={() => setOpenMessageId(null)}
      >
        <DropDownItem
          icon={<PencilIcon width="15" height="15" />}
          text="Edit"
          onClick={() => {
            setEditMessageId(openMessageId);
            setEditText(item.text);
            setOpenMessageId(null);
          }}
        />
        <DropDownItem icon={<CopyIcon />} text="Copy" />
        <DropDownItem
          icon={<BinIcon width="20" height="20" />}
          className="danger"
          text="Delete"
          onClick={() =>
            removeMessage({
              roomId: item.roomId,
              msgId: item.id,
              ownerId: item.ownerId,
            })
          }
        />
      </MessageDropdown>
    </div>
  );
};

export default MessageItem;
