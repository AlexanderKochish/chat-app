import { PaperPlaneIcon, UploadIcon } from "../../../../shared/assets/icons";
import s from "./ChatForm.module.css";
import ReactCrop from "react-image-crop";
import CropFileModal from "../CropFileModal/CropFileModal";
import { useChatFormLogic } from "../../model/hooks/useChatFormLogic";

const ChatForm = () => {
  const {
    formProps: { handleSubmit, register, textAreaRef },
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

  return (
    <form className={s.formMessage} onSubmit={handleSubmit}>
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
      </div>

      <button className={s.sendBtn}>
        <PaperPlaneIcon width="25" height="25" />
      </button>
    </form>
  );
};

export default ChatForm;
