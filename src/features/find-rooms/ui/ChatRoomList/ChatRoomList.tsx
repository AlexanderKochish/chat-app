import { useSearchParams } from "react-router-dom";
import { useProfile } from "../../../../shared/api/queries/useProfile";
import { ChatRoomResponse } from "../../../../shared/types";
import UserCard from "../../../../shared/ui/UserCard/UserCard";
import { useChatRooms } from "../../model/useChatRooms";
import s from "./ChatRoomList.module.css";

type Props = {
  findMyChat: (id: string) => void;
};

const ChatRoomList = ({ findMyChat }: Props) => {
  const { me } = useProfile();
  const { chatRooms } = useChatRooms();
  const [param] = useSearchParams();
  const roomId = param.get("chatId");

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
                  userId={user.userId}
                  key={user.userId}
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
