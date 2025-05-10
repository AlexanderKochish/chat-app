import { useEffect, useState } from "react";
import { useSocket } from "../../socket";
import { getCurrentChat } from "../api";
import { Message } from "../../types";

export const useChatMessages = (roomId: string) => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  const fetchMore = async () => {
    if (loading || !roomId || !hasMore) return;

    setLoading(true);
    try {
      const res = await getCurrentChat(roomId, cursor ?? undefined);
      const newMessages = res?.messages || [];

      setMessages((prev) => {
        const existingIds = new Set(prev.map((msg) => msg.id));
        const newUnique = newMessages.filter(
          (msg: Message) => !existingIds.has(msg.id),
        );
        return [...prev, ...newUnique];
      });

      const last = newMessages[newMessages.length - 1];
      setCursor(last?.id ?? null);

      setHasMore(Boolean(res?.hasMore));
    } catch (err) {
      console.error("Error fetching messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roomId) {
      getCurrentChat(roomId).then((res) => {
        setMessages(res?.messages);
      });
    }
  }, [roomId]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      if (message.roomId === roomId) {
        setMessages((prevMessages: Message[]) => [message, ...prevMessages]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [roomId, socket]);

  return {
    messages,
    setMessages,
    fetchMore,
    loading,
    hasMore,
    setCursor,
    setHasMore,
  };
};
