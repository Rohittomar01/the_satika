import React from "react";
import { Grid } from "@mui/material";
import ProductShowComponent from "../Components/AddToCart/ProductShowComponent";
import CalculationComponent from "../Components/AddToCart/CalculationComponent";

export default function AddToCart() {
  return (
    <Grid container>
      <Grid item xs={6} sm={6} lg={6}>
        <ProductShowComponent />
      </Grid>
      <Grid item xs={6} sm={6} lg={6}>
        <CalculationComponent />
      </Grid>
    </Grid>
  );
}
