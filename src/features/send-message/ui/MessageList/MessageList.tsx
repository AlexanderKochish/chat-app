import s from "./MessageList.module.css";
import { Message } from "../../../../shared/types";
import { useProfile } from "../../../../shared/api/queries/useProfile";
import { useChatMessages } from "../../../../shared/api/queries/useChatMessages";
import { useSearchParams } from "react-router-dom";

const MessageList = () => {
  const { me } = useProfile();
  const [params] = useSearchParams();
  const roomId = params.get("chatId") as string;
  const messages = useChatMessages(roomId);

  return (
    <div className={s.chatMessagge}>
      {messages &&
        messages.map((item: Message) => (
          <div
            key={item?.id}
            className={
              item.ownerId === me?.id ? `${s.message} ${s.own}` : s.message
            }
          >
            <span>{item.text}</span>
          </div>
        ))}
    </div>
  );
};

export default MessageList;
