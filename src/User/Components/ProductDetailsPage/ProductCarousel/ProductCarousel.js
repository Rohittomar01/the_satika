import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./CarouselThumbsButton";
import $ from "jquery";
import ReactImageMagnify from "react-image-magnify";
import "../../../StyleSheets/ProductDetailsPage/ProductCarousel.css";

const ProductCarousel = (props) => {
  const options = { axis: "x" };
  const SLIDE_COUNT = 10;
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1572470176170-98fa8abcb741?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FyZWV8ZW58MHwxfDB8fHww",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1572470176170-98fa8abcb741?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FyZWV8ZW58MHwxfDB8fHww",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1572470176170-98fa8abcb741?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FyZWV8ZW58MHwxfDB8fHww",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1572470176170-98fa8abcb741?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FyZWV8ZW58MHwxfDB8fHww",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    // selectedScrollSnap: selectedIndex,
    axis: "y",
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  // $(function () {
  //   $(".product_carousel_images").xzoom({
  //     zoomWidth: 500,
  //     title: false,
  //     tint: "#333",
  //     Xoffset: 15,
  //   });
  // });
  return (
    <div className="carousel">
      <div className="carousel__viewport" ref={emblaMainRef}>
        <div className="carousel__container">
          {slides.map((index) => (
            <div className="carousel__slide" key={index.id}>
              <div className="carousel__slide__number">
                <div className="product_carousel_images">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src: index.image,
                      },
                      largeImage: {
                        src: index.image,
                        width: 1200,
                        height: 1800,
                      },
                      enlargedImagePosition: "over",
                    }}
                  />
                </div>
                {/* <img
                  className="product_carousel_images"
                  src={index.image}
                ></img> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-thumbs">
        <div className="carousel-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="carousel-thumbs__container">
            {slides.map((index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index.id - 1)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
