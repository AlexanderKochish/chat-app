import s from "./ImageViewerToolbar.module.css";
import {
  CloseIcon,
  DownloadIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "../../assets/icons";
import { handleDownloadImage } from "../../lib/helpers/downloadImage";
import { MessageImage } from "../../types";

type Props = {
  imageIndex: number;
  roomImages: MessageImage[];
  onModalReset: () => void;
};

const ImageViewerToolbar = ({
  imageIndex,
  roomImages,
  onModalReset,
}: Props) => {
  return (
    <ul className={s.imageSetting}>
      <li>
        <button
          className={s.btn}
          onClick={() => {
            if (roomImages && roomImages[imageIndex]?.url) {
              handleDownloadImage(roomImages[imageIndex]?.url);
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
        <button className={s.btn} onClick={onModalReset}>
          <CloseIcon width="30" height="30" />
        </button>
      </li>
    </ul>
  );
};

export default ImageViewerToolbar;
