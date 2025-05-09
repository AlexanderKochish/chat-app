import s from "./MessageList.module.css";
import { Message } from "../../../../shared/types";
import { useProfile } from "../../../../shared/api/queries/useProfile";
import { useChatMessages } from "../../../../shared/api/queries/useChatMessages";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import ChatForm from "../ChatForm/ChatForm";
import { useSearchQuery } from "../../../../shared/hooks/useSearchQuery";

const MessageList = () => {
  const { me } = useProfile();
  const [params] = useSearchParams();
  const roomId = params.get("chatId") as string;
  const messages = useChatMessages(roomId);
  const { param } = useSearchQuery("chatId");

  return (
    <div className={s.chatMessagge}>
      {param && <ChatForm />}
      {messages &&
        messages.map((item: Message) => (
          <div
            key={item?.id}
            className={
              item.ownerId === me?.id ? `${s.message} ${s.own}` : s.message
            }
          >
            <div
              className={
                item.ownerId === me?.id
                  ? `${s.messageWrapper} ${s.own}`
                  : s.messageWrapper
              }
            >
              <span>{item.text}</span>

              {item.images &&
                item.images.length > 0 &&
                item.images.map(({ id, url }) => (
                  <img
                    key={id}
                    src={url}
                    alt="message"
                    className={s.messageImage}
                  />
                ))}
              <span className={s.createdAt}>
                {format(new Date(item.createdAt), "hh:mm a")}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessageList;
