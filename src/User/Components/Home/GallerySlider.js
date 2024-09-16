import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button } from "@mui/material";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./Category_cards/CarouselArrowsButtons"; // Import your custom navigation buttons if needed
import "../../StyleSheets/GallerySlider.css";
import { useNavigate } from "react-router-dom";
import QuickView from "../../Pages/QuickView";
import { getData, ServerURL } from "../../../Services/ServerServices";
const GallerySlider = () => {
  const [imagesData, setImagesData] = useState([]);
  const [dialogProduct, setDialogProduct] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const fetchAllImages = async () => {
    try {
      const result = await getData(`product/fetch_all_Images`);
      setImagesData(result.data);
    } catch (error) {
      console.error("Error fetching trending products:", error);
    }
  };

  // Use useEffect to fetch trending products when the component mounts
  useEffect(() => {
    fetchAllImages();
  }, []);

  const handleOpenDialog = (item) => {
    setDialogOpen(true);
    setDialogProduct(item);
  };

  const renderImages = () => {
    return imagesData.map((item, index) => (
      <div className="image-slide" key={index}>
        <ImageListItem key={item.img}>
          <img
            id="gallery-image"
            src={`${ServerURL}/images/${item.images[0].image_name}`}
            alt={item.title}
          />
          <ImageListItemBar
            id="gallerySlider_imageTitle"
            title={item.product_name}
            subtitle={item.product_description}
            actionIcon={
              <Button
                onClick={() =>
                  navigate("/productdetails", { state: { product: item } })
                }
                id="gallery_button"
                size="small"
                variant="outlined"
              >
                Buy Now
              </Button>
            }
          />
          <Button id="quick-view-button" onClick={() => handleOpenDialog(item)}>
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
        product={dialogProduct}
      />
    </div>
  );
};

export default GallerySlider;
