import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NavBar_Drawer from "./NavBar_Drawer";
import "../StyleSheets/Common_Components/NavBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/Slices/Products";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../StyleSheets/Common_Components/NavBar.css";
import { getData } from "../../Services/ServerServices";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function NavBar() {
  const product = useSelector((state) => state.products.addToCartProducts);
  // console.log("navv p", product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const fetchCartData = async () => {
    const user_id = 1;
    try {
      const response = await getData(
        `addtocart/fetchCart_Data?user_id=${user_id}`
      );
      dispatch(addToCart(response.data));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCartData();
  }, []);

  return (
    <Box component={"div"} sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          sx={{ display: "none" }}
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "white",
          height: "12vh",
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid container>
            <Grid className="menuIcon_grid" item xs={1} sm={1} lg={1}>
              <div>
                {" "}
                <IconButton
                  onClick={() => setOpen(true)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, color: "black" }}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid className="company_name_grid" item xs={9} sm={9} lg={9}>
              <div id="companyName_container">
                <span component="div" className="companyName">
                  The Satika
                </span>
              </div>
            </Grid>
            <Grid className="actions_buttons_grids" item xs={2} sm={2} lg={2}>
              <div className="actions_buttons">
                <IconButton
                  className="nav_icons"
                  onClick={() => navigate("/wishlist")}
                >
                  <FavoriteBorderIcon />{" "}
                </IconButton>
                <IconButton
                  className="nav_icons"
                  onClick={() => navigate("/addtocart")}
                  aria-label="cart"
                >
                  <StyledBadge badgeContent={product.length} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
                {auth && (
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="black"
                      className="nav_icons"
                    >
                      <AccountCircle sx={{ fontSize: "100%" }} />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
          <NavBar_Drawer open={open} setOpen={setOpen} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
