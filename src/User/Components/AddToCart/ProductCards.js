import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../StyleSheets/AddToCart/ProductCards.css";
import { Delete } from "@mui/icons-material";
const cardData = [
  {
    id: 1,
    title: "Dark Red Pure Silk South Saree",
    price: 9899,
    originalPrice: 10999,
    discount: "10% OFF",
    image: "https://wallpapers.com/images/hd/saree-pictures-2d8qt1hau3xlfjdp.jpg",
    quantity: 1,
    description: "Inclusive of all taxes",
  },
  {
    id: 2,
    title: "Dark Red Pure Silk South Saree",
    price: 9899,
    originalPrice: 10999,
    discount: "10% OFF",
    image: "https://e1.pxfuel.com/desktop-wallpaper/748/960/desktop-wallpaper-beautiful-model-saree-saree-models.jpg",
    quantity: 1,
    description: "Inclusive of all taxes",
  },
];

const ProductCards = () => {
  const [data, setData] = useState(cardData);

  return (
    <Box className="card-container">
      {data.map((item) => (
        <Card className="card" key={item.id}>
          <Box className="content_container">
            <Box className="media-container">
              <CardMedia
                className="CardMedia"
                component="img"
                alt={item.title}
                image={item.image}
                title={item.title}
              />
              {/* <Box className="discount-tag">{item.discount}</Box> */}
            </Box>
            <CardContent>
              <Typography id="title" gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹ {item.price}{" "}
                <span className="original-price">₹ {item.originalPrice}</span> (
                {item.discount})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Box className="quantity-control">
                <Button variant="outlined" size="small">
                  -
                </Button>
                <Typography variant="body2" color="text.secondary">
                  {item.quantity}
                </Typography>
                <Button variant="outlined" size="small">
                  +
                </Button>
              </Box>
            </CardContent>
          </Box>
          <Divider/>
          <Box className="action-buttons">
           <Box className="delete_icon">
           <Button
              className="wishlist-button"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            </Box>
            <Button
              className="wishlist-button"
              startIcon={<FavoriteBorderIcon />}
            >
              Move to Wishlist
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default ProductCards;
