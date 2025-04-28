import { useMutation } from "@tanstack/react-query";
import { User } from "../../types/types";
import UserCard from "../ui/UserCard/UserCard";
import s from "./ChatList.module.css";
import { addNewChat } from "../../api/api";

type Props = {
  chatList: User[];
};

const ChatList = ({ chatList }: Props) => {
  const { mutate } = useMutation({
    mutationKey: ["addChat"],
    mutationFn: (userId: string) => addNewChat(userId),
  });

  return (
    <ul className={s.searchList}>
      {chatList &&
        chatList.map(({ profile, name, email }) => (
          <li key={profile.userId} onClick={() => mutate(profile.userId)}>
            <UserCard
              name={name}
              userId={profile.userId}
              email={email}
              avatar={profile.avatar}
            />
          </li>
        ))}
    </ul>
  );
};

export default ChatList;
