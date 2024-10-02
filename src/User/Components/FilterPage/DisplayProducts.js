// src/Components/FilterPage/DisplayProducts.jsx

import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Box,
  Button,
  Paper,
  Snackbar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../Store/Slices/wishList";
import { setWishListProduct } from "../../../Store/Slices/Products";
import { postData, ServerURL, getData } from "../../../Services/ServerServices";
import { useNavigate } from "react-router-dom";
import ShareDialog from "../../Common_Components/ShareDialog";
import "../../StyleSheets/FilterPage/DisplayProducts.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function DisplayProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select wishlist and products from Redux store
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const products = useSelector((state) => state.products.products);
  const filters = useSelector((state) => state.filters || {});

  const {
    colors: reduxColors = [],
    brands: reduxBrands = [],
    crafts: reduxCrafts = [],
    fabrics: reduxFabrics = [],
    origins: reduxOrigins = [],
    dropdownValue: reduxDropDownValue = 1,
    priceRange: reduxPriceRange = [0, 1000000],
  } = filters;

  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null); // For storing the product details for sharing
  const [showShareDialog, setShowShareDialog] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products whenever productData or filters change
  useEffect(() => {
    filterProducts();
  }, [
    productData,
    reduxColors,
    reduxBrands,
    reduxCrafts,
    reduxFabrics,
    reduxOrigins,
    reduxPriceRange,
    reduxDropDownValue,
  ]);

  // GSAP Animations
  // useGSAP(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".product-superContainer",
  //       start: "top 80%",
  //       end: "bottom",
  //       toggleActions: "restart reverse restart reverse",
  //       fastScrollEnd: true,
  //     },
  //   });
  //   tl.from(".product-content-container", {
  //     opacity: 0,
  //     stagger: 0.2,
  //     duration: 1,
  //   });
  //   gsap.from("#iconButtonDiv", {
  //     scrollTrigger: {
  //       trigger: ".product-superContainer",
  //       start: "top 80%",
  //       end: "bottom",
  //       toggleActions: "restart reverse restart reverse",
  //       fastScrollEnd: true,
  //     },
  //     opacity: 0,
  //     y: 10,
  //     stagger: 0.2,
  //     delay: 0.2,
  //     duration: 0.2,
  //   });
  // }, [filteredProducts]);

  // Function to fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await getData("product/fetch-AllProductsWithImage");
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to filter products based on applied filters
  const filterProducts = () => {
    const filtered = productData.filter((product) => {
      const matchesColor =
        reduxColors.length === 0 ||
        reduxColors.map((color) => color.toLowerCase()).includes(product.color.toLowerCase());

      const matchesBrand =
        reduxBrands.length === 0 ||
        reduxBrands.map((brand) => brand.toLowerCase()).includes(product.brand.toLowerCase());

      const matchesCraft =
        reduxCrafts.length === 0 ||
        reduxCrafts.map((craft) => craft.toLowerCase()).includes(product.craft.toLowerCase());

      const matchesFabric =
        reduxFabrics.length === 0 ||
        reduxFabrics.map((fabric) => fabric.toLowerCase()).includes(product.fabric.toLowerCase());

      const matchesOrigin =
        reduxOrigins.length === 0 ||
        reduxOrigins.map((origin) => origin.toLowerCase()).includes(product.origin.toLowerCase());

      let matchesDropdown = true;
      if (reduxDropDownValue === 1) {
        matchesDropdown = parseInt(product.new_arrival) === parseInt(reduxDropDownValue);
      } else if (reduxDropDownValue === 2) {
        matchesDropdown = parseInt(product.top_selling) === parseInt(reduxDropDownValue);
      } else if (reduxDropDownValue === 0) {
        matchesDropdown = true;
      }

      const matchesPrice =
        parseInt(product.price) >= reduxPriceRange[0] &&
        parseInt(product.price) <= reduxPriceRange[1];

      return (
        matchesColor &&
        matchesBrand &&
        matchesCraft &&
        matchesFabric &&
        matchesOrigin &&
        matchesPrice &&
        matchesDropdown
      );
    });

    setFilteredProducts(filtered);
  };

  // Handle adding/removing items to/from wishlist
  const handleWishlistToggle = async (product) => {
    const isInWishlist = wishlist.some((item) => item.product_id === product.product_id);

    if (isInWishlist) {
      // Remove from wishlist
      dispatch(removeFromWishlist(product.product_id));
      setSnackbarMessage("Removed from wishlist");
    } else {
      // Add to wishlist
      dispatch(addToWishlist(product));
      setSnackbarMessage("Added to wishlist");
    }

    setSnackbarOpen(true);
  };

  // Handle sharing a product
  const handleShare = (product) => {
    setCurrentProduct(product);
    setShowShareDialog(true);
  };

  // Handle closing the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Navigate to product details
  const handleNavigate = (product) => {
    navigate("/productdetails", { state: { product: product } });
  };

  // Render each product card
  const renderProductCard = () => {
    return filteredProducts.map((product) => {
      const image_name =
        product.images && product.images.length > 0
          ? product.images[0].image_name
          : "default-image.jpg";

      const isInWishlist = wishlist.some((item) => item.product_id === product.product_id);

      return (
        <div className="product-content-container" key={product.id}>
          <Card
            elevation={0}
            className="card-body"
            sx={{
              maxWidth: 280,
              minWidth: 250,
              maxHeight: 600,
              position: "relative",
            }}
          >
            {/* Overlay favorite and share icons */}
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
                onClick={() => handleWishlistToggle(product)}
                style={{ cursor: "pointer" }}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleWishlistToggle(product);
                }}
              >
                {isInWishlist ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
                <span style={{ display: "none" }}>Favorite</span>
              </div>
              <div
                id="iconButtonDiv"
                onClick={() => handleShare(product)}
                style={{ cursor: "pointer" }}
                aria-label="Share"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleShare(product);
                }}
              >
                <ShareIcon />
                <span style={{ display: "none" }}>Share</span>
              </div>
            </Box>

            {/* Product Image */}
            <CardMedia
              className="card-media"
              component="img"
              sx={{ objectFit: "cover", height: "62vh", width: "30vw" }}
              image={`${ServerURL}/images/${image_name}`}
              alt={product.product_name || "No product name available"} // Fallback alt text
            />

            {/* Add To Cart Button */}
            <Button
              onClick={() => handleNavigate(product)}
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

  // If no products match the filters, display a message
  if (filteredProducts.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px", // Adjust height as needed
        }}
      >
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ fontFamily: "Futura Light Italic", textAlign: "center" }}
        >
          No results found
        </Typography>
      </div>
    );
  }

  return (
    <div className="product-superContainer">
      <Paper
        elevation={0}
        className="sub_container"
        style={{
          maxHeight: "600px", // Adjust this height based on your layout needs
          overflowY: "scroll", // Enable vertical scrolling
          scrollbarWidth: "none", // For Firefox to hide scrollbars
          msOverflowStyle: "none", // For Internet Explorer and Edge
        }}
      >
        <div className="sub_container">{renderProductCard()}</div>
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
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </div>
  );
}
