import MainHeader from "../../chat-header/ui/main-header/MainHeader";
import ChatRoomList from "../../../features/find-rooms/ui/ChatRoomList/ChatRoomList";

type Props = {
  chatListClass: string;
  findMyChat: (id: string) => void;
};
const ChatSidebar = ({ chatListClass, findMyChat }: Props) => {
  return (
    <div className={chatListClass}>
      <MainHeader />
      <ChatRoomList findMyChat={findMyChat} />
    </div>
  );
};

export default ChatSidebar;
