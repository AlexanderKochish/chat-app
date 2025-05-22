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
import { useState } from "react";
import Button from "../../../../shared/ui/Button/Button";
import { useLogout } from "../../../../features/auth/model/hooks/useLogout";

const MainHeader = () => {
  const [isLogout, setIsLogout] = useState(false)
  const [isProfile, setIsProfile] = useState(false)

  const {mutate} = useLogout()

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
        <button className={s.profileBtn} onClick={() => setIsLogout(true)}>
          <LogoutIcon />
          <span>Log out</span>
        </button>

         <button className={s.profileBtn} onClick={() => setIsProfile(true)}>
              <ProfileIcon />
              <span>Profile</span>
            </button>
       
      </DropdownMenuCustom>
      <ChatLogo width="35" height="35" />
      <h1>Chatter</h1>
       <DialogModal
          position="40"
         isOpen={isProfile}
         setIsOpen={setIsProfile}
        >
          <Profile />
        </DialogModal>
      <DialogModal isOpen={isLogout} setIsOpen={setIsLogout} position="50">
        <div className={s.logoutContent}>
        
          <span>Are you sure you want to leave the chat?</span>
      
          <div className={s.logoutBtns}>
            <Button onClick={() => setIsLogout(false)}>No</Button>
            <Button color={'danger'} size="large" onClick={() => mutate()}>Yes</Button>
          </div>
        </div>
      </DialogModal>
    </div>
  );
};

export default MainHeader;
