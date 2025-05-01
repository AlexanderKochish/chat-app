import { useNavigate } from "react-router-dom";
import s from "./ChatLayout.module.css";
import { useEffect } from "react";
import ChatForm from "../../../features/send-message/ui/ChatForm/ChatForm";
import { useJoinRoom } from "../../../features/join-room/model/useJoinRoom";
import { useProfile } from "../../../shared/api/queries/useProfile";
import ChatRoomList from "../../../features/find-rooms/ui/ChatRoomList/ChatRoomList";
import MessageList from "../../../features/send-message/ui/MessageList/MessageList";
import { useSearchQuery } from "../../../shared/hooks/useSearchQuery";

const ChatLayout = () => {
  const navigate = useNavigate();
  const { joinRoom } = useJoinRoom();
  const { me, isError } = useProfile();
  const { param, setSearchParams } = useSearchQuery("chatId");

  const findMyChat = (id: string) => {
    joinRoom(id);
    setSearchParams(id);
  };

  useEffect(() => {
    if (!me && isError) {
      navigate("/sign-in", { replace: true });
    }
  }, [isError, me, navigate]);

  return (
    <div className={s.chatContent}>
      <ChatRoomList findMyChat={findMyChat} roomId={param} />
      <div className={s.roomContent}>
        <div className={s.contentWrapper}>
          <MessageList roomId={param} />
          <ChatForm roomId={param} ownerId={me?.id} />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
