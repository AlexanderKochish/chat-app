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
import {
  getChatRoom,
  getCurrentChat,
  getMe,
  searchUserByName,
} from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import ChatList from "../../components/ChatList/ChatList";
import UserCard from "../../components/ui/UserCard/UserCard";
import { ChatRoomResponse, Message } from "../../types/types";
import { socket } from "../../socket";

const Chat = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

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

  const { data: profile, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const me = await getMe();
      return { me };
    },
  });

  const { data: myChatRooms } = useQuery({
    queryKey: ["myChatRooms"],
    queryFn: getChatRoom,
  });

  useEffect(() => {
    if (roomId) {
      getCurrentChat(roomId).then((res) => {
        setMessages(res?.data.messages);
      });
    }
  }, [roomId]);

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      if (message.roomId === roomId) {
        setMessages((prevMessages: Message[]) => [...prevMessages, message]);
      }
    };
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [roomId]);

  const findMyChat = (id: string) => {
    setRoomId(id);
    socket.emit("joinRoom", id);
  };

  useEffect(() => {
    if (!profile?.me && isError) {
      navigate("/sign-in", { replace: true });
    }
  }, [isError, profile?.me, navigate]);

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
              {myChatRooms?.data.map(
                ({ id, members, messages }: ChatRoomResponse) => (
                  <li key={id} onClick={() => findMyChat(id)}>
                    {members.map((user) => {
                      if (profile?.me?.data.id !== user.userId) {
                        return (
                          <UserCard
                            name={user.user.name}
                            avatar={user.user.profile.avatar}
                            email={String(messages[0].text)}
                            userId={user.userId}
                            key={user.userId}
                          />
                        );
                      }
                    })}
                  </li>
                ),
              )}
            </div>
            <div className={s.roomContent}>
              <div className={s.chatMessagge}>
                {messages &&
                  messages.map((item: Message) => (
                    <div
                      key={item?.id}
                      className={
                        item.ownerId === profile?.me?.data.id
                          ? `${s.message} ${s.own}`
                          : s.message
                      }
                    >
                      <span>{item.text}</span>
                    </div>
                  ))}
              </div>
              <ChatForm roomId={roomId} ownerId={profile?.me?.data.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
