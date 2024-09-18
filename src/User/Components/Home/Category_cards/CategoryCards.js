import React, { useState, useEffect ,useCallback} from "react";
import "../../../StyleSheets/CategoryCards.css";
import useEmblaCarousel from "embla-carousel-react";
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
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
      console.error("Error fetching categories:", error);
    }
  };

  const checkScrollButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", checkScrollButtons);
    emblaApi.on("reInit", checkScrollButtons);
    checkScrollButtons();
  }, [emblaApi, checkScrollButtons]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCard = () => {
    const reversedCategories = [...category].reverse();
    return reversedCategories.map((cards) => (
      <div
        onClick={() =>
          navigate("/filter", { state: { category_name: cards.category_name } })
        }
        className="content-container"
        key={cards.id}
      >
        <div className="image-container">
          <img
            alt="Category"
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
    ));
  };

  return (
    <div className="category-superContainer">
      <div className="carousel-control">
        <h1 className="categoryHeading">Category</h1>
        <div className="control__buttonsContainer">
          {/* Conditionally render previous and next buttons */}
          {canScrollPrev && (
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          )}
          {canScrollNext && (
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          )}
        </div>
      </div>

      {category.length > 0 ? (
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          ref={emblaRef}
        >
          <div className="category-subContainer">{renderCard()}</div>
        </div>
      ) : (
        <div className="no-categories">
          <p>No categories available at the moment.</p>
        </div>
      )}
    </div>
  );
}
