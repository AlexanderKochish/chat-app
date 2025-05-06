import { useNavigate } from "react-router-dom";
import s from "./ChatLayout.module.css";
import { useEffect, useRef } from "react";
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
  const ref = useRef<HTMLDivElement | null>(null);

  const findMyChat = (id: string) => {
    setSearchParams(id);
  };

  useEffect(() => {
    if (param) {
      joinRoom(param);
    }
  }, [param, joinRoom]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!me.id && isError) {
      navigate("/sign-in", { replace: true });
    }
  }, [isError, me.id, navigate]);

  return (
    <div className={s.chatContent}>
      <ChatRoomList findMyChat={findMyChat} />
      <div className={s.roomContent}>
        <div className={s.contentWrapper} ref={ref}>
          <MessageList />
          {param && <ChatForm />}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
