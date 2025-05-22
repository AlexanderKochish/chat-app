import s from "./MessageHeader.module.css";
import { useSearchUser } from "../../../../features/find-user/model/useSearchUser";
import {
  ArrowLeftIcon,
  BinIcon,
  GlassIcon,
  HandIcon,
  PencilIcon,
  PersonIcon,
  VerticalDotsIcon,
} from "../../../../shared/assets/icons";
import DialogModal from "../../../../shared/ui/Modal/Modal";
import Input from "../../../../shared/ui/Input/Input";
import ChatList from "../../../../features/add-chat/ui/chat-list/ChatList";
import DropdownMenuCustom from "../../../../shared/ui/DropdownMenu/DropdownMenu";
import clsx from "clsx";
import { useMatchMedia } from "../../../../shared/hooks/useMatchMedia";
import { useSearchParams } from "react-router-dom";
import { useChatCompanion } from "../../../../shared/api/queries/useChatCompanion";
import { Dispatch } from "react";

type Props = {
  setIsActive: Dispatch<React.SetStateAction<boolean>>;
};

const MessageHeader = ({ setIsActive }: Props) => {
  const [param] = useSearchParams();
  const roomId = param.get("chatId") as string;
  const { control, handleSubmit, data } = useSearchUser();
  const { isMobile } = useMatchMedia();
  const { companion } = useChatCompanion(roomId);

  return (
    <div className={s.topNavbar}>
      <div className={s.chosenUser}>
        {isMobile && (
          <button
            className={s.btnWrapper}
            onClick={() => setIsActive((isActive: boolean) => !isActive)}
          >
            <ArrowLeftIcon width="25" height="25" />
          </button>
        )}

        {companion?.user.profile.avatar ? (
          <img
            src={companion.user.profile.avatar}
            alt="avatar"
            className={s.avatar}
          />
        ) : (
          <PersonIcon width="50" height="50" />
        )}
        <span>{companion?.user.name}</span>
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
  );
};

export default MessageHeader;
