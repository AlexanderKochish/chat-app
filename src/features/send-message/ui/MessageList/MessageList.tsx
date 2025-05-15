import s from "./MessageList.module.css";
import { Message } from "../../../../shared/types";
import ChatForm from "../ChatForm/ChatForm";
import ShowImageModal from "../../../../shared/ui/ShowImagePhoto/ShowImageModal";
import { Slider } from "../../../../shared/ui/Slider/Slider";
import ImageViewerToolbar from "../../../../shared/ui/ImageViewerToolbar/ImageViewerToolbar";
import MessageItem from "../MessageItem/MessageItem";
import { useMessageList } from "../../model/hooks/useMessageList";
import { useImageModal } from "../../model/hooks/useImageModal";

const MessageList = () => {
  const { param, containerRef, messages, hasMore, loading, loaderRef } =
    useMessageList();
  const {
    isOpen,
    setIsOpen,
    roomImages,
    imageIndex,
    handleOpenModal,
    resetModal,
  } = useImageModal(param);

  return (
    <div className={s.chatMessagge} ref={containerRef}>
      {param && <ChatForm />}
      {messages &&
        messages.map((item: Message) => (
          <MessageItem
            item={item}
            key={item.id}
            onImageClick={handleOpenModal}
          />
        ))}
      {hasMore || loading ? (
        <div ref={loaderRef} style={{ height: "10px" }}>
          Loading...
        </div>
      ) : (
        ""
      )}
      <ShowImageModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        nav={
          <ImageViewerToolbar
            imageIndex={imageIndex}
            onModalReset={resetModal}
            roomImages={roomImages || []}
          />
        }
      >
        <Slider slides={roomImages || []} initialSlide={imageIndex} />
      </ShowImageModal>
    </div>
  );
};

export default MessageList;
