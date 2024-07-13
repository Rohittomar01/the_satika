import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import "../../StyleSheets/Testimonials.css";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./Category_cards/CarouselArrowsButtons";
import StarIcon from "@mui/icons-material/Star";
import { Box, Typography,Button } from "@mui/material";

const reviews = [
  {
    id: 1,
    rating: 5,
    date: "30/06/24",
    title: "Taneira T.Nagar Chennai",
    description:
      "We had an excellent shopping experience in Pondy bazar Taneira showroom. Wide range of collection, excellent customer service...",
    reviewer: "Bharathi N.",
  },
  {
    id: 2,
    rating: 4,
    date: "01/07/24",
    title: "Another Review",
    description:
      "Great experience with a wide range of products. The staff was very friendly and helpful.",
    reviewer: "John D.",
  },
  {
    id: 2,
    rating: 4,
    date: "01/07/24",
    title: "Another Review",
    description:
      "Great experience with a wide range of products. The staff was very friendly and helpful.",
    reviewer: "John D.",
  },
  {
    id: 2,
    rating: 4,
    date: "01/07/24",
    title: "Another Review",
    description:
      "Great experience with a wide range of products. The staff was very friendly and helpful.",
    reviewer: "John D.",
  },
  {
    id: 2,
    rating: 4,
    date: "01/07/24",
    title: "Another Review",
    description:
      "Great experience with a wide range of products. The staff was very friendly and helpful.",
    reviewer: "John D.",
  },
  {
    id: 2,
    rating: 4,
    date: "01/07/24",
    title: "Another Review",
    description:
      "Great experience with a wide range of products. The staff was very friendly and helpful.",
    reviewer: "John D.",
  },
  {
    id: 2,
    rating: 4,
    date: "01/07/24",
    title: "Another Review",
    description:
      "Great experience with a wide range of products. The staff was very friendly and helpful.",
    reviewer: "John D.",
  },
  // Add more reviews as needed
];

export default function Testimonials() {
  const options = { axis: "x", dragFree: true, loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ stopOnInteraction: false, stopOnFocusIn: true,stopOnMouseEnter:true }),
   
  ]);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <StarIcon key={index} style={{ color: "#FF007F" }} />
    ));
  };

  const renderReview = () => {
    return reviews.map((review) => {
      return (
        <div className="review-card" key={review.id}>
          <div className="review-header">
            <div className="review-rating">{renderStars(review.rating)}</div>
            <div className="review-date">{review.date}</div>
          </div>
          <div className="review-content">
            <Typography variant="h6" className="review-title">
              {review.title}
            </Typography>
            <Typography variant="body2" className="review-description">
              {review.description}
            </Typography>
            <Typography variant="subtitle2" id="review-reviewer">
              {review.reviewer}
            </Typography>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="review-superContainer">
      <div className="carousel-control">
        <h1 className="review-heading">Testimonials</h1>
        <div className="control__buttonsContainer">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="review-mainContainer" ref={emblaRef}>
        <div className="review-subContainer">{renderReview()}</div>
      </div>
      <div className="view_more">
        <Button  variant="outlined">View More</Button>
      </div>
    </div>
  );
}
