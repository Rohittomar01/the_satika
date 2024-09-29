import React, { useState, useRef } from "react";
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
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function TrendingProducts({ data, heading, buttonDisplay }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardRef = useRef(null);
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

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".product-superContainer",
        start: "top 80%",
        end: "bottom",
        toggleActions: "restart reverse restart reverse",
        fastScrollEnd: true,
      },
    });
    tl.from(".product-content-container", {
      opacity: 0,
      stagger: 0.2,
      duration: 1,
    });
    gsap.from("#iconButtonDiv", {
      scrollTrigger: {
        trigger: ".product-superContainer",
        start: "top 80%",
        end: "bottom",
        toggleActions: "restart reverse restart reverse",
        fastScrollEnd: true,
      },
      opacity: 0,
      y: 10,
      stagger: 0.2,
      delay:0.2,
      duration: 0.2,
    })
  }, [data]);

  // const handleMouseEnter = () => {
  //   console.log("jasdjs");
  //   gsap.from(cardRef.current, {
  //     opacity: 0,
  //     visibility: "none",
  //     y: 20,
  //     duration: 0.4,
  //     ease: "power3.out",
  //   });
  // };

  const renderProductCard = () => {
    if (!Array.isArray(data)) {
      console.error("Expected 'data' to be an array.");
      return null;
    }

    return data.map((product) => {
      const image_name =
        product.images && product.images.length > 0
          ? product.images[0].image_name
          : "default-image.jpg";

      return (
        <div
          // onMouseEnter={handleMouseEnter}
          ref={cardRef}
          className="product-content-container"
          key={product.id}
        >
          <Card
            elevation={0}
            className="card-body"
            sx={{
              maxWidth: 280,
              minWidth: 280,
              maxHeight: 600,
              position: "relative",
            }}
          >
            {/* Overlay favorite and view icons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                top: "48vh",
                right: "11vw",
                gap: 2,
              }}
            >
              <div id="iconButtonDiv"  onClick={() => handleSubmit(product)}>
                {/* <IconButton
                  onClick={() => handleSubmit(product)}
                  aria-label="add to favorites"
                  sx={{
                    color: "grey",
                    bgcolor: "rgba(255, 255, 255, 0.833)",
                    padding: "13%",
                    borderRadius: "50%",
                  }}
                > */}
                {wishlist[product.product_id] ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
                {/* </IconButton> */}
                <span style={{display:"none"}}>Favorite</span>
              </div>
              <div id="iconButtonDiv"   onClick={() => handleShare(product)}>
                {/* <IconButton
                  onClick={() => handleShare(product)}
                  aria-label="share"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.833)",
                    padding: "12%",
                    color: "grey",
                    // borderRadius: "50%",
                    marginTop: "2%",
                  }}
                > */}
                  <ShareIcon />
                {/* </IconButton> */}
              </div>
            </Box>

            {/* Image */}
            <CardMedia
              className="card-media"
              component="img"
              sx={{ objectFit: "cover", height: "62vh", width: "30vw" }}
              image={`${ServerURL}/images/${image_name}`}
              alt={product.product_name || "No product name available"} // Fallback alt text
            />

            {/* Add To Cart Button */}
            <Button
              onClick={() =>
                navigate("/productdetails", { state: { product } })
              }
              variant="contained"
              className="add-to-cart-button"
              sx={{
                backgroundColor: "#F76C6C",
                color: "white",
                width: "100%",
                borderRadius: 0,
                textTransform: "none",
                fontSize: "1em",
                padding: "10px 0",
                position: "absolute",
                bottom: 0,
                left: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              Add To Cart
            </Button>

            {/* Product Info */}
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "1em",
                  marginBottom: "0.5em",
                  fontFamily: "Futura Light Italic",
                }}
              >
                {product.product_name || "No product name available"}
              </Typography>
              <Typography
                sx={{ fontFamily: "Futura Light Italic" }}
                variant="h6"
              >
                Rs. {product.price || "N/A"}
              </Typography>
            </CardContent>
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
          className="animated-border-button"
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
