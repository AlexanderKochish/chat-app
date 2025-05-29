import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useChatMessages } from "../../../../shared/api/queries/useChatMessages";
import { useSearchQuery } from "../../../../shared/hooks/useSearchQuery";
import { useIntersectionObserver } from "../../../../shared/hooks/useIntersectionObserver";
import { useChatMessagesStore } from "../store/chatMessage.store";

export const useMessageList = () => {
  const [params] = useSearchParams();
  const roomId = params.get("chatId") as string;
  const { hasMore, loading, setCursor, setHasMore } = useChatMessagesStore();
  const { setMessages, fetchMore } = useChatMessages(roomId);
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

  return {
    containerRef,
    loaderRef,
    param,
  };
};
