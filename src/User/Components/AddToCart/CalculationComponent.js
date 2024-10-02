import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Divider, Paper } from "@mui/material";
import "../../StyleSheets/AddToCart/CalculationComponent.css";
import SignUpDialog from "../../Pages/SignUpDialog";
import { useSelector } from "react-redux";
import { getDetails } from "../../../Store/Slices/addToCart";
import { useNavigate } from "react-router-dom";

const PriceDetails = ({ cartData }) => {
  const cartitems = useSelector((state) => state.addtocart);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const TotalAmount=cartitems.totalPrice-discount

  useEffect(() => {
    let subTotal = 0;
    let discount = 0;

    cartData.forEach((item) => {
      subTotal += item.price;
      discount += item.discount ? parseFloat(item.discount) : 0;
    });

    setSubTotal(subTotal);
    setDiscount(discount);
    setTotal(subTotal - discount);

  }, [cartData]);

  

  return (
    <Paper elevation={3} className="price-details">
      <Box className="row">
        <Typography variant="body1">Total Items:</Typography>
        <Typography variant="body1">{cartitems.totalItems}</Typography>
      </Box>
      <Box className="row">
        <Typography variant="body1">Sub Total:</Typography>
        <Typography variant="body1">₹ {cartitems.totalPrice}</Typography>
      </Box>
      <Box className="row">
        <Typography variant="body1">Shipping:</Typography>
        <Typography variant="body1">Free</Typography>
      </Box>
      <Box className="row">
        <Typography variant="body1">Discount:</Typography>
        <Typography variant="body1">₹ {discount}</Typography>
      </Box>
      <Divider className="divider" />
      <Box className="total">
        <Typography variant="h6">TOTAL</Typography>
        <Typography variant="h6">₹ {TotalAmount}</Typography>
      </Box>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        fullWidth
        className="buy-button"
      >
        BUY FOR ₹ {TotalAmount}
      </Button>
      <Button onClick={()=>navigate("/filter")} variant="outlined" fullWidth className="continue-button">
        CONTINUE SHOPPING
      </Button>
      <Box className="wishlist-button">
        {/* <Button fullWidth>
          <Typography variant="body1">Add From Wishlist</Typography>
        </Button> */}
        <SignUpDialog open={open} setOpen={setOpen} />
      </Box>
    </Paper>
  );
};

const CalculationComponent = ({ cartData }) => {
  return (
    <Box elevation={2} className="main_Container">
      <PriceDetails cartData={cartData} />
    </Box>
  );
};

export default CalculationComponent;
