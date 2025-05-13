import s from "./MessageList.module.css";
import { Message } from "../../../../shared/types";
import { useProfile } from "../../../../shared/api/queries/useProfile";
import { useChatMessages } from "../../../../shared/api/queries/useChatMessages";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import ChatForm from "../ChatForm/ChatForm";
import { useSearchQuery } from "../../../../shared/hooks/useSearchQuery";
import { useIntersectionObserver } from "../../../../shared/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";
import ShowImageModal from "../../../../shared/ui/ShowImagePhoto/ShowImageModal";
import {
  CloseIcon,
  DownloadIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "../../../../shared/assets/icons";
import { useQuery } from "@tanstack/react-query";
import { getAllImagesOfChat } from "../../../../shared/api";
import { Slider } from "../../../../shared/ui/Slider/Slider";
import { LinkifiedText } from "../../../../shared/ui/LinkifiedText/LinkifiedText";

const MessageList = () => {
  const { me } = useProfile();
  const [params] = useSearchParams();
  const roomId = params.get("chatId") as string;
  const [isOpen, setIsOpen] = useState(false);
  const [imageId, setImageId] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const {
    messages,
    setMessages,
    fetchMore,
    hasMore,
    loading,
    setCursor,
    setHasMore,
  } = useChatMessages(roomId);
  const { param } = useSearchQuery("chatId");

  const { containerRef, loaderRef } = useIntersectionObserver({
    hasMore,
    loading,
    fetchMore,
  });
  useEffect(() => {
    if (!roomId) return;
    setMessages([]);
    setCursor(null);
    setHasMore(true);
  }, [roomId]);

  const { data } = useQuery({
    queryKey: ["images", roomId],
    queryFn: () => getAllImagesOfChat(roomId),
    select: (res) => res?.data,
    enabled: !!roomId,
  });

  const handleDownloadImage = (url: string) => {
    const downloadUrl = url.includes("/upload/")
      ? url.replace("/upload/", "/upload/fl_attachment/")
      : url;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = downloadUrl.split("/").pop() || "image.jpg";
    link.click();
  };

  useEffect(() => {
    setIsOpen(false);
    setImageIndex(0);
    setImageId("");
  }, [messages.length]);

  return (
    <div className={s.chatMessagge} ref={containerRef}>
      {param && <ChatForm />}
      {messages &&
        messages.map((item: Message) => (
          <div
            key={item?.id}
            className={
              item.ownerId === me?.id ? `${s.message} ${s.own}` : s.message
            }
          >
            <div
              className={
                item.ownerId === me?.id
                  ? `${s.messageWrapper} ${s.own}`
                  : s.messageWrapper
              }
            >
              <span>
                <LinkifiedText text={item.text} />
              </span>

              {item.images &&
                item.images.length > 0 &&
                item.images.map(({ id, url }) => (
                  <div key={id}>
                    <img
                      src={url}
                      alt="message"
                      className={s.messageImage}
                      onClick={() => {
                        const index =
                          data?.findIndex(
                            (img: { id: string }) => img.id === id,
                          ) || 0;
                        setImageIndex(index);
                        setImageId(id);
                        setIsOpen(true);
                      }}
                    />
                  </div>
                ))}
              <span className={s.createdAt}>
                {format(new Date(item.createdAt), "hh:mm a")}
              </span>
            </div>
          </div>
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
          <ul className={s.imageSetting}>
            <li>
              <button
                className={s.btn}
                onClick={() => {
                  if (data && data[imageIndex]?.url) {
                    handleDownloadImage(data[imageIndex]?.url);
                  }
                }}
              >
                <DownloadIcon width="35" height="35" />
              </button>
            </li>
            <li>
              <button className={s.btn}>
                <ZoomInIcon width="35" height="35" />
              </button>
            </li>
            <li>
              <button className={s.btn}>
                <ZoomOutIcon width="35" height="35" />
              </button>
            </li>
            <li>
              <button
                className={s.btn}
                onClick={() => {
                  setIsOpen(false);
                  setImageIndex(0);
                  setImageId("");
                }}
              >
                <CloseIcon width="30" height="30" />
              </button>
            </li>
          </ul>
        }
      >
        <Slider slides={data || []} initialSlide={imageIndex} />
      </ShowImageModal>
    </div>
  );
};

export default MessageList;
