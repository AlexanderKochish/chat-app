import { useNavigate } from "react-router-dom";
import s from "./ChatLayout.module.css";
import { useEffect, useState } from "react";
import ChatForm from "../../../features/send-message/ui/ChatForm/ChatForm";
import { useJoinRoom } from "../../../features/join-room/model/useJoinRoom";
import { useProfile } from "../../../shared/api/queries/useProfile";
import ChatRoomList from "../../../features/find-rooms/ui/ChatRoomList/ChatRoomList";
import MessageList from "../../../features/send-message/ui/MessageList/MessageList";

const ChatLayout = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const { joinRoom } = useJoinRoom();
  const { me, isError } = useProfile();

  const findMyChat = (id: string) => {
    setRoomId(id);
    joinRoom(id);
  };

  useEffect(() => {
    if (!me && isError) {
      navigate("/sign-in", { replace: true });
    }
  }, [isError, me, navigate]);

  return (
    <div className={s.chatContent}>
      <ChatRoomList findMyChat={findMyChat} />
      <div className={s.roomContent}>
        <MessageList roomId={roomId} />
        <ChatForm roomId={roomId} ownerId={me?.id} />
      </div>
    </div>
  );
};

export default ChatLayout;
