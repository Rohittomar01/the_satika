import React, { useEffect, useState } from "react";
import { DotButton, useDotButton } from "./CarouselDotButtons";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./CarouselArrowsButtons";
import useEmblaCarousel from "embla-carousel-react";
import "../../../StyleSheets/Carousel/Carousel.css";
import Autoplay from "embla-carousel-autoplay";
import { getData, ServerURL } from "../../../../Services/ServerServices";
import { CircularProgress } from "@mui/material";

const Carousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const result = await getData("banner/get_banners");
      setBanners(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {banners.map((data) => (
            <div className="embla__slide" key={data.category_id}>
              <img
                style={{
                  height: "100vh",
                  width: "100vw",
                  objectFit:"fill",
                }}
                src={`${ServerURL}/images/${data.image_name}`}
                alt={`Slide ${data.category_id}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {/* <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Carousel;
