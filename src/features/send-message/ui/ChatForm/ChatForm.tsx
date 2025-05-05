import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useRef, useState } from "react";
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
import DialogModal from "../../../../shared/ui/Modal/Modal";
import ReactCrop, { PixelCrop, type Crop } from "react-image-crop";

type Props = {
  ownerId: string;
};

const ChatForm = ({ ownerId }: Props) => {
  const [param] = useSearchParams();
  const roomId = param.get("chatId");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const socket = useSocket();
  const [crop, setCrop] = useState<Crop>();
  const [imgSrc, setImgSrc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rawFile, setRawFile] = useState<File | null>(null);
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<MessageSchemaType>({
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setImgSrc(previewUrl);
    setIsOpen(true);

    setRawFile(file);
    e.target.value = "";
  };

  const onCropComplete = async () => {
    if (!completedCrop || !imgRef.current || !rawFile) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width!;
    canvas.height = completedCrop.height!;
    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x! * scaleX,
      completedCrop.y! * scaleY,
      completedCrop.width! * scaleX,
      completedCrop.height! * scaleY,
      0,
      0,
      completedCrop.width!,
      completedCrop.height!,
    );

    canvas.toBlob((blob) => {
      if (!blob) return;

      const croppedFile = new File([blob], rawFile.name, {
        type: rawFile.type,
      });

      setValue("images", [croppedFile]);
      setIsOpen(false);
    }, rawFile.type);
  };

  const onSubmit = async (data: MessageSchemaType) => {
    const buffers =
      data.images &&
      (await Promise.all(data.images.map(fileToArrayBufferPayload)));

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
        <DialogModal setIsOpen={setIsOpen} isOpen={isOpen} position="50">
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              minWidth={400}
              minHeight={200}
              circularCrop
              ruleOfThirds
            >
              <img ref={imgRef} alt="Crop me" src={imgSrc} />
            </ReactCrop>
          )}
          <div>
            <input type="text" />
            <button onClick={onCropComplete}>Send</button>
          </div>
        </DialogModal>
        <label htmlFor="images" className={s.fileLabel}>
          <UploadIcon width="30" height="30" />
        </label>
        <input
          type="file"
          id="images"
          className={s.file}
          onChange={handleFileChange}
        />
      </div>

      <button className={s.sendBtn}>
        <PaperPlaneIcon width="25" height="25" />
      </button>
    </form>
  );
};

export default ChatForm;
