import React,{useEffect} from "react";
import { Grid, Box } from "@mui/material";
import "../StyleSheets/AddToCart/AddToCart.css";
import NavBar from "../Common_Components/NavBar";
import StepperComponent from "../Components/AddToCart/Stepper";
import ProductCards from "../Components/AddToCart/ProductCards";
import CalculationComponent from "../Components/AddToCart/CalculationComponent";

export default function AddToCart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <ProductCards />
      </Grid>
      <Grid item xs={4} sm={4} lg={4}>
        <CalculationComponent />
      </Grid>
    </Grid>
  );
}
