import React, { useState } from "react";
import { Box, Typography, Button, Divider, Paper } from "@mui/material";
import "../../StyleSheets/AddToCart/CalculationComponent.css";
import SignUpDialog from "../../Pages/SignUpDialog";
const PriceDetails = () => {
  const [open, setOpen] = useState(false);
  return (
    <Paper elevation={3} className="price-details">
      <Box className="row">
        <Typography variant="body1">Sub Total</Typography>
        <Typography variant="body1">₹ 10999</Typography>
      </Box>
      <Box className="row">
        <Typography variant="body1">Shipping</Typography>
        <Typography variant="body1">Free</Typography>
      </Box>
      <Box className="row">
        <Typography variant="body1">Discount</Typography>
        <Typography variant="body1">₹ 1100</Typography>
      </Box>
      <Divider className="divider" />
      <Box className="total">
        <Typography variant="h6">TOTAL</Typography>
        <Typography variant="h6">₹ 9899</Typography>
      </Box>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        fullWidth
        className="buy-button"
      >
        BUY FOR ₹ 9899
      </Button>
      <Button variant="outlined" fullWidth className="continue-button">
        CONTINUE SHOPPING
      </Button>
      <Box className="wishlist-button">
        <Button fullWidth>
          <Typography variant="body1">Add From Wishlist</Typography>
        </Button>
        <SignUpDialog open={open} setOpen={setOpen} />
      </Box>
    </Paper>
  );
};

const CalculationComponent = () => {
  return (
    <Box elevation={2} className="main_Container">
      <PriceDetails />
    </Box>
  );
};

export default CalculationComponent;
