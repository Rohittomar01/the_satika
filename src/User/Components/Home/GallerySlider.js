import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Box, Button } from "@mui/material";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./Category_cards/CarouselArrowsButtons"; // Import your custom navigation buttons if needed
import "../../StyleSheets/GallerySlider.css";
import { useNavigate } from "react-router-dom";
import QuickView from "../../Pages/QuickView";
const GallerySlider = ({ images }) => {
  const navigate = useNavigate();
  const options = { axis: "x", dragFree: true, loop: true };
  const [isGrabbing, setIsGrabbing] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      stopOnInteraction: false,
      stopOnFocusIn: true,
      stopOnMouseEnter: true,
    }),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const handleMouseDown = () => {
    setIsGrabbing(true);
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
  };
  const [dialogOpen, setDialogOpen] = useState(false);

  const product = {
    image:
      "https://i.pinimg.com/originals/99/0a/3b/990a3b1680be2127f5b7b88c4badde05.jpg",
    subtitle: "Tussar and Combination",
    title: "Blue Woven Design Pure Tussar",
    price: "10999",
  };

  const ProductsData = [
    {
      product_image:
        "https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Royal",
      author: "@bkristastucchio",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      product_image:
        "https://images.pexels.com/photos/2747267/pexels-photo-2747267.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Rajisthani",
      author: "@rollelflex_graphy726",
    },
    {
      product_image:
        "https://images.pexels.com/photos/1999895/pexels-photo-1999895.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Rajisthani",
      author: "@helloimnik",
    },
    {
      product_image:
        "https://images.pexels.com/photos/9419149/pexels-photo-9419149.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Rajisthani",
      author: "@nolanissac",
      cols: 2,
    },
    {
      product_image:
        "https://images.pexels.com/photos/15181110/pexels-photo-15181110/free-photo-of-woman-in-traditional-bridal-saree-dress.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Rajisthani",
      author: "@hjrc33",
      cols: 2,
    },
    {
      product_image:
        "https://images.pexels.com/photos/7176696/pexels-photo-7176696.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Rajisthani",
      author: "@arwinneil",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      product_image:
        "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Rajisthani",
      author: "@tjdragotta",
    },
    {
      product_image:
        "https://images.pexels.com/photos/7685494/pexels-photo-7685494.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Rajisthani",
      author: "@katie_wasserman",
    },
    {
      product_image:
        "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Rajisthani",
      author: "@silverdalex",
      rows: 2,
      cols: 2,
    },
    {
      product_image:
        "https://i.pinimg.com/originals/99/0a/3b/990a3b1680be2127f5b7b88c4badde05.jpg",
      title: "Rajisthani basil",
      author: "@shelleypauls",
    },
  ];
  const renderImages = () => {
    return ProductsData.map((item, index) => (
      <div className="image-slide" key={index}>
        <ImageListItem key={item.img}>
          <img
            id="gallery-image"
            src={item.product_image}
            alt={item.title}
            onClick={() => setDialogOpen(true)}
          />
          <ImageListItemBar
            id="gallerySlider_imageTitle"
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <Button
                onClick={() => navigate("/productdetails")}
                id="gallery_button"
                size="small"
                variant="outlined"
              >
                Buy Now
              </Button>
            }
          />
          <Button
            id="quick-view-button"
            onClick={() => setDialogOpen(true)}
          >
            Quick View
          </Button>
        </ImageListItem>
      </div>
    ));
  };

  return (
    <div className="image-gallery-container">
      <div className="carousel-control">
        <h1 className="gallery-heading">Image Gallery</h1>
        <div className="control-buttons-container">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div
        className="gallery-main-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={emblaRef}
      >
        <div className={isGrabbing ? "grabbing" : "gallery-sub-container"}>
          {renderImages()}
        </div>
      </div>
      <div className="view_more">
        <Button onClick={() => navigate("/gallery")} variant="outlined">
          View More
        </Button>
      </div>
      <QuickView
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        product={product}
      />
    </div>
  );
};

export default GallerySlider;
