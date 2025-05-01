import { useProfile } from "../../../../shared/api/queries/useProfile";
import { ChatRoomResponse } from "../../../../shared/types";
import UserCard from "../../../../shared/ui/UserCard/UserCard";
import { useChatRooms } from "../../model/useChatRooms";
import s from "./ChatRoomList.module.css";

type Props = {
  findMyChat: (id: string) => void;
  roomId: string;
};

const ChatRoomList = ({ findMyChat, roomId }: Props) => {
  const { me } = useProfile();
  const { chatRooms } = useChatRooms();
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
