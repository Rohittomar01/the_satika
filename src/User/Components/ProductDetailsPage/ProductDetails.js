import React from "react";
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
  IconButton
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../StyleSheets/ProductDetailsPage/ProductDetails.css";

const ProductDetail = () => {
  
  return (
    <Box id="product-detail-container">
      <Typography variant="subtitle2" id="product-category">
        SILK
      </Typography>
      <Typography variant="h5" id="product-title">
        Dark Red Pure Silk South Saree
      </Typography>
      <Typography variant="subtitle2" id="product-sku">
        SKU: SPH07E00069
      </Typography>

      <Box id="price-box">
        <Typography variant="h4" id="current-price">
          ₹ 899.00
        </Typography>
        <Typography variant="h6" id="old-price">
          ₹ 10,999.00
        </Typography>
        <Typography variant="h6" id="discount">
          10% OFF
        </Typography>
      </Box>

      <Typography variant="body2" id="inclusive-tax">
        Inclusive of all taxes
      </Typography>

      <Box id="emi-box">
        <Typography variant="body2" id="emi-link01">
          EMI Starts At ₹ 476. No Cost EMI Available
        </Typography>
        <Typography variant="body2" id="emi-link02">
          Click Here To View Plans
        </Typography>
      </Box>
      <Box id="favorite_Button_container">
        <IconButton id="favorite_iconContainer" aria-label="add to favorites">
          <FavoriteBorderIcon id="favourite_Icon"  />
        </IconButton>
        <Button variant="contained" id="add-to-bag-button">
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
    </Box>
  );
};

export default ProductDetail;
