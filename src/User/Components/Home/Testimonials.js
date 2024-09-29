import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./Category_cards/CarouselArrowsButtons";
import StarIcon from "@mui/icons-material/Star";
import { Typography, Button } from "@mui/material";
import { getData } from "../../../Services/ServerServices";
import "../../StyleSheets/Testimonials.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const options = { axis: "x", dragFree: true, loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      stopOnInteraction: false,
      stopOnFocusIn: true,
      stopOnMouseEnter: true,
    }),
  ]);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const fetchReviews = async () => {
    try {
      const result = await getData("reviews/fetch_all_reviews"); // Update the endpoint as needed

      const filteredReviews = result.data.filter(
        (review) => review.rating >= 3 && review.rating <= 5
      );
      setReviews(filteredReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Use GSAP to animate review cards
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".review-superContainer",
        start: "top 80%",
        end: "bottom",
        toggleActions: "restart reverse restart reverse",
        fastScrollEnd: true,
      },
    });

    tl.from(".review-card", {
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
    });

    tl.from(
      ".review-card .review-content,.review-rating",
      {
        x: () => gsap.utils.random(-100, 200),
        y: () => gsap.utils.random(-100, 200),
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
      },
      "-=0.6"
    );
  }, [reviews]);

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <StarIcon key={index} style={{ color: "#FF007F" }} />
    ));
  };

  const renderReview = () => {
    return reviews.map((review) => (
      <div className="review-card" key={review.review_id}>
        <div className="review-header">
          <div className="review-rating">{renderStars(review.rating)}</div>
          <div className="review-date">
            {new Date(review.created_at).toLocaleDateString()}
          </div>
        </div>
        <div className="review-content">
          <Typography variant="h6" id="review-title">
            {review.title}
          </Typography>
          <Typography variant="body2" id="review-description">
            {review.comment}
          </Typography>
          <Typography variant="subtitle2" id="review-reviewer">
            {review.user_id}
          </Typography>
        </div>
      </div>
    ));
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
    </div>
  );
}
