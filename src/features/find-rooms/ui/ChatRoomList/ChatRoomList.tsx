import { useSearchParams } from "react-router-dom";
import { useProfile } from "../../../../shared/api/queries/useProfile";
import { ChatRoomResponse } from "../../../../shared/types";
import UserCard from "../../../../shared/ui/UserCard/UserCard";
import { useChatRooms } from "../../model/useChatRooms";
import s from "./ChatRoomList.module.css";
import { getUserOnline } from "../../../../shared/api";
import { useQuery } from "@tanstack/react-query";

type Props = {
  findMyChat: (id: string) => void;
};

const ChatRoomList = ({ findMyChat }: Props) => {
  const { me } = useProfile();
  const { chatRooms } = useChatRooms();
  const [param] = useSearchParams();
  const roomId = param.get("chatId");

  const usersIds = chatRooms
    ?.flatMap((room) => room.members)
    .filter((m) => m.userId !== me?.id)
    .map((m) => m.userId) as string[];

  const { data } = useQuery({
    queryKey: ["online", usersIds],
    queryFn: () => getUserOnline(usersIds),
    select: (res) => res?.data,
    enabled: !!usersIds?.length,
  });

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
                  avatar={user.user.profile.avatar}
                  email={String(messages[0].text)}
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
