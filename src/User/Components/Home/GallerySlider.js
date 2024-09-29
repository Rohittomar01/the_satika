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
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";

gsap.registerPlugin({ ScrollTrigger,useGSAP});

const GallerySlider = ({ images }) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const ProductsData = [
    {
      images:
        "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/27989168/2024/3/2/5ef86fa4-73e3-4266-8d81-d9921dded8751709348581018SidhidataWomensPrintedReadyToWearSareeWithUnstitchedBlousePi1.jpg",
      title: "Royal Blue Silk Saree",
      subtitle: "Traditional Elegance",
      price: "7999",
    },

    {
      images:
        "https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-ranipink-zariwork-artsilk-designer-saree-saus0021014_ranipink_3_large.jpg?v=1695981170",
      title: "Rani Pink Zari Saree",
      subtitle: "Elegant Weaves",
      price: "11999",
    },
    {
      images:
        "https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-ranipink-zariwork-net-designer-saree-saus0029319_ranipink_1_large.jpg?v=1685354836",
      title: "Maharani Pink Net Saree",
      subtitle: "Luxury Collection",
      price: "12999",
    },

    {
      images:
        "https://images.wholesalesalwar.com/2024y/July/51351/Cream-Silk-Wedding%20Wear-Weaving-Saree-MADHUBALA-T-1173%20(2).jpg",
      title: "Cream Silk Wedding Saree",
      subtitle: "Wedding Special",
      price: "14999",
    },
    {
      images:
        "https://assets.ajio.com/medias/sys_master/root/20230923/eWgZ/650ee5f9ddf7791519f7c61f/-1117Wx1400H-466621422-maroon-MODEL.jpg",
      title: "Maroon Bridal Saree",
      subtitle: "Festive Glam",
      price: "9999",
    },
    {
      images:
        "https://assets2.andaazfashion.com/media/catalog/product/cache/1/image/800x1200/a12781a7f2ccb3d663f7fd01e1bd2e4e/d/a/dark-green-mehndi-silk-wedding-wear-woven-zari-saree-sarv154007-1.jpg",
      title: "Dark Green Mehndi Saree",
      subtitle: "Traditional Charm",
      price: "10999",
    },

    {
      images:
        "https://images.shaadisaga.com/shaadisaga_production/photos/pictures/000/780/265/new_medium/sahibbakanand.jpg?1553586872",
      title: "Golden Kanjivaram Saree",
      subtitle: "Luxury Collection",
      price: "14999",
    },
    {
      images:
        "https://studiovirupa.com/cdn/shop/products/image_27871d37-84b5-4105-a720-590c40ea1767_600x.jpg?v=1664007959",
      title: "Sea Green Chiffon Saree",
      subtitle: "Light and Breezy",
      price: "8999",
    },
    {
      images:
        "https://www.kankatala.com/blog/wp-content/uploads/2023/03/327150798_3339527379709007_3598049178706899645_n-819x1024.jpg",
      title: "Peach Satin Saree",
      subtitle: "Evening Wear",
      price: "7999",
    },

    {
      images:
        "https://static.wixstatic.com/media/c70d98_80d553d3bd894427a2adb6d7aa269861~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg",
      title: "Ivory Silk Saree",
      subtitle: "Graceful Attire",
      price: "10999",
    },
  ];


  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".image-gallery-container",
        start: "top 80%",
        end: "bottom",
        toggleActions: "restart reverse restart reverse",
        fastScrollEnd: true,
      },
    });
    tl.from(".image-slide", {
      opacity: 0,
      y: -400,
      rotation: () => gsap.utils.random(-15, 15),
      stagger: 0.1,
      duration: 1.2,
      ease: "bounce.out",
    });
  });

  const renderImages = () => {
    return ProductsData.map((item, index) => (
      <div className="image-slide" key={index}>
        <ImageListItem key={item.img}>
          <img
            id="gallery-image"
            src={item.images}
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
                sx={{ fontSize: "clamp(0.5rem, 1vw, 1.5rem)" }}
              >
                Buy Now
              </Button>
            }
          />
          <Button
            id="quick-view-button"
            onClick={() => handleImageClick(item)}
            sx={{ fontSize: "clamp(0.5rem, 1vw, 1.5rem)" }}
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
      {selectedProduct && (
        <QuickView
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default GallerySlider;
