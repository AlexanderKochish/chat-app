import s from "./ChatLayout.module.css";
import { useEffect, useState } from "react";
import { useJoinRoom } from "../../../features/join-room/model/useJoinRoom";
import { useProfile } from "../../../shared/api/queries/useProfile";
import { useSearchQuery } from "../../../shared/hooks/useSearchQuery";
import { useMatchMedia } from "../../../shared/hooks/useMatchMedia";
import clsx from "clsx";
import MessageHeader from "../../chat-header/ui/message-header/MessageHeader";
import ChatSidebar from "../../chat-sidebar/ui/ChatSidebar";
import { useRedirectIfUnauthorized } from "../../../shared/api/queries/useRedirectIfUnauthorized";
import ChatRoom from "../../chat-room/ui/ChatRoom";

const ChatLayout = () => {
  const { joinRoom } = useJoinRoom();
  const { me, isError } = useProfile();
  const { param, setSearchParams } = useSearchQuery("chatId");

  const { isMobile } = useMatchMedia();
  const [isActive, setIsActive] = useState(false);
  useRedirectIfUnauthorized(!!me?.id, isError);

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
      <ChatSidebar chatListClass={chatListClass} findMyChat={findMyChat} />
      <MessageHeader setIsActive={setIsActive} />
      <ChatRoom roomClass={roomClass} />
    </div>
  );
};

export default ChatLayout;
