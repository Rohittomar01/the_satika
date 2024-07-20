import React from "react";
import { Grid, Box } from "@mui/material";
import NavBar from "../Common_Components/NavBar";
import Footer from "../Common_Components/Footer";
import ShowCollections from "../Components/WishList/ShowCollections";
import "../StyleSheets/WishList/WishList.css";

export default function WishList() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} lg={12}>
        <NavBar />
      </Grid>
      <Grid className="stepper_container" item xs={12} sm={12} lg={12}>
        <Box className="showCollection_container" component={"div"}>
          <ShowCollections />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} lg={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
