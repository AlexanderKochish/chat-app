import s from "./ChatHeader.module.css";
import {
  BinIcon,
  ChatLogo,
  GlassIcon,
  HamburgerMenuIcon,
  HandIcon,
  LogoutIcon,
  PencilIcon,
  PersonIcon,
  ProfileIcon,
  VerticalDotsIcon,
} from "../../../shared/assets/icons";
import DialogModal from "../../../shared/ui/Modal/Modal";
import Input from "../../../shared/ui/Input/Input";
import ChatList from "../../../features/add-chat/ui/chat-list/ChatList";
import DropdownMenuCustom from "../../../shared/ui/DropdownMenu/DropdownMenu";
import { useSearchUser } from "../../../features/find-user/model/useSearchUser";
import { Profile } from "../../../features/profile/ui/Profile/Profile";
import { clsx } from "clsx";

const ChatHeader = () => {
  const { control, handleSubmit, data } = useSearchUser();

  return (
    <div className={s.chatsTop}>
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
                <VerticalDotsIcon
                  width="25"
                  height="25"
                  aria-label="Customise options"
                />
              </button>
            }
          >
            <button className={s.profileBtn}>
              <PencilIcon width="15" height="15" />
              <span>Edit</span>
            </button>
            <button className={s.profileBtn}>
              <HandIcon />
              <span>Block user</span>
            </button>
            <button className={clsx(s.profileBtn, s.delete)}>
              <BinIcon width="20" height="20" />
              <span>Delete chat</span>
            </button>
          </DropdownMenuCustom>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
