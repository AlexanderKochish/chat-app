import { useNavigate } from "react-router-dom";
import s from "./ChatLayout.module.css";
import { useEffect, useRef, useState } from "react";
import { useJoinRoom } from "../../../features/join-room/model/useJoinRoom";
import { useProfile } from "../../../shared/api/queries/useProfile";
import ChatRoomList from "../../../features/find-rooms/ui/ChatRoomList/ChatRoomList";
import MessageList from "../../../features/send-message/ui/MessageList/MessageList";
import { useSearchQuery } from "../../../shared/hooks/useSearchQuery";
import { useMatchMedia } from "../../../shared/hooks/useMatchMedia";
import clsx from "clsx";
import MessageHeader from "../../chat-header/ui/message-header/MessageHeader";
import MainHeader from "../../chat-header/ui/main-header/MainHeader";

const ChatLayout = () => {
  const navigate = useNavigate();
  const { joinRoom } = useJoinRoom();
  const { me, isError } = useProfile();
  const { param, setSearchParams } = useSearchQuery("chatId");
  const ref = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useMatchMedia();
  const [isActive, setIsActive] = useState(false);

  const findMyChat = (id: string) => {
    setSearchParams(id);
    setIsActive((prev) => !prev);
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

    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [param]);

  useEffect(() => {
    if (!me.id && isError) {
      navigate("/sign-in", { replace: true });
    }
  }, [isError, me.id, navigate]);

  useEffect(() => {
    if (isMobile && !param) {
      setIsActive(false);
    }
  }, [isMobile, param]);

  const clazz =
    isMobile && param ? clsx(s.chatContent, s.mobile) : s.chatContent;
  const chatListClass = clsx(s.chatList, !isActive && isMobile && s.hidden);
  const roomClass = clsx(s.roomContent, isActive && isMobile && s.hidden);

  return (
    <div className={clazz}>
      <div className={chatListClass}>
        <MainHeader />
        <ChatRoomList findMyChat={findMyChat} />
      </div>

      <MessageHeader setIsActive={setIsActive} />
      <div className={roomClass} ref={ref}>
        <MessageList />
      </div>
    </div>
  );
};

export default ChatLayout;
