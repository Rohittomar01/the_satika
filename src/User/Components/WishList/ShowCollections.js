import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../../Components/Home/Category_cards/CarouselArrowsButtons";
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
import { useSelector } from "react-redux";
import { getData } from "../../../Services/ServerServices";

export default function ShowCollections() {
  const wishlist_Store = useSelector(
    (state) => state.products.wishListProducts
  );
  const [products, setProducts] = useState([]);
  const userId = 1;

  const fetchProducts = async () => {
    console.log("haleoo")
    try {
      const response = await getData(
        `wishlist/fetchWishlist_Data?user_id=${userId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [wishlist_Store]);

  const options = { axis: "x", loop: true, dragFree: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const renderProductCard = () => {
    return products.map((product) => {
      return (
        <div className="product-content-container" key={product.product_id}>
          <Card sx={{ maxWidth: 240 }}>
            <CardMedia
              className="card-media"
              component="img"
              image={`/path/to/images/${product.image_name}`} // Adjust the image path as needed
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
                <IconButton aria-label="add to favorites">
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </Box>
              <Box component={"div"}>
                <Button id="addtocart_now_button" variant="outlined">
                  Add To Cart
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
        <h1 className="productHeading">My Collections</h1>
        <div className="control__buttonsContainer">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="product-mainContainer" ref={emblaRef}>
        <div className="product-subContainer">{renderProductCard()}</div>
      </div>
      {/* <div className="view_moreButton">
        <Button  variant="outlined">View More</Button>
      </div> */}
    </div>
  );
}
