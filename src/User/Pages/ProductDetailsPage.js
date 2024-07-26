import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import ProductCarousel from "../Components/ProductDetailsPage/ProductCarousel/ProductCarousel";
import NavBar from "../Common_Components/NavBar";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import "../StyleSheets/ProductDetailsPage/ProductDetailsPage.css";
import ProductDetail from "../Components/ProductDetailsPage/ProductDetails";
import TrendingProducts from "../Common_Components/TrendingProducts";
import Footer from "../Common_Components/Footer";
import Reviews from "../Components/ProductDetailsPage/Reviews";
import { useLocation } from "react-router-dom";
export default function ProductDetailsPage() {
  const location = useLocation();
  const { product } = location.state;

  const handleClick = (event) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} lg={12}>
        <NavBar />
      </Grid>
      <Grid className="BreadCrumbs_Container" item xs={12} sm={12} lg={12}>
        <div className="breadCrumbs" role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
        </div>
      </Grid>
      <Grid
        className="productCarousel_Container"
        container
        xs={12}
        sm={12}
        lg={12}
      >
        <Grid className="Productcarousel_container" item xs={6} sm={6} lg={6}>
          <ProductCarousel />
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <ProductDetail product={product} />
        </Grid>
        <Grid id="others_componentsContainer" item xs={12} sm={12} lg={12}>
          {/* <TrendingProducts /> */}
        </Grid>
        <Grid id="others_componentsContainer">
          <Reviews />
        </Grid>
        <Grid>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
}
