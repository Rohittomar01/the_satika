import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import "../StyleSheets/AddToCart/AddToCart.css";
import NavBar from "../Common_Components/NavBar";
import StepperComponent from "../Components/AddToCart/Stepper";
import ProductCards from "../Components/AddToCart/ProductCards";
import CalculationComponent from "../Components/AddToCart/CalculationComponent";
import { getData } from "../../Services/ServerServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import EmptyCart from "../Components/AddToCart/EmptyCart";
import { getDetails } from "../../Store/Slices/addToCart";

export default function AddToCart() {
  const cartItems = useSelector((state) => state.addtocart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);
  const userId = 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCartData();
  }, [cartItems]);

  useEffect(() => {
    {
      dispatch(getDetails());
    }
  }, [cartItems.totalItems]);

  const fetchCartData = async () => {
    const user_id = 1;
    try {
      const response = await getData(
        `addtocart/fetchCart_Data?user_id=${user_id}`
      );
      setCartData(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  if (cartItems.products.length === 0) {
    return <EmptyCart />;
  }

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
      <Grid className="totalcartItemsGrid" item xs={12} sm={12} lg={12}>
        <Box id="totalcartItemsBox">
          <Typography id="totalcartItems">
            {cartItems.products.length === 0
              ? ""
              : `Items:${cartItems.products.length}`}
          </Typography>
        </Box>
      </Grid>
      <Grid style={{ marginTop: "1.5%" }} item xs={8} sm={8} lg={8}>
        <ProductCards
          cartData={cartData}
          fetchCartData={fetchCartData}
          userId={userId}
        />
      </Grid>
      <Grid item xs={4} sm={4} lg={4}>
        <CalculationComponent cartData={cartData} />
      </Grid>
    </Grid>
  );
}
