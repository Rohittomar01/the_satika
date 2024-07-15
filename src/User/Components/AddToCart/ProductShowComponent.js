import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "../../StyleSheets/AddToCart/AddToCartComponets_Css.css"


const ProductShowComponent = () => {
  return (
    <Card className="left-card">
      <CardMedia
        component="img"
        alt="product"
        height="140"
        image="product-image-url"
        title="Dark Red Pure Silk South Saree"
      />
      <CardContent>
        <Typography variant="h5">Dark Red Pure Silk South Saree</Typography>
        <Typography variant="body2" color="text.secondary">Inclusive of all taxes</Typography>
        <Typography variant="h6">₹ 9899 <span className="original-price">₹ 10999</span> (10% OFF)</Typography>
        <div className="quantity-container">
          <IconButton><RemoveIcon /></IconButton>
          <TextField variant="outlined" size="small" value="1" className="quantity-input" />
          <IconButton><AddIcon /></IconButton>
        </div>
        <Button variant="text" startIcon={<DeleteIcon />}>DELETE</Button>
        <Button variant="text">Move To Wishlist</Button>
      </CardContent>
    </Card>
  );
}

export default ProductShowComponent;
