import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { PaperPlaneIcon, UploadIcon } from "../../../../shared/assets/icons";
import s from "./ChatForm.module.css";
import { useAutosizeTextarea } from "../../../../shared/hooks/useAutosizeTextarea";
import {
  messageSchema,
  MessageSchemaType,
} from "../../model/zod/message.schema";
import { useSocket } from "../../../../shared/socket";
import { useSearchParams } from "react-router-dom";

type Props = {
  ownerId: string;
};

const ChatForm = ({ ownerId }: Props) => {
  const [param] = useSearchParams();
  const roomId = param.get("chatId");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const socket = useSocket();
  const { register, handleSubmit, watch, reset } = useForm<MessageSchemaType>({
    defaultValues: {
      text: "",
      roomId: "",
      ownerId: "",
    },
    resolver: zodResolver(messageSchema),
  });
  const textMessage = watch("text");
  useAutosizeTextarea(textAreaRef, textMessage);

  const fileToArrayBufferPayload = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    return {
      name: file.name,
      type: file.type,
      buffer: Array.from(new Uint8Array(arrayBuffer)),
    };
  };

  const onSubmit = async (data: MessageSchemaType) => {
    const files = fileRef.current?.files;

    const buffers =
      files &&
      (await Promise.all(Array.from(files).map(fileToArrayBufferPayload)));

    const message = {
      roomId,
      ownerId,
      text: data.text,
      images: buffers,
    };

    socket?.emit("sendMessage", message);
    reset();
  };

  return (
    <form className={s.formMessage} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.formInner}>
        <textarea
          className={s.textArea}
          {...register("text")}
          ref={(e) => {
            register("text").ref(e);
            textAreaRef.current = e;
          }}
          name="text"
        ></textarea>
        <label htmlFor="images" className={s.fileLabel}>
          <UploadIcon width="30" height="30" />
        </label>
        <input
          {...register("images")}
          type="file"
          id="images"
          className={s.file}
          ref={fileRef}
        />
      </div>
      <button className={s.sendBtn}>
        <PaperPlaneIcon width="25" height="25" />
      </button>
    </form>
  );
};

export default ChatForm;
