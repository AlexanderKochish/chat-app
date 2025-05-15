import {
  EmojiIcon,
  PaperPlaneIcon,
  UploadIcon,
} from "../../../../shared/assets/icons";
import s from "./ChatForm.module.css";
import ReactCrop from "react-image-crop";
import CropFileModal from "../CropFileModal/CropFileModal";
import { useChatFormLogic } from "../../model/hooks/useChatFormLogic";
import EmojiPicker from "emoji-picker-react";
import PopoverCustom from "../../../../shared/ui/Popover/PopoverCustom";
import { EmojiClickData, Theme } from "emoji-picker-react";

const ChatForm = () => {
  const {
    formProps: { handleSubmit, register, textAreaRef, setValue, watch },
    cropProps: {
      crop,
      imgSrc,
      isOpen,
      onCropComplete,
      setCompletedCrop,
      setCrop,
      setIsOpen,
      imgRef,
    },
    fileInputProps: { handleFileChange },
  } = useChatFormLogic();

  const text = watch("text");
  const handleEmojiClick = (data: EmojiClickData) => {
    const newValue = text + data.emoji;
    setValue("text", newValue);
  };

  return (
    <div className={s.formWrapper}>
      <form
        id="sendMessageForm"
        className={s.formMessage}
        onSubmit={handleSubmit}
      >
        <PopoverCustom trigger={<EmojiIcon width="30" height="30" />}>
          <EmojiPicker
            searchDisabled
            lazyLoadEmojis
            theme={Theme.AUTO}
            onEmojiClick={handleEmojiClick}
          />
        </PopoverCustom>
        <textarea
          className={s.textArea}
          {...register("text")}
          name="text"
          ref={(e) => {
            register("text").ref(e);
            textAreaRef.current = e;
          }}
          placeholder="Message"
        />
        <CropFileModal setIsOpen={setIsOpen} isOpen={isOpen} position="50">
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
        </CropFileModal>
        <label htmlFor="images" className={s.fileLabel}>
          <UploadIcon width="30" height="30" />
        </label>
        <input
          type="file"
          id="images"
          className={s.file}
          onChange={handleFileChange}
        />
      </form>
      <button form="sendMessageForm" className={s.sendBtn}>
        <PaperPlaneIcon width="25" height="25" />
      </button>
    </div>
  );
};

export default ChatForm;
