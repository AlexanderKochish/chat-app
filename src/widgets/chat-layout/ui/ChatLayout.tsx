import { useNavigate } from "react-router-dom";
import s from "./ChatLayout.module.css";
import { useEffect, useState } from "react";
import { useSocket } from "../../../shared/socket";
import { useQuery } from "@tanstack/react-query";
import { getChatRoom, getCurrentChat, getMe } from "../../../shared/api";
import { ChatRoomResponse, Message } from "../../../shared/types";
import UserCard from "../../../shared/ui/UserCard/UserCard";
import ChatForm from "../../../features/send-message/ui/ChatForm/ChatForm";
import { useJoinRoom } from "../../../features/join-room/model/useJoinRoom";

const ChatLayout = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const { joinRoom } = useJoinRoom();
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();

  const { data: profile, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const me = await getMe();
      return { me };
    },
  });

  const { data: myChatRooms } = useQuery({
    queryKey: ["myChatRooms"],
    queryFn: getChatRoom,
  });

  useEffect(() => {
    if (roomId) {
      getCurrentChat(roomId).then((res) => {
        setMessages(res?.data.messages);
      });
    }
  }, [roomId]);

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      if (message.roomId === roomId) {
        setMessages((prevMessages: Message[]) => [...prevMessages, message]);
      }
    };
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, roomId]);

  const findMyChat = (id: string) => {
    setRoomId(id);
    joinRoom(id);
  };

  useEffect(() => {
    if (!profile?.me && isError) {
      navigate("/sign-in", { replace: true });
    }
  }, [isError, profile?.me, navigate]);

  return (
    <div className={s.chatContent}>
      <div className={s.openedChats}>
        {myChatRooms?.data.map(
          ({ id, members, messages }: ChatRoomResponse) => (
            <li key={id} onClick={() => findMyChat(id)}>
              {members.map((user) => {
                if (profile?.me?.data.id !== user.userId) {
                  return (
                    <UserCard
                      name={user.user.name}
                      avatar={user.user.profile.avatar}
                      email={String(messages[0].text)}
                      userId={user.userId}
                      key={user.userId}
                    />
                  );
                }
              })}
            </li>
          ),
        )}
      </div>
      <div className={s.roomContent}>
        <div className={s.chatMessagge}>
          {messages &&
            messages.map((item: Message) => (
              <div
                key={item?.id}
                className={
                  item.ownerId === profile?.me?.data.id
                    ? `${s.message} ${s.own}`
                    : s.message
                }
              >
                <span>{item.text}</span>
              </div>
            ))}
        </div>
        <ChatForm roomId={roomId} ownerId={profile?.me?.data.id} />
      </div>
    </div>
  );
};

export default ChatLayout;
