import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button, Snackbar } from "@mui/material";
import "../../StyleSheets/FilterPage/DisplayProducts.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishListProduct } from "../../../Store/Slices/Products";
import { postData, ServerURL } from "../../../Services/ServerServices";

export default function DisplayProducts() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleNavigate = (product) => {
    navigate("/productdetails", { state: { product: product } });
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
        setSnackbarMessage("Added to wishlist");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Removed this item from wishlist");
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

  const renderProductCard = () => {
    return products.map((product) => {
      return (
        <div className="products-content-container" key={product.id}>
          <Card sx={{ maxWidth: 240 }}>
            <CardMedia
              className="product-media"
              component="img"
              image={`${ServerURL}/images/${product.images[0].image_name}`}
              alt={product.product_name}
            />
            <CardContent>
              <Typography
                id="card-description"
                variant="body2"
                color="text.secondary"
              >
                {product.product_description}
              </Typography>
              <Typography id="card-price" component={"h3"}>
                Rs.{product.price}
              </Typography>
            </CardContent>
            <CardActions className="card-action-container" disableSpacing>
              <Box component={"div"}>
                <IconButton
                  onClick={() => handleSubmit(product)}
                  aria-label="add to favorites"
                >
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </Box>
              <Box>
                <Button
                  onClick={() => handleNavigate(product)}
                  id="buy_now_button"
                  variant="outlined"
                >
                  Buy Now
                </Button>
              </Box>
            </CardActions>
          </Card>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="sub_container">{renderProductCard()}</div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
}
