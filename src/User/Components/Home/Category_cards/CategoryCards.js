import React, { useState } from "react";
// import { Avatar } from "@mui/material";
import "../../../StyleSheets/CategoryCards.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Button } from "@mui/material";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowsButtons";
import { useNavigate } from "react-router-dom";

export default function CategoryCards() {
  const navigate = useNavigate();
  const options = { axis: "x", dragFree: true };
  const [isGrabbing, setIsGrabbing] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const handleMouseDown = () => {
    setIsGrabbing(true);
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
  };
  const cards = [
    {
      id: 1,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
      category_name: "Rajisthani",
      category_description:
        "This is best saree for rajisthan trends or this is bets h hsajuas ",
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
        <div
          onClick={() => navigate("/filter")}
          className="content-container"
          key={cards.id}
        >
          <div className="image-container">
            <img alt="Remy Sharp" src={cards.image} />
          </div>
          <h3 id="card-heading">{cards.category_name}</h3>
          <div className="card-content">
            <p className="card-detail">{cards.category_description}</p>
            <Button
              onClick={() => navigate("/filter")}
              variant="outlined"
              id="Explore_Button"
            >
              Explore
            </Button>
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
      <div
        onMouseDown={handleMouseDown}
        // className={
        //   isGrabbing
        //     ? "category_mainContainer_grabbing"
        //     : "category_mainContainer"
        // }
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={emblaRef}
      >
        <div className="category-subContainer">{renderCard()}</div>
      </div>
    </div>
  );
}
