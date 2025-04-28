import {
  ChatLogo,
  GlassIcon,
  HamburgerMenuIcon,
  PersonIcon,
} from "../../assets/icons";
import s from "./Chat.module.css";
import DropdownMenuCustom from "../../components/ui/DropdownMenu/DropdownMenu";
import DialogModal from "../../components/ui/Modal/Modal";
import Input from "../../components/ui/Input/Input";
import ChatForm from "../../components/ChatForm/ChatForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, SearchShemaType } from "../../lib/schemas/chat.schema";
import { useQuery } from "@tanstack/react-query";
import { getChatRoom, getMe, searchUserByName } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import ChatList from "../../components/ChatList/ChatList";
import UserCard from "../../components/ui/UserCard/UserCard";
import { ChatRoomResponse } from "../../types/types";

const Chat = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, watch } = useForm<SearchShemaType>({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchSchema),
  });

  const search = watch("search");
  const { debounceValue } = useDebounce({ value: search, delay: 1000 });
  const { data, isError } = useQuery({
    queryKey: ["profile", debounceValue],
    queryFn: async () => {
      const me = await getMe();
      const searchName = await searchUserByName(debounceValue);

      return { me, searchName };
    },
  });

  const { data: myChat } = useQuery({
    queryKey: ["myChat"],
    queryFn: getChatRoom,
  });

  useEffect(() => {
    if (!data?.me && isError) {
      navigate("/sign-in", { replace: true });
    }
  }, [isError, data?.me, navigate]);

  return (
    <section>
      <div className="container">
        <div className={s.chat}>
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
          <div className={s.chatContent}>
            <div className={s.openedChats}>
              {myChat?.data.map(({ id, members }: ChatRoomResponse) => (
                <li key={id}>
                  <UserCard
                    name={members[1].user.name}
                    avatar={members[1].user.profile.avatar}
                    email={members[1].user.email}
                    userId={members[1].user.profile.userId}
                  />
                </li>
              ))}
            </div>
            <div className={s.roomContent}>
              <div className={s.chatMessagge}>
                {[{ id: 1, senderId: "miu", message: "" }].map((item) => (
                  <div
                    key={item?.id}
                    className={
                      item.senderId === "miu"
                        ? s.message
                        : `${s.message} ${s.own}`
                    }
                  >
                    <span>{item.message}</span>
                  </div>
                ))}
              </div>
              <ChatForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
