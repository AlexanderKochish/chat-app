import {
  ChatLogo,
  HamburgerMenuIcon,
  LogoutIcon,
  ProfileIcon,
} from "../../../../shared/assets/icons";
import DropdownMenuCustom from "../../../../shared/ui/DropdownMenu/DropdownMenu";
import DialogModal from "../../../../shared/ui/Modal/Modal";
import { Profile } from "../../../../features/profile/ui/Profile/Profile";
import s from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <div className={s.chatsTopHeader}>
      <DropdownMenuCustom
        trigger={
          <button className={s.btnWrapper}>
            <HamburgerMenuIcon
              width="25"
              height="25"
              aria-label="Customise options"
            />
          </button>
        }
      >
        <button className={s.profileBtn}>
          <LogoutIcon />
          <span>Log out</span>
        </button>
        <DialogModal
          position="40"
          trigger={
            <button className={s.profileBtn}>
              <ProfileIcon />
              <span>Profile</span>
            </button>
          }
        >
          <Profile />
        </DialogModal>
      </DropdownMenuCustom>
      <ChatLogo width="35" height="35" />
      <h1>Chatter</h1>
    </div>
  );
};

export default MainHeader;
