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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../StyleSheets/AddToCart/ProductCards.css";
import { deleteData, ServerURL } from "../../../Services/ServerServices";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  setWishListProduct,
  removeFromCart,
} from "../../../Store/Slices/Products";
import { postData } from "../../../Services/ServerServices";

const ProductCards = ({ cartData, userId,fetchCartData }) => {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
        const response = await deleteData(
          `addtocart/cartDelete?product_id=${productId}&user_id=${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response) {
          Swal.fire(
            "Deleted!",
            "Your item has been removed from the cart.",
            "success"
          );
          dispatch(removeFromCart(productId));
        } else {
          const errorData = await response.json();
          console.error("Failed to delete data:", errorData.error);
          Swal.fire("Error!", "Failed to delete item from the cart.", "error");
        }
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

  const handleSubmit = async (data) => {
    const body = {
      user_id: 1,
      product_id: data.product_id,
      added_at: new Date(),
    };
    try {
      const response = await postData(
        "wishlist/submitWishlist_Data_In_WishlistTable",
        body
      );
      if (response.status === "success") {
        dispatch(setWishListProduct(data));
        setSnackbarMessage("Added this item to wishlist");
        setSnackbarOpen(true);
        fetchCartData();
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box className="card-container">
      {cartData.map((item) => (
        <Card className="card" key={item.product_id}>
          <Box className="content_container">
            <Box className="media-container">
              <CardMedia
                className="CardMedia"
                component="img"
                alt={item.product_name}
                image={`${ServerURL}/images/${item.image_name}`}
                title={item.product_name}
              />
            </Box>
            <CardContent>
              <Typography id="title" gutterBottom variant="h5" component="div">
                {item.product_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹ {item.price}{" "}
                <span className="original-price">₹ {item.originalPrice}</span> (
                {item.discount ? item.discount + " OFF" : "No Discount"})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description || "Inclusive of all taxes"}
              </Typography>
              <Box className="quantity-control">
                <Button variant="outlined" size="small">
                  -
                </Button>
                <Typography variant="body2" color="text.secondary">
                  {item.quantity || 1}
                </Typography>
                <Button variant="outlined" size="small">
                  +
                </Button>
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
              onClick={() => handleSubmit(item)}
              className="wishlist-button"
              startIcon={<FavoriteBorderIcon />}
            >
              Move to Wishlist
            </Button>
          </Box>
        </Card>
      ))}
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
