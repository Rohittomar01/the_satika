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
    <Box className="product-detail-container">
      <Typography variant="subtitle2" className="product-category">
        SILK
      </Typography>
      <Typography variant="h5" className="product-title">
        Dark Red Pure Silk South Saree
      </Typography>
      <Typography variant="subtitle2" className="product-sku">
        SKU: SPH07E00069
      </Typography>

      <Box className="price-box">
        <Typography variant="h4" className="current-price">
          ₹ 899.00
        </Typography>
        <Typography variant="h6" className="old-price">
          ₹ 10,999.00
        </Typography>
        <Typography variant="h6" className="discount">
          10% OFF
        </Typography>
      </Box>

      <Typography variant="body2" className="inclusive-tax">
        Inclusive of all taxes
      </Typography>

      <Box className="emi-box">
        <Typography variant="body2">
          EMI Starts At ₹ 476. No Cost EMI Available
        </Typography>
        <Typography variant="body2" className="emi-link">
          Click Here To View Plans
        </Typography>
      </Box>
      <Box className="favorite_Button_container">
        <IconButton className="favorite_icon" aria-label="add to favorites">
          <FavoriteBorderIcon  />
        </IconButton>
        <Button variant="contained" className="add-to-bag-button">
          ADD TO BAG
        </Button>
      </Box>

      <Divider className="divider" />

      <Typography variant="h6" id="home-delivery-title">
        Home Delivery
      </Typography>

      <Box className="pincode-box">
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

      <Typography variant="body2" className="dispatch-info">
        Usually Dispatches within 1 to 2 Days
      </Typography>
      <Typography variant="body2" className="delivery-date-info">
        Enter pincode for delivery date
      </Typography>
      <Typography variant="body2" className="return-policy-info">
        Easy 7 day return
      </Typography>
    </Box>
  );
};

export default ProductDetail;
