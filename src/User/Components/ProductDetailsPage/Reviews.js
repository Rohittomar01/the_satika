import React from 'react';
import { Box, Typography, Avatar, Grid, Paper, Rating } from '@mui/material';
import '../../StyleSheets/ProductDetailsPage/Reviews.css';

const reviews = [
  {
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/40',
    rating: 4,
    date: '15-Jul-2024',
    review: 'Great product! Highly recommended.',
  },
  {
    name: 'Jane Smith',
    avatar: 'https://via.placeholder.com/40',
    rating: 5,
    date: '14-Jul-2024',
    review: 'Absolutely love it! Will buy again.',
  },
  // Add more reviews here
];

const Reviews = () => {
  return (
    <Box className="review-container">
      <Typography variant="h6" id="review-title">Customer Reviews</Typography>
      {reviews.map((review, index) => (
        <Box key={index} className="review-paper">
          <Grid container spacing={2}>
            <Grid item >
              <Avatar src={review.avatar} alt={review.name} className="review-avatar" />
            </Grid>
            <Grid item xs>
              <Box className="review-header">
                <Typography variant="subtitle1" id="review-name">{review.name}</Typography>
                <Typography variant="body2" id="review-date">{review.date}</Typography>
              </Box>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" id="review-text">{review.review}</Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Reviews;
