import { useForm } from "react-hook-form";
import {
  ChatLogo,
  GlassIcon,
  HamburgerMenuIcon,
  PaperPlaneIcon,
  PersonIcon,
} from "../../assets/icons";
import UserCard from "../../components/ui/UserCard/UserCard";
import s from "./Chat.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  messageSchema,
  MessageSchemaType,
} from "../../lib/schemas/chat.schema";
import { useRef, useState } from "react";
import { useAutosizeTextarea } from "../../hooks/useAutosizeTextarea";

const Chat = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<
    Array<{ id: number; senderId: string; message: string }>
  >([]);
  const { register, handleSubmit, watch, reset } = useForm<MessageSchemaType>({
    defaultValues: {
      chatMessage: "",
    },
    resolver: zodResolver(messageSchema),
  });
  const chatMessage = watch("chatMessage");
  useAutosizeTextarea(textAreaRef, chatMessage);

  const onSubmit = (data: MessageSchemaType) => {
    setMessage((prev) => [
      ...prev,
      { id: Date.now(), senderId: "miu", message: data.chatMessage },
    ]);
    reset();
  };
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
                <button className={s.btnWrapper}>
                  <GlassIcon width="25" height="25" />
                </button>
                <button className={s.btnWrapper}>
                  <HamburgerMenuIcon width="25" height="25" />
                </button>
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
                {message.map((item) => (
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
              <form className={s.formMessage} onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  className={s.textArea}
                  {...register("chatMessage")}
                  ref={(e) => {
                    register("chatMessage").ref(e);
                    textAreaRef.current = e;
                  }}
                  name="chatMessage"
                ></textarea>
                <button className={s.sendBtn}>
                  <PaperPlaneIcon width="25" height="25" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
