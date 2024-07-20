import React from "react";
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

export default function ShowCollections() {
  const options = { axis: "x", loop: true, dragFree: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const products = [
    {
      id: 1,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
      product_name: "Product 1",
      price: 20000,
      product_description: "This is a trending product.",
    },
    {
      id: 2,
      image:
        "https://cdn.pixabay.com/photo/2024/04/02/13/53/ai-generated-8670949_1280.jpg",
      product_name: "Product 2",
      price: 20000,
      product_description: "This is another trending product.",
    },
    {
      id: 3,
      image:
        "https://cdn.pixabay.com/photo/2019/04/11/17/42/beauty-4120283_1280.jpg",
      product_name: "Product 3",
      price: 20000,
      product_description: "This is also trending.",
    },
    {
      id: 4,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
      product_name: "Product 4",
      price: 20000,
      product_description: "Trending product 4 description.",
    },
    {
      id: 5,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
      product_name: "Product 5",
      price: 20000,
      product_description: "Trending product 5 description.",
    },
    {
      id: 6,
      image:
        "https://cdn.pixabay.com/photo/2024/03/07/20/31/ai-generated-8619240_1280.jpg",
      product_name: "Product 6",
      price: 20000,
      product_description: "Trending product 6 description.",
    },
  ];

  const renderProductCard = () => {
    return products.map((product) => {
      return (
        <div className="product-content-container" key={product.id}>
          <Card sx={{ maxWidth: 240 }}>
            <CardMedia
              className="card-media"
              component="img"
              // height="194"
              image={product.image}
              alt={product.product_name}
            />
            <CardContent>
              <Typography
                className="card-description"
                variant="body2"
                color="text.secondary"
              >
                {product.product_description}
              </Typography>
              <Typography className="card-price" component={"h3"}>
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
              <Box component={"div"} >
                <Button  id="addtocart_now_button" variant="outlined">
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
