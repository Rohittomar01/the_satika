import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button, Snackbar } from "@mui/material";
import "../../StyleSheets/FilterPage/DisplayProducts.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishListProduct } from "../../../Store/Slices/Products";
import { postData, ServerURL } from "../../../Services/ServerServices";
import { getData } from "../../../Services/ServerServices";
import filter from "../../../Store/Slices/filter";
import ShareDialog from "../../Common_Components/ShareDialog";

export default function DisplayProducts() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const filters = useSelector((state) => state.filters || {}); // Safe access

  const {
    colors: reduxColors = [],
    brands: reduxBrands = [],
    crafts: reduxCrafts = [],
    fabrics: reduxFabrics = [],
    origins: reduxOrigins = [],
    dropdownValue: reduxDropDownValue = 1,
    priceRange: reduxPriceRange = [0, 10000],
  } = filters;
  console.log("filter ", filters);
  const dispatch = useDispatch();
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

      // if (reduxDropDownValue === 1) {
      //   var matchesDropdown_NewArrival =
      //     !reduxDropDownValue ||
      //     parseInt(product.new_arrival) === parseInt(reduxDropDownValue);
      // } else if (reduxDropDownValue === 2) {
      //   var matchesDropdown_TopSelling =
      //     !reduxDropDownValue || product.top_selling === reduxDropDownValue;
      // }

      const matchesPrice =
        parseInt(product.price) >= reduxPriceRange[0] &&
        parseInt(product.price) <= reduxPriceRange[1];

      return (
        matchesColor &&
        matchesBrand &&
        matchesCraft &&
        matchesFabric &&
        matchesOrigin
        // matchesDropdown_NewArrival &&
        // matchesDropdown_TopSelling
      );
    });

    setFilteredProducts(filtered);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderProductCard = () => {
    return filteredProducts.map((product) => {
      return (
        <div className="products-content-container" key={product.id}>
          <Card sx={{ maxWidth: 200 }}>
            <CardMedia
              className="product-media"
              component="img"
              image={`${ServerURL}/images/${product.images[0].image_name}`}
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
                  onClick={() => handleSubmit(product)}
                  aria-label="add to favorites"
                >
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleShare(product)}
                  aria-label="share"
                >
                  <ShareIcon />
                </IconButton>
              </Box>
              <Box>
                <Button
                  onClick={() => handleNavigate(product)}
                  id="buy_now_button"
                  variant="outlined"
                >
                  Buy Now
                </Button>
              </Box>
            </CardActions>
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
      <div className="sub_container">{renderProductCard()}</div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
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
  );
}
