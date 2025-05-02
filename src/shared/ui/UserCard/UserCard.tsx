import { PersonIcon } from "../../assets/icons";
import s from "./User.module.css";

type Props = {
  avatar: string;
  name: string;
  email: string;
  active?: boolean;
  isOnline: boolean;
};

const UserCard = ({ avatar, email, name, active, isOnline }: Props) => {
  return (
    <div className={active ? `${s.card} ${s.active}` : s.card}>
      <div className={s.img}>
        {avatar ? (
          <img src={avatar} alt={`avatar of ${name}`} />
        ) : (
          <PersonIcon width="25" height="25" />
        )}
        <div
          className={isOnline ? s.status : `${s.status} ${s.notActive}`}
        ></div>
      </div>
      <div>
        <div>{name}</div>
        <div>{email}</div>
      </div>
    </div>
  );
};

export default UserCard;
