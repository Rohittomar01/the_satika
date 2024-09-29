import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button, Paper, Snackbar } from "@mui/material";
import "../../StyleSheets/FilterPage/DisplayProducts.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishListProduct } from "../../../Store/Slices/Products";
import { postData, ServerURL } from "../../../Services/ServerServices";
import { getData } from "../../../Services/ServerServices";
import filter from "../../../Store/Slices/filter";
import ShareDialog from "../../Common_Components/ShareDialog";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import gsap from "gsap";

export default function DisplayProducts() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const filters = useSelector((state) => state.filters || {}); 

  const {
    colors: reduxColors = [],
    brands: reduxBrands = [],
    crafts: reduxCrafts = [],
    fabrics: reduxFabrics = [],
    origins: reduxOrigins = [],
    dropdownValue: reduxDropDownValue = 1,
    priceRange: reduxPriceRange = [0,1000000],
  } = filters;
  // console.log("filter ", filters);
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = React.useState({});
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentProduct, setCurrentProduct] = useState([]); // For storing the product details for sharing
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleNavigate = (product) => {
    navigate("/productdetails", { state: { product: product } });
  };

  const handleSubmit = async (data) => {
    const body = {
      user_id: 1,
      product_id: data.product_id,
      added_at: new Date(),
    };
    try {
      const response = await postData("wishlist/submitWishlist_Data", body);
      if (response.status === "success") {
        setWishlist((prevState) => ({
          ...prevState,
          [data.product_id]: !prevState[data.product_id],
        }));
        dispatch(setWishListProduct(data));
        setSnackbarMessage("Added to wishlist");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Removed this item from wishlist");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Failed to submit data:", error);
      setSnackbarMessage("Failed to add to favorites");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const fetchProducts = async () => {
    try {
      const response = await getData("product/fetch-AllProductsWithImage");
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleShare = (product) => {
    setCurrentProduct(product);
    setShowShareDialog(true);
  };
  const filterProducts = () => {
    const filtered = productData.filter((product) => {
      const matchesColor =
        reduxColors.length === 0 ||
        reduxColors
          .map((color) => color.toLowerCase())
          .includes(product.color.toLowerCase());

      const matchesBrand =
        reduxBrands.length === 0 ||
        reduxBrands
          .map((brand) => brand.toLowerCase())
          .includes(product.brand.toLowerCase());

      const matchesCraft =
        reduxCrafts.length === 0 ||
        reduxCrafts
          .map((craft) => craft.toLowerCase())
          .includes(product.craft.toLowerCase());

      const matchesFabric =
        reduxFabrics.length === 0 ||
        reduxFabrics
          .map((fabric) => fabric.toLowerCase())
          .includes(product.fabric.toLowerCase());

      const matchesOrigin =
        reduxOrigins.length === 0 ||
        reduxOrigins
          .map((origin) => origin.toLowerCase())
          .includes(product.origin.toLowerCase());

      if (reduxDropDownValue === 1) {
        var matchesDropdown_NewArrival =
               parseInt(product.new_arrival) === parseInt(reduxDropDownValue);
      } else if (reduxDropDownValue === 2) {
        var matchesDropdown_TopSelling =
           parseInt(product.top_selling) === parseInt(reduxDropDownValue);
      }
      else if (reduxDropDownValue === 0) {
        var matchesDropdown_NewArrival = true
      }

      const matchesPrice =
       parseInt(product.price) >= reduxPriceRange[0] &&
        parseInt(product.price) <= reduxPriceRange[1];
      
      console.log("matches dropdown ",reduxPriceRange)

      return (
        matchesColor &&
        matchesBrand &&
        matchesCraft &&
        matchesFabric &&
        matchesOrigin &&
        matchesPrice &&
        matchesDropdown_NewArrival ||
        matchesDropdown_TopSelling
      );
    });

    setFilteredProducts(filtered);
  };

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
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
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
  //     delay:0.2,
  //     duration: 0.2,
  //   })
  // }, [filteredProducts]);

  const renderProductCard = () => {
    return filteredProducts.map((product) => {
      return (
        <div
        // onMouseEnter={handleMouseEnter}
        className="product-content-container"
        key={product.id}
      >
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
            <div id="iconButtonDiv"  onClick={() => handleSubmit(product)}>
             
              {wishlist[product.product_id] ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
            )} 
             
              <span style={{display:"none"}}>Favorite</span>
            </div>
            <div id="iconButtonDiv"   onClick={() => handleShare(product)}>
              {/* <IconButton
                onClick={() => handleShare(product)}
                aria-label="share"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.833)",
                  padding: "12%",
                  color: "grey",
                  // borderRadius: "50%",
                  marginTop: "2%",
                }}
              > */}
                <ShareIcon />
              {/* </IconButton> */}
            </div>
          </Box>

          {/* Image */}
          <CardMedia
            className="card-media"
            component="img"
            sx={{ objectFit: "cover", height: "62vh", width: "30vw" }}
            image={`${ServerURL}/images/${product.images[0].image_name}`}
            alt={product.product_name || "No product name available"} // Fallback alt text
          />

          {/* Add To Cart Button */}
          <Button
            onClick={() =>
              navigate("/productdetails", { state: { product } })
            }
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
        <div className="sub_container" >{renderProductCard()}</div>
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
      />
    </div>
  );
}
