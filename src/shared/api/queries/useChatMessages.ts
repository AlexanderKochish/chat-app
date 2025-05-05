import { useEffect, useState } from "react";
import { useSocket } from "../../socket";
import { getCurrentChat } from "../api";
import { Message } from "../../types";

export const useChatMessages = (roomId: string) => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (roomId) {
      getCurrentChat(roomId).then((res) => {
        setMessages(res?.data.messages);
      });
    }
  }, [roomId, messages.length]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      if (message.roomId === roomId) {
        setMessages((prevMessages: Message[]) => [...prevMessages, message]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [roomId, socket]);

  return messages;
};
