import s from "./Chat.module.css";
import ChatLayout from "../../widgets/chat-layout/ui/ChatLayout";

const Chat = () => {
  return (
    <section>
      <div className="container">
        <div className={s.chat}>
          <ChatLayout />
        </div>
      </div>
    </section>
  );
};

export default Chat;
