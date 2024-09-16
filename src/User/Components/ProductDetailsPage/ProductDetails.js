import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Snackbar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { setWishListProduct, addToCart } from "../../../Store/Slices/Products";
import { postData } from "../../../Services/ServerServices"; // Ensure this is correctly implemented
import "../../StyleSheets/ProductDetailsPage/ProductDetails.css";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [addFavourite, setAddFavourite] = useState(false);

  const handleAddToCart = async (product) => {
    const body = {
      user_id: 1,
      product_id: product.product_id,
      added_at: new Date(),
    };
    try {
      const response = await postData("addtocart/submitCart_Data", body);
      if (response.status === "success") {
        dispatch(addToCart(product));
        setSnackbarMessage(response.message);
        setSnackbarOpen(true);
        console.log("Product added to cart successfully:", response);
      } else {
        setSnackbarMessage(response.message);
        setSnackbarOpen(true);
        console.log("Product added to cart successfully:", response);
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      setSnackbarMessage("Failed to add product to cart.");
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (data) => {
    const body = {
      user_id: 1,
      product_id: data.product_id,
      added_at: new Date(),
    };
    try {
      const response = await postData("wishlist/submitWishlist_Data", body);
      if (response.status === "success") {
        dispatch(setWishListProduct(data));
        setAddFavourite(true);
        setSnackbarMessage("Added this item to wishlist");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Removed this item from wishlist");
        setAddFavourite(false);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Failed to submit data:", error);
      setSnackbarMessage("Failed to add to favorites");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box id="product-detail-container">
      <Typography variant="subtitle2" id="product-category">
        {product.category}{" "}
      </Typography>
      <Typography variant="h5" id="product-title">
        {product.product_name}
      </Typography>
      <Typography variant="subtitle2" id="product-sku">
        {product.product_description}
      </Typography>
      <Box id="price-box">
        <Typography variant="h4" id="current-price">
          ₹ {product.price - product.discount}
        </Typography>
        <Typography variant="h6" id="old-price">
          ₹ {product.price}
        </Typography>
        <Typography variant="h6" id="discount">
          {product.discount} OFF
        </Typography>
      </Box>
      <Typography variant="body2" id="inclusive-tax">
        Inclusive of all taxes
      </Typography>
      {/* <Box id="emi-box">
        <Typography variant="body2" id="emi-link01">
          EMI Starts At ₹ 476. No Cost EMI Available
        </Typography>
        <Typography variant="body2" id="emi-link02">
          Click Here To View Plans
        </Typography>
      </Box> */}
      <Box id="favorite_Button_container">
        <IconButton
          onClick={() => handleSubmit(product)}
          id="favorite_iconContainer"
          aria-label="add to favorites"
        >
          {addFavourite ? (
            <FavoriteIcon id="favourite_Icon" sx={{color:"red"}} />
          ) : (
            <FavoriteBorderIcon id="favourite_Icon" />
          )}
        </IconButton>
        <Button
          variant="contained"
          id="add-to-bag-button"
          onClick={() => handleAddToCart(product)}
        >
          ADD TO BAG
        </Button>
      </Box>

      <Divider className="divider" />

      <Typography variant="h6" id="home-delivery-title">
        Home Delivery
      </Typography>

      <Box id="pincode-box">
        <FormControl variant="outlined" id="country-select">
          <InputLabel id="select-country-label">IN</InputLabel>
          <Select labelId="select-country-label" id="select-country" label="IN">
            <MenuItem value="IN">IN</MenuItem>
            {/* Add more country options here */}
          </Select>
        </FormControl>

        <TextField
          label="Enter Pincode here"
          variant="outlined"
          className="pincode-input"
        />
        <Button variant="outlined" className="check-button">
          CHECK
        </Button>
      </Box>

      <Typography variant="body2" id="dispatch-info">
        Usually Dispatches within 1 to 2 Days
      </Typography>
      <Typography variant="body2" id="delivery-date-info">
        Enter pincode for delivery date
      </Typography>
      <Typography variant="body2" id="return-policy-info">
        Easy 7 day return
      </Typography>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ProductDetail;
