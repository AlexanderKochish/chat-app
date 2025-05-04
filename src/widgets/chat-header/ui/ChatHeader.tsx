import s from "./ChatHeader.module.css";
import {
  ChatLogo,
  GlassIcon,
  HamburgerMenuIcon,
  PersonIcon,
} from "../../../shared/assets/icons";
import DialogModal from "../../../shared/ui/Modal/Modal";
import Input from "../../../shared/ui/Input/Input";
import ChatList from "../../../features/add-chat/ui/chat-list/ChatList";
import DropdownMenuCustom from "../../../shared/ui/DropdownMenu/DropdownMenu";
import { useSearchUser } from "../../../features/find-user/model/useSearchUser";
import { Profile } from "../../../features/profile/ui/Profile/Profile";

const ChatHeader = () => {
  const { control, handleSubmit, data } = useSearchUser();

  return (
    <div className={s.chatsTop}>
      <div className={s.chatsTopHeader}>
        <ChatLogo width="35" height="35" />
        <h1>Chatter</h1>
      </div>
      <div className={s.topNavbar}>
        <div className={s.chosenUser}>
          <PersonIcon width="25" height="25" />
          <span>User</span>
        </div>
        <div className={s.chatNav}>
          <DialogModal
            title="Search"
            position="25"
            trigger={
              <button className={s.btnWrapper}>
                <GlassIcon width="25" height="25" />
              </button>
            }
          >
            <>
              <form onSubmit={handleSubmit((data) => data)}>
                <Input control={control} name="search" />
              </form>
              <ChatList chatList={data} />
            </>
          </DialogModal>
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
            <button>Log out</button>
            <DialogModal position="40" trigger={<button>Profile</button>}>
              <Profile />
            </DialogModal>
          </DropdownMenuCustom>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
