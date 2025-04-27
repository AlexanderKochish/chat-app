import {
  ChatLogo,
  GlassIcon,
  HamburgerMenuIcon,
  PersonIcon,
} from "../../assets/icons";
import UserCard from "../../components/ui/UserCard/UserCard";
import s from "./Chat.module.css";
import DropdownMenuCustom from "../../components/ui/DropdownMenu/DropdownMenu";
import DialogModal from "../../components/ui/Modal/Modal";
import Input from "../../components/ui/Input/Input";
import ChatForm from "../../components/ChatForm/ChatForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, SearchShemaType } from "../../lib/schemas/chat.schema";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const { isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getMe,
  });
  const { control, handleSubmit } = useForm<SearchShemaType>({
    defaultValues: {
      search: "",
    },

    resolver: zodResolver(searchSchema),
  });

  const onSubmit = async (data: SearchShemaType) => {
    try {
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Something went wrong");
      }
    }
  };

  if (isError) {
    navigate("/sign-in", { replace: true });
  }

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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input control={control} name="search" />
                  </form>
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
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
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
