import React, { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../Home/Category_cards/CarouselArrowsButtons";
import "../../StyleSheets/Common_Components/TrendingProducts.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../Store/Slices/Products";
import {
  deleteData,
  getData,
  ServerURL,
  postData,
} from "../../../Services/ServerServices";
import ShareDialog from "../../Common_Components/ShareDialog";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import gsap from "gsap";
import { removeFromWishlist } from "../../../Store/Slices/wishList";
gsap.registerPlugin(ScrollTrigger);

export default function ShowWishList() {
  const [addFavourite] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [currentProduct, setCurrentProduct] = useState([]);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const userId = 1;
  const [wishlist, setWishlist] = React.useState({});
  console.log("wishlist", wishlistItems);

  const fetchProducts = async () => {
    try {
      const response = await getData(
        `wishlist/fetchWishlist_Data?user_id=${userId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleAddToCart = async (product) => {
    dispatch(removeFromWishlist(product.product_id))
    navigate("/productdetails", { state: { product } })

    // const body = {
    //   user_id: 1,
    //   product_id: product.product_id,
    //   wishList_id: product.wishlist_id,
    //   added_at: new Date(),
    // };
    // try {
    //   const response = await postData(
    //     "addtocart/submitCart_DataIn_Addtocart",
    //     body
    //   );
    //   if (response.status === "success") {
    //     dispatch(addToCart(product));
    //     setSnackbarMessage(response.message);
    //     setSnackbarOpen(true);
    //     fetchProducts();
    //     console.log("Product added to cart successfully:", response);
    //   } else {
    //     setSnackbarMessage(response.message);
    //     setSnackbarOpen(true);
    //     console.log("Product added to cart successfully:", response);
    //   }
    // } catch (error) {
    //   console.error("Failed to add product to cart:", error);
    //   setSnackbarMessage("Failed to add product to cart.");
    //   setSnackbarOpen(true);
    // }
  };

 

  useEffect(() => {
    fetchProducts();
  }, [wishlistItems, addFavourite]);
  const handleShare = (product) => {
    setCurrentProduct(product);
    setShowShareDialog(true);
  };

  const options = { axis: "x", loop: true, dragFree: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
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
      delay: 0.2,
      duration: 0.2,
    });
  }, [wishlistItems]);

  const renderProductCard = () => {
    if (wishlistItems.length === 0) {
      return (
        <div className="no-items-message">
          <Typography variant="h6" component="p">
            You have not added any items to your wishlist yet.
          </Typography>
        </div>
      );
    }

    // Map through products and render the product cards
    return wishlistItems.map((product) => (
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
            <div
              id="iconButtonDiv"
              onClick={() => dispatch(removeFromWishlist(product.product_id))}
            >
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
              <FavoriteIcon sx={{ color: "red" }} />
              {/* </IconButton> */}
              <span style={{ display: "none" }}>Favorite</span>
            </div>
            <div id="iconButtonDiv" onClick={() => handleShare(product)}>
              <ShareIcon />
            </div>
          </Box>

          {/* Image */}
          <CardMedia
            className="card-media"
            component="img"
            sx={{ objectFit: "cover", height: "62vh", width: "30vw" }}
            image={`${ServerURL}/images/${product.images[0].image_name}` || ""}
            alt={product.product_name || "No product name available"} // Fallback alt text
          />

          {/* Add To Cart Button */}
          <Button
            onClick={() => handleAddToCart(product)}
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
            <Typography sx={{ fontFamily: "Futura Light Italic" }} variant="h6">
              Rs. {product.price || "N/A"}
            </Typography>
          </CardContent>
        </Card>
      </div>
    ));
  };

  return (
    <div className="product-superContainer">
      <div className="carousel-control">
        <h1 className="productHeading">My Collections</h1>
        {products.length > 0 && (
          <div className="control__buttonsContainer">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        )}
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
      <div className="product-mainContainer" ref={emblaRef}>
        <div className="product-subContainer">{renderProductCard()}</div>
      </div>
    </div>
  );
}
