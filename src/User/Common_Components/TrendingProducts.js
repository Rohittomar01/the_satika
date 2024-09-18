import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../Components/Home/Category_cards/CarouselArrowsButtons";
import "../StyleSheets/Common_Components/TrendingProducts.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishListProduct } from "../../Store/Slices/Products";
import { postData, ServerURL } from "../../Services/ServerServices";
import ShareDialog from "./ShareDialog";

export default function TrendingProducts({ data, heading, buttonDisplay }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentProduct, setCurrentProduct] = useState([]); // For storing the product details for sharing
  const [showShareDialog, setShowShareDialog] = useState(false);

  // Track wishlist status for each product
  const [wishlist, setWishlist] = React.useState({});

  const options = { axis: "x", loop: true, dragFree: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const handleSubmit = async (data) => {
    const body = {
      user_id: 1,
      product_id: data.product_id,
      added_at: new Date(),
    };
    try {
      const response = await postData("wishlist/submitWishlist_Data", body);
      if (response.status === "success") {
        // Toggle wishlist status
        setWishlist((prevState) => ({
          ...prevState,
          [data.product_id]: !prevState[data.product_id],
        }));
        dispatch(setWishListProduct(data));
        setSnackbarMessage(
          wishlist[data.product_id]
            ? "Removed from wishlist"
            : "Added to wishlist"
        );
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

  const handleShare = (product) => {
    setCurrentProduct(product);
    setShowShareDialog(true);
  };

  const renderProductCard = () => {
    if (!Array.isArray(data)) {
      console.error("Expected 'data' to be an array.");
      return null;
    }
  
    return data.map((product) => {
      const image_name = (product.images && product.images.length > 0)
        ? product.images[0].image_name
        : "default-image.jpg";
  
      return (
        <div className="product-content-container" key={product.id}>
          <Card className="card-body" sx={{ maxWidth: 270 }}>
            <CardMedia
              className="card-media"
              component="img"
              image={`${ServerURL}/images/${image_name}`}
              alt={product.product_name || "No product name available"} // Fallback alt text
            />
            <CardContent>
              <Typography
                id="card-description"
                variant="body2"
                color="text.secondary"
              >
                {product.product_description || "No description available"}
              </Typography>
              <Typography id="card-price" component={"h3"}>
                Rs.{product.price || "N/A"}
              </Typography>
            </CardContent>
            <CardActions className="card-action-container" disableSpacing>
              <Box component={"div"}>
                <IconButton
                  onClick={() => handleSubmit(product)}
                  aria-label="add to favorites"
                >
                  {wishlist[product.product_id] ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <IconButton
                  onClick={() => handleShare(product)}
                  aria-label="share"
                >
                  <ShareIcon />
                </IconButton>
              </Box>
              <Box>
                <Button
                  onClick={() =>
                    navigate("/productdetails", { state: { product } })
                  }
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
    <div className="product-superContainer">
      <div className="carousel-control">
        <h1 className="productHeading">{heading}</h1>
        <div className="control__buttonsContainer">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="product-mainContainer" ref={emblaRef}>
        <div className="product-subContainer">{renderProductCard()}</div>
      </div>
      <div className="view_moreButton">
        <Button
          sx={{ display: buttonDisplay }}
          variant="outlined"
          onClick={() => navigate("/filter", { category_name: "category" })}
        >
          View More
        </Button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
      <ShareDialog
        open={showShareDialog}
        setOpen={setShowShareDialog}
        shareUrl={
          currentProduct ? `${ServerURL}/product/${currentProduct.id}` : ""
        }
        quote={
          currentProduct
            ? `Check out this amazing product: ${currentProduct.product_name}`
            : ""
        }
        hashtag="#TrendingProduct"
      />
    </div>
  );
}
