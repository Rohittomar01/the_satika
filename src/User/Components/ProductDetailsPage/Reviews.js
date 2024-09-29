// src/components/ProductDetailsPage/Reviews.js

import React, { useEffect, useRef } from "react";
import { Box, Typography, Avatar, Grid, Rating } from "@mui/material";
import "../../StyleSheets/ProductDetailsPage/Reviews.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const reviewsData = [
  {
    name: "John Doe",
    avatar: "https://via.placeholder.com/40",
    rating: 4,
    date: "15-Jul-2024",
    review: "Great product! Highly recommended.",
  },
  {
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/40",
    rating: 5,
    date: "14-Jul-2024",
    review: "Absolutely love it! Will buy again.",
  },
  // Add more reviews as needed
];

const Reviews = () => {
  const reviewsRef = useRef([]);

  useGSAP(() => {
    reviewsRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            id: `review-${index + 1}`,
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
            
          },
        }
      );
    });
  }, []);

  return (
    <Box className="review-container">
      <Typography variant="h6" id="review-title">
        Customer Reviews
      </Typography>
      {reviewsData.map((review, index) => (
        <Box
          key={index}
          className="review-paper"
          ref={(el) => (reviewsRef.current[index] = el)}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                src={review.avatar}
                alt={review.name}
                className="review-avatar"
              />
            </Grid>
            <Grid item xs>
              <Box className="review-header">
                <Typography variant="subtitle1" id="review-name">
                  {review.name}
                </Typography>
                <Typography variant="body2" id="review-date">
                  {review.date}
                </Typography>
              </Box>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" id="review-text">
                {review.review}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Reviews;
