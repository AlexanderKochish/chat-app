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
import { useForm } from "react-hook-form";
import {
  searchSchema,
  SearchShemaType,
} from "../../../features/find-user/model/zod/find-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { searchUserByName } from "../../../shared/api";
import { useQuery } from "@tanstack/react-query";

const ChatHeader = () => {
  const { control, handleSubmit, watch } = useForm<SearchShemaType>({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchSchema),
  });

  const search = watch("search");

  const { debounceValue } = useDebounce({ value: search, delay: 1000 });
  const { data } = useQuery({
    queryKey: ["users", debounceValue],
    queryFn: async () => {
      const searchName = await searchUserByName(debounceValue);
      return { searchName };
    },
    enabled: !!debounceValue,
  });
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
              <ChatList chatList={data?.searchName?.data} />
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
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
