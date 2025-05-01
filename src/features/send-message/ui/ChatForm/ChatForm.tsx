import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { PaperPlaneIcon } from "../../../../shared/assets/icons";
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

  const onSubmit = (data: MessageSchemaType) => {
    const message = {
      roomId,
      ownerId,
      text: data.text,
    };

    socket.emit("sendMessage", message);
    reset();
  };

  return (
    <form className={s.formMessage} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className={s.textArea}
        {...register("text")}
        ref={(e) => {
          register("text").ref(e);
          textAreaRef.current = e;
        }}
        name="text"
      ></textarea>
      <button className={s.sendBtn}>
        <PaperPlaneIcon width="25" height="25" />
      </button>
    </form>
  );
};

export default ChatForm;
