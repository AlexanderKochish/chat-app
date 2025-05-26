import { useSocket } from "../../../../shared/socket";
import { fileToArrayBufferPayload } from "../utils/fileToArrayBuffer";
import { MessageSchemaType } from "../zod/message.schema";

export const useSendMessage = () => {
  const socket = useSocket();

  const sendMessage = async (data: MessageSchemaType) => {
    const buffers =
      data.images &&
      (await Promise.all(data.images.map(fileToArrayBufferPayload)));

    const message = {
      roomId: data.roomId,
      ownerId: data.ownerId,
      text: data.text,
      images: buffers,
    };

    socket?.emit("sendMessage", message);
  };

  const updateMessage = async (data: {
    roomId: string;
    msgId: string;
    ownerId: string;
    text: string;
  }) => {
    const updatedMessage = {
      roomId: data.roomId,
      msgId: data.msgId,
      ownerId: data.ownerId,
      text: data.text,
    };

    socket?.emit("updateMessage", updatedMessage);
  };

  return { sendMessage, updateMessage };
};
