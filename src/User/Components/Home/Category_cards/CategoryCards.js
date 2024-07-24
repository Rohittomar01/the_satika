import React, { useState, useEffect } from "react";
// import { Avatar } from "@mui/material";
import "../../../StyleSheets/CategoryCards.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Button } from "@mui/material";
import { getData, ServerURL } from "../../../../Services/ServerServices";
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
  const [category, setCategory] = useState([]);

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

  const fetchCategories = async () => {
    try {
      const result = await getData("category/fetch_Categories");
      setCategory(result.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  
  const renderCard = () => {
    return category.map((cards) => {
      return (
        <div
          onClick={() => navigate("/filter")}
          className="content-container"
          key={cards.id}
        >
          <div className="image-container">
            <img
              alt="Remy Sharp"
              src={`${ServerURL}/images/${cards.category_pic}`}
            />
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
