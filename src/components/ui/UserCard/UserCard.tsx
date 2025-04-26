import { PersonIcon } from "../../../assets/icons";
import s from "./User.module.css";

const UserCard = () => {
  return (
    <div className={s.card}>
      <div className={s.img}>
        <PersonIcon width="25" height="25" />
      </div>
      <div>
        <div>John Week</div>
        <div>Some message..</div>
      </div>
    </div>
  );
};

export default UserCard;
