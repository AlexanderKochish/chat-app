import { PersonIcon } from "../../../assets/icons";
import s from "./User.module.css";

type Props = {
  avatar: string;
  name: string;
  email: string;
  userId: string;
};

const UserCard = ({ avatar, email, name }: Props) => {
  return (
    <div className={s.card}>
      <div className={s.img}>
        {avatar ? (
          <img src={avatar} alt={`avatar of ${name}`} />
        ) : (
          <PersonIcon width="25" height="25" />
        )}
      </div>
      <div>
        <div>{name}</div>
        <div>{email}</div>
      </div>
    </div>
  );
};

export default UserCard;
