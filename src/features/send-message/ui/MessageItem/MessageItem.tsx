import clsx from "clsx";
import s from "./MessageItem.module.css";
import { useProfile } from "../../../../shared/api/queries/useProfile";
import { Message } from "../../../../shared/types";
import { LinkifiedText } from "../../../../shared/ui/LinkifiedText/LinkifiedText";
import { format } from "date-fns";
import DropDownItem from "../../../../shared/ui/DropdownItem/DropDownItem";
import { BinIcon, CopyIcon, PencilIcon } from "../../../../shared/assets/icons";
import { MessageDropdown } from "../../../../shared/ui/MessageDropDown/MessageDropdown";
import { useSendMessage } from "../../model/hooks/useSendMessage";
import { useMessageContextMenu } from "../../model/hooks/useMessageContextMenu";

type Props = {
  item: Message;
  onImageClick: (id: string) => void;
};

const MessageItem = ({ item, onImageClick }: Props) => {
  const { me } = useProfile();
  const { removeMessage } = useSendMessage();
  const {
    openMessageId,
    dropdownPosition,
    handleEditMessage,
    onCloseMenu,
    edit,
  } = useMessageContextMenu();
  const isOpen = openMessageId === item.id;
  const ownMessage = item.ownerId === me?.id ? s.own : "";
  return (
    <div
      onContextMenu={(e) => handleEditMessage(e, item.id)}
      className={clsx(s.message, ownMessage, isOpen ? s.editMessage : "")}
    >
      <div className={clsx(s.messageWrapper, ownMessage)}>
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
        <div className={s.messageInfo}>
          {item.edited && <span>edited</span>}
          <span className={s.createdAt}>
            {format(new Date(item.createdAt), "hh:mm a")}
          </span>
        </div>
      </div>
      <MessageDropdown
        isOpen={isOpen}
        position={dropdownPosition}
        onClose={onCloseMenu}
      >
        <DropDownItem
          icon={<PencilIcon />}
          text="Edit"
          onClick={() => edit(item.id, item.text)}
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
