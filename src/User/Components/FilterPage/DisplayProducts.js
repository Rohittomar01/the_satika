import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button } from "@mui/material";
import "../../StyleSheets/FilterPage/DisplayProducts.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishListProduct } from "../../../Store/Slices/Products";
import { postData } from "../../../Services/ServerServices";
import {Snackbar} from "@mui/material";

export default function DisplayProducts() {

  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

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
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      dispatch(setWishListProduct(data));
      console.log("Data submitted successfully:", result);
    } catch (error) {
      console.error("Failed to submit data:", error);
      <Snackbar
        autoHideDuration={5000}
        message="failed to added in favourate"
      />;
    }
  };


  const renderProductCard = () => {
    return products.map((product) => {
      return (
        <div className="products-content-container" key={product.id}>
          <Card sx={{ maxWidth: 240 }}>
            <CardMedia
              className="product-media"
              component="img"
              // height="194"
              image={product.product_image}
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
    </div>
  );
}
