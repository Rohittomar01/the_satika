import React, { useRef } from "react";
// import { Avatar } from "@mui/material";
import "../../../StyleSheets/CategoryCards.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from 'embla-carousel-fade'

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowsButtons";

export default function CategoryCards() {
  const options = { axis: "x" ,dragFree: true};

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const cards = [
    {
      id: 1,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
      category_name: "Rajisthani",
      category_description: "This is best saree for rajisthan trends",
    },
    {
      id: 2,
      image:
        "https://cdn.pixabay.com/photo/2024/04/02/13/53/ai-generated-8670949_1280.jpg",
      category_name: "Rajisthani",
      category_description: "This is best saree for rajisthan trends",
    },
    {
      id: 3,
      image:
        "https://cdn.pixabay.com/photo/2019/04/11/17/42/beauty-4120283_1280.jpg",
      category_name: "Rajisthani",
      category_description: "This is best saree for rajisthan trends",
    },
    {
      id: 4,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
      category_name: "Rajisthani",
      category_description: "This is best saree for rajisthan trends",
    },
    {
      id: 5,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
      category_name: "Rajisthani",
      category_description: "This is best saree for rajisthan trends",
    },
    {
      id: 6,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
      category_name: "Rajisthani",
      category_description: "This is best saree for rajisthan trends",
    },
  ];
  const renderCard = () => {
    return cards.map((cards) => {
      return (
        <div className="content-container" key={cards.id}>
          <div className="image-container">
            <img alt="Remy Sharp" src={cards.image} />
          </div>
          <div className="card-content">
            <h3 className="card-heading">{cards.category_name}</h3>
            {/* <p className="card-detail">{cards.category_description}</p> */}
          </div>
        </div>
      );
    });
  };
  return (
    <div className="category-superContainer">
      <div className="carousel-control">
        <h1 className="categoryHeading">Category</h1>
        <div className="control__buttonsContainer">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="category-mainContainer" ref={emblaRef}>
        <div className="category-subContainer">{renderCard()}</div>
      </div>
    </div>
  );
}
