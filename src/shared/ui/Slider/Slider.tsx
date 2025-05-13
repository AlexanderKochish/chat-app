import clsx from "clsx";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import s from "./Slider.module.css";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";

type Props = {
  slides: Array<{ id: string; url: string; messageId: string }>;
  className?: string;
  initialSlide?: number;
};

export const Slider = ({ slides, className = "", initialSlide }: Props) => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: initialSlide,
  });

  console.log(initialSlide);
  return (
    <div
      ref={sliderRef}
      className={clsx("keen-slider", s.sliderWrapper, className)}
    >
      {slides &&
        slides.map(({ url, id }) => (
          <div key={id} className="keen-slider__slide">
            <div className={s.imageWrapper}>
              <img className={s.img} src={url} alt="chat image" />
            </div>
          </div>
        ))}

      <button
        className={clsx(s.arrow, s.left)}
        aria-label="Previous Slide"
        onClick={() => slider.current?.prev()}
      >
        <ChevronLeftIcon width="50" height="50" />
      </button>
      <button
        className={clsx(s.arrow, s.right)}
        aria-label="Next Slide"
        onClick={() => slider.current?.next()}
      >
        <ChevronRightIcon width="50" height="50" />
      </button>
    </div>
  );
};
