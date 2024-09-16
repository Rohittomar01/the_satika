import React, { useEffect, useState } from "react";
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
import { setWishListProduct, addToCart } from "../../../Store/Slices/Products";
import {
  deleteData,
  getData,
  ServerURL,
  postData,
} from "../../../Services/ServerServices";
import ShareDialog from "../../Common_Components/ShareDialog";
export default function ShowWishList() {
  const [addFavourite] = useState(true);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [currentProduct, setCurrentProduct] = useState([]);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const wishlist_Store = useSelector(
    (state) => state.products.wishListProducts
  );
  const [products, setProducts] = useState([]);
  const userId = 1;

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
    const body = {
      user_id: 1,
      product_id: product.product_id,
      wishList_id: product.wishlist_id,
      added_at: new Date(),
    };
    try {
      const response = await postData(
        "addtocart/submitCart_DataIn_Addtocart",
        body
      );
      if (response.status === "success") {
        dispatch(addToCart(product));
        setSnackbarMessage(response.message);
        setSnackbarOpen(true);
        fetchProducts();
        console.log("Product added to cart successfully:", response);
      } else {
        setSnackbarMessage(response.message);
        setSnackbarOpen(true);
        console.log("Product added to cart successfully:", response);
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      setSnackbarMessage("Failed to add product to cart.");
      setSnackbarOpen(true);
    }
  };

  const handleRemove = async (wishlist_id) => {
    const userId = 1;
    try {
      deleteData(
        `wishlist/deleteWishlistItem?user_id=${userId}&wishlist_id=${wishlist_id}`
      )
        .then((response) => {
          fetchProducts();
        })
        .catch((error) => {
          console.error("Failed to fetch products:", error);
        });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [wishlist_Store, addFavourite]);
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

  const renderProductCard = () => {
    if (products.length === 0) {
      return (
        <div className="no-items-message">
          <Typography variant="h6" component="p">
            You have not added any items to your wishlist yet.
          </Typography>
        </div>
      );
    }

    // Map through products and render the product cards
    return products.map((product) => (
      <div className="product-content-container" key={product.product_id}>
        <Card sx={{ maxWidth: 240 }}>
          <CardMedia
            className="card-media"
            component="img"
            image={`${ServerURL}/images/${product.image_name}`}
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
                onClick={() => handleRemove(product.wishlist_id)}
                aria-label="remove from wishlist"
              >
                {addFavourite ? (
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
            <Box component={"div"}>
              <Button
                onClick={() => handleAddToCart(product)}
                id="addtocart_now_button"
                variant="outlined"
              >
                Add To Cart
              </Button>
            </Box>
          </CardActions>
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
