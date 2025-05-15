import { useEffect, useState } from "react";
import { useChatImages } from "../../../../shared/api/queries/useChatImages";

export const useImageModal = (roomId: string) => {
  const { data: roomImages } = useChatImages(roomId);
  const [isOpen, setIsOpen] = useState(false);
  const [, setImageId] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  const handleOpenModal = (id: string) => {
    const index =
      roomImages?.findIndex((img: { id: string }) => img.id === id) || 0;
    setImageIndex(index);
    setImageId(id);
    setIsOpen(true);
  };
  const resetModal = () => {
    setIsOpen(false);
    setImageIndex(0);
    setImageId("");
  };

  useEffect(() => {
    resetModal();
  }, [roomImages?.length]);

  return {
    handleOpenModal,
    resetModal,
    isOpen,
    imageIndex,
    setImageId,
    setImageIndex,
    setIsOpen,
    roomImages,
  };
};
