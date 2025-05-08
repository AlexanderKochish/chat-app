import { DrawingIcon, PersonIcon } from "../../assets/icons";
import s from "./UserCard.module.css";

type Props = {
  avatar: string | null;
  name: string;
  lastMessage: string;
  active?: boolean;
  isOnline: boolean;
};

const UserCard = ({ avatar, lastMessage, name, active, isOnline }: Props) => {
  return (
    <div className={active ? `${s.card} ${s.active}` : s.card}>
      <div className={s.img}>
        {avatar ? (
          <img src={avatar} alt={`avatar of ${name}`} className={s.avatar} />
        ) : (
          <PersonIcon width="50" height="50" />
        )}
        <div
          className={isOnline ? s.status : `${s.status} ${s.notActive}`}
        ></div>
      </div>
      <div className={s.content}>
        <div>{name}</div>
        <div className={s.lastMessage}>
          <span>{lastMessage}</span>
          <div>
            <DrawingIcon width="20" height="20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
