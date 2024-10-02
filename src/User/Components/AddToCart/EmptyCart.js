import React from "react";
import { Grid, Typography, Button, Container } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import NavBar from "../../Common_Components/NavBar";

const EmptyCart = () => {
  return (
    <Grid container direction="column" sx={{ height: "100vh" }}>
      {/* NavBar in its own Grid */}
      <Grid item>
        <NavBar />
      </Grid>

      {/* Empty Cart content in its own Grid */}
      <Grid item xs>
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
          }}
        >
          {/* Shopping Cart Icon */}
          <ShoppingCartIcon
            sx={{ fontSize: 100, color: "black", mb: 2 }}
            fontSize="large"
          />

          {/* Message */}
          <Typography variant="h4" sx={{ mb: 1 }}>
            Your Cart is <span style={{ color: "red" }}>Empty!</span>
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
            Add items to your cart before you proceed to checkout.
          </Typography>

          {/* Button */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "#fff",
                ":hover": { backgroundColor: "black" },
                px: 4,
              }}
            >
              RETURN TO SHOP
            </Button>
          </Link>
        </Container>
      </Grid>
    </Grid>
  );
};

export default EmptyCart;
