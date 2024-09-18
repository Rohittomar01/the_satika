import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
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
import { getData, ServerURL } from "../../../Services/ServerServices";

export default function ShowCollections() {
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
    // if (products.length === 0) {
    //   return (
    //     <div className="no-data-message">
    //       <Typography
    //         sx={{
    //           width: "100%",
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //         variant="h6"
    //         color="textSecondary"
    //       >
    //         No products available in your collection.
    //       </Typography>
    //     </div>
    //   );
    // }

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
              <IconButton aria-label="add to favorites">
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Box>
            <Box component={"div"}>
              <Button id="addtocart_now_button" variant="outlined">
                Buy Now
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
        <div className="control__buttonsContainer">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="product-mainContainer" ref={emblaRef}>
        {products.length === 0 ? (
         <Typography
         sx={{
           width: "100%",
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           fontSize: "clamp(1rem, 2vw, 1.5rem)",
         }}
         variant="h6"
         color="textSecondary"
       >
            No products available in your collection.
          </Typography>
        ) : (
          <>
            <div className="product-subContainer">{renderProductCard()}</div>
          </>
        )}
      </div>
    </div>
  );
}
