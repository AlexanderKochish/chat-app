import s from "./Chat.module.css";
import ChatHeader from "../../widgets/chat-header/ui/ChatHeader";
import ChatLayout from "../../widgets/chat-layout/ui/ChatLayout";

const Chat = () => {
  return (
    <section>
      <div className="container">
        <div className={s.chat}>
          <ChatHeader />
          <ChatLayout />
        </div>
      </div>
    </section>
  );
};

export default Chat;
