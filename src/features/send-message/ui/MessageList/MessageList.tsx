import s from "./MessageList.module.css";
import { Message } from "../../../../shared/types";
import { useProfile } from "../../../../shared/api/queries/useProfile";
import { useChatMessages } from "../../../../shared/api/queries/useChatMessages";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import ChatForm from "../ChatForm/ChatForm";
import { useSearchQuery } from "../../../../shared/hooks/useSearchQuery";
import { useIntersectionObserver } from "../../../../shared/hooks/useIntersectionObserver";
import { useEffect } from "react";

const MessageList = () => {
  const { me } = useProfile();
  const [params] = useSearchParams();
  const roomId = params.get("chatId") as string;
  const {
    messages,
    setMessages,
    fetchMore,
    hasMore,
    loading,
    setCursor,
    setHasMore,
  } = useChatMessages(roomId);
  const { param } = useSearchQuery("chatId");

  const { containerRef, loaderRef } = useIntersectionObserver({
    hasMore,
    loading,
    fetchMore,
  });
  useEffect(() => {
    if (!roomId) return;
    setMessages([]);
    setCursor(null);
    setHasMore(true);
  }, [roomId]);

  return (
    <div className={s.chatMessagge} ref={containerRef}>
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
      {hasMore || loading ? (
        <div ref={loaderRef} style={{ height: "10px" }}>
          Loading...
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MessageList;
