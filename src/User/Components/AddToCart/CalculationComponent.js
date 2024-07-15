import React from 'react';
import { Card, CardContent, Typography, Button, Divider, TextField } from '@mui/material';
import "../../StyleSheets/AddToCart/AddToCartComponets_Css.css"

const CalculationComponent = () => {
  return (
    <Card className="right-card">
      <CardContent>
        <Typography variant="h6">Sub Total: ₹ 10999</Typography>
        <Typography variant="h6">Shipping: Free</Typography>
        <Typography variant="h6">Discount: ₹ 1100</Typography>
        <Divider />
        <Typography variant="h5">TOTAL: ₹ 9899</Typography>
        <Button variant="contained" color="primary">BUY FOR ₹ 9899</Button>
        <Button variant="outlined">CONTINUE SHOPPING</Button>
        <Button variant="outlined">Add From Wishlist</Button>
        <Button variant="outlined">Apply for Discount</Button>
        <Button variant="outlined">Login & Apply Coupons</Button>
        <Typography variant="subtitle1" className="coupons-available">1 Coupons Available</Typography>
        <Typography variant="subtitle1">Buying for a loved one?</Typography>
        <TextField
          label="Add Gift Message"
          multiline
          rows={4}
          placeholder="Add your gift message here"
          variant="outlined"
          className="gift-message-input"
        />
        <Button variant="contained">ADD</Button>
      </CardContent>
    </Card>
  );
}

export default CalculationComponent;
