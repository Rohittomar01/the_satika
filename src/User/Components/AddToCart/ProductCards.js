import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Divider,
  Snackbar,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../StyleSheets/AddToCart/ProductCards.css";
import { deleteData, ServerURL } from "../../../Services/ServerServices";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  incrementItems,
  decrementItems,
} from "../../../Store/Slices/addToCart";
import { addToWishlist } from "../../../Store/Slices/wishList";
// import { postData } from "../../../Services/ServerServices";
import { Link } from "react-router-dom"; // Import Link for navigation

const ProductCards = ({ cartData, userId, fetchCartData }) => {
  const dispatch = useDispatch();
  const cardItems = useSelector((state) => state.addtocart);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  console.log("cartritems", cardItems.products);

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        dispatch(removeCartItem(productId));
      } catch (error) {
        console.error("Error deleting data:", error);
        Swal.fire(
          "Error!",
          "An error occurred while deleting the item.",
          "error"
        );
      }
    }
  };

  // const handleSubmit = async (data) => {
  //   const body = {
  //     user_id: 1,
  //     product_id: data.product_id,
  //     added_at: new Date(),
  //   };
  //   try {
  //     const response = await postData(
  //       "wishlist/submitWishlist_Data_In_WishlistTable",
  //       body
  //     );
  //     if (response.status === "success") {
  //       dispatch(setWishListProduct(data));
  //       setSnackbarMessage("Added this item to wishlist");
  //       setSnackbarOpen(true);
  //       // fetchCartData();
  //     } else {
  //       setSnackbarMessage("Removed this item from wishlist");
  //       setSnackbarOpen(true);
  //     }
  //   } catch (error) {
  //     console.error("Failed to submit data:", error);
  //     setSnackbarMessage("Failed to add to favorites");
  //     setSnackbarOpen(true);
  //   }
  // };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleIncrement = (product_id) => {
    dispatch(incrementItems(product_id));
  };
  const handleDecrement = (product_id) => {
    dispatch(decrementItems(product_id));
  };
  const handleAddToWishList = (item) => {
    dispatch(addToWishlist(item));
    dispatch(removeCartItem(item.product_id));
  };

  return (
    <Box className="card-container">
      {cardItems.products.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6">
            You don't have any items in your cart.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please <Link to="/">shop</Link> and add items to your cart.
          </Typography>
        </Box>
      ) : (
        cardItems.products.map((item) => (
          <Card elevation={2} className="card" key={item.product_id}>
            <Box className="content_container">
              <Box className="media-container">
                <CardMedia
                  className="CardMedia"
                  component="img"
                  alt={item.product_name}
                  image={`${ServerURL}/images/${item.images[0].image_name}`}
                  title={item.product_name}
                />
              </Box>
              <CardContent>
                <Typography
                  id="title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item.product_name}
                </Typography>
                <Typography
                  sx={{ fontFamily: "Futura medium Italic',sans-serif" }}
                  id="price"
                  variant="body2"
                  color="text.secondary"
                >
                  ₹ {item.price}{" "}
                  <span className="original-price">₹ {item.originalPrice}</span>{" "}
                  ({item.discount ? item.discount + " OFF" : "No Discount"})
                </Typography>
                <Typography
                  id="description"
                  variant="body2"
                  color="text.secondary"
                >
                  {item.description || "Inclusive of all taxes"}
                </Typography>
                <Box className="quantity-control">
                  <IconButton
                    onClick={() => handleDecrement(item.product_id)}
                    id="iconButton"
                    variant="outlined"
                    size="small"
                  >
                    -
                  </IconButton>
                  <Typography
                    id="quantity"
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.quantity || 1}
                  </Typography>
                  <IconButton
                    onClick={() => handleIncrement(item.product_id)}
                    id="iconButton"
                    variant="outlined"
                    size="small"
                  >
                    +
                  </IconButton>
                </Box>
              </CardContent>
            </Box>
            <Divider />
            <Box className="action-buttons">
              <Box className="delete_icon">
                <Button
                  className="wishlist-button"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(item.product_id)}
                >
                  Delete
                </Button>
              </Box>
              <Button
                // onClick={() => handleSubmit(item)}
                className="wishlist-button"
                startIcon={<FavoriteBorderIcon />}
                onClick={() => handleAddToWishList(item)}
              >
                Move to Wishlist
              </Button>
            </Box>
          </Card>
        ))
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ProductCards;
