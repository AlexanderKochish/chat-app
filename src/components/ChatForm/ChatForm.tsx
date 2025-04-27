import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useAutosizeTextarea } from "../../hooks/useAutosizeTextarea";
import {
  messageSchema,
  MessageSchemaType,
} from "../../lib/schemas/chat.schema";
import { PaperPlaneIcon } from "../../assets/icons";
import s from "./ChatForm.module.css";

const ChatForm = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { register, handleSubmit, watch, reset } = useForm<MessageSchemaType>({
    defaultValues: {
      chatMessage: "",
    },
    resolver: zodResolver(messageSchema),
  });
  const chatMessage = watch("chatMessage");
  useAutosizeTextarea(textAreaRef, chatMessage);

  const onSubmit = (data: MessageSchemaType) => {
    console.log(data);
    reset();
  };

  return (
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
  );
};

export default ChatForm;
