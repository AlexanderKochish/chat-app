import { useSearchParams } from "react-router-dom";
import { ChatRoomResponse } from "@shared/types";
import UserCard from "@shared/ui/UserCard/UserCard";
import { useChatRooms } from "../../model/hooks/useChatRooms";
import s from "./ChatRoomList.module.css";
import { useUserOnline } from "../../model/hooks/useUserOnline";
import { useChatLayoutLogic } from "@/features/chat-layout/model/hooks/useChatLayoutLogic";

const ChatRoomList = () => {
  const { findMyChat, me } = useChatLayoutLogic();
  const { chatRooms } = useChatRooms();
  const [param] = useSearchParams();
  const roomId = param.get("chatId");

  const usersIds = chatRooms
    ?.flatMap((room) => room.members)
    .filter((m) => m.userId !== me?.id)
    .map((m) => m.userId) as string[];

  const { data } = useUserOnline(usersIds);

  return (
    <div className={s.openedChats}>
      {chatRooms?.map(({ id, members, messages }: ChatRoomResponse) => (
        <li key={id} onClick={() => findMyChat(id)}>
          {members.map((user) => {
            if (me?.id !== user.userId) {
              return (
                <UserCard
                  active={id === roomId}
                  name={user.user.name}
                  avatar={user.user.profile.avatar as string}
                  lastMessage={String(messages[0].text)}
                  key={user.userId}
                  isOnline={Boolean(data?.[user.userId])}
                />
              );
            }
          })}
        </li>
      ))}
    </div>
  );
};

export default ChatRoomList;
