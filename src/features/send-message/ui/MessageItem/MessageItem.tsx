import { useProfile } from "../../../../shared/api/queries/useProfile";
import { Message } from "../../../../shared/types";
import { LinkifiedText } from "../../../../shared/ui/LinkifiedText/LinkifiedText";
import s from "./MessageItem.module.css";
import { format } from "date-fns";

type Props = {
  item: Message;
  onImageClick: (id: string) => void;
};

const MessageItem = ({ item, onImageClick }: Props) => {
  const { me } = useProfile();

  return (
    <div
      className={item.ownerId === me?.id ? `${s.message} ${s.own}` : s.message}
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
    </div>
  );
};

export default MessageItem;
