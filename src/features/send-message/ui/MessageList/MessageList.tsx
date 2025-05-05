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

  console.log(messages);
  return (
    <div className={s.chatMessagge}>
      {messages &&
        messages
          .slice()
          .reverse()
          .map((item: Message) => (
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

                {!!item.images?.length && (
                  <img
                    src={item?.images[0].url}
                    alt="message"
                    className={s.messageImage}
                  />
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default MessageList;
