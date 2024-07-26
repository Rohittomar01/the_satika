import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import "../StyleSheets/AddToCart/AddToCart.css";
import NavBar from "../Common_Components/NavBar";
import StepperComponent from "../Components/AddToCart/Stepper";
import ProductCards from "../Components/AddToCart/ProductCards";
import CalculationComponent from "../Components/AddToCart/CalculationComponent";
import { getData } from "../../Services/ServerServices";
import Swal from "sweetalert2";
import {  useNavigate } from "react-router-dom";

export default function AddToCart() {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const userId = 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch cart data
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    const user_id = 1;
    try {
      const response = await getData(
        `addtocart/fetchCart_Data?user_id=${user_id}`
      );
      if (response.data.length === 0) {
        Swal.fire({
          title: "Your cart is empty!",
          text: "Would you like to browse products and add items to your cart?",
          icon: "info",
          confirmButtonText: "Go to Home Page",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      } else {
        setCartData(response.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} lg={12}>
        <NavBar />
      </Grid>
      <Grid className="stepper_container" item xs={12} sm={12} lg={12}>
        <Box className="stepper_container_Box" component={"div"}>
          <StepperComponent />
        </Box>
      </Grid>
      <Grid item xs={8} sm={8} lg={8}>
        <ProductCards cartData={cartData} userId={userId} />
      </Grid>
      <Grid item xs={4} sm={4} lg={4}>
        <CalculationComponent cartData={cartData} />
      </Grid>
    </Grid>
  );
}
