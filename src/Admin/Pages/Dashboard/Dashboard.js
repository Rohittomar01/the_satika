import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LiquorIcon from "@mui/icons-material/Liquor";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ListIcon from "@mui/icons-material/List";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CelebrationIcon from '@mui/icons-material/Celebration';
import CastConnectedIcon from '@mui/icons-material/CastConnected';
import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Category from "../../Components/Category";
import Categories_List from "../../Components/Categories_List";
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import Product from "../../Components/Product";
import ProductsList from "../../Components/ProductsList";
import Occasion from "../../Components/Occasion";
import Craft from "../../Components/Craft";
import Fabric from "../../Components/Fabric";
import Color from "../../Components/Color";
import Origin from "../../Components/Origin";
import Brand from "../../Components/Brand";
import Offers from "../../Components/Offers";
import OffersList from "../../Components/Offers_List";
import Discounts from "../../Components/Discounts";
import DiscountList from "../../Components/Discount_List";
import Promotions from "../../Components/Promotions";
import PromotionsList from "../../Components/PromotionsList";

import OccasionList from "../../Components/OccasionList ";
import CraftList from "../../Components/CraftList";
import FabricList from "../../Components/FabricList ";
import ColorList from "../../Components/ColorList";
import OriginList from "../../Components/OriginList";
import { useActiveItem } from "../../../Common_Components/ActiveItemContext";
import BrandList from "../../Components/BrandList";
import DashboardSidebar from "./DashboardSidebar";
import StockList from "../../Components/StockList";
import Stock from "../../Components/Stock";
import Banner from "../../Components/Banner";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {

  const navigate=useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

 
  // const renderComponents = () => {
  //   // const itemToRender = activeItem || Item;
  //   console.log("active ITEMS", activeItem);
  //   switch (activeItem) {
  //     case "category":
  //       return <Category />;
  //     case "product":
  //       return <Product />;
  //     case "productlist":
  //       return <ProductsList />;
  //     case "occasion":
  //       return <Occasion />;
  //     case "occasionlist":
  //       return <OccasionList />;
  //     case "craft":
  //       return <Craft />;
  //     case "craftlist":
  //       return <CraftList />;
  //     case "fabric":
  //       return <Fabric />;
  //     case "fabriclist":
  //       return <FabricList />;
  //     case "color":
  //       return <Color />;
  //     case "colorlist":
  //       return <ColorList />;
  //     case "origin":
  //       return <Origin />;
  //     case "originlist":
  //       return <OriginList />;
  //     case "brand":
  //       return <Brand />;
  //     case "brandlist":
  //       return <BrandList />;
  //     case "stock":
  //       return <Stock />;
  //     case "stocklist":
  //       return <StockList />;
  //     case "banner":
  //       return <Banner />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{
            backgroundColor: "black", // Light yellow with some transparency
          }}
        >
          {" "}
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 ,fontFamily:"sans-serif"}}
            >
              The Satika
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {/******************* category list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/Category")}
                // selected={activeItem === "category"}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Category" />
              </ListItemButton>
            </ListItem>
            {/******************* product list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/product")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <AddShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
            {/******************* productlist list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/productlist")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Products List" />
              </ListItemButton>
            </ListItem>

            {/******************* occasion list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/occasion")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <LiquorIcon />
                </ListItemIcon>
                <ListItemText primary="Occasion" />
              </ListItemButton>
            </ListItem>
            {/******************* craft list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/craft")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <AutoFixHighIcon />
                </ListItemIcon>
                <ListItemText primary="Craft" />
              </ListItemButton>
            </ListItem>
            {/******************* fabric list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/fabric")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <CheckroomIcon />
                </ListItemIcon>
                <ListItemText primary="Fabric" />
              </ListItemButton>
            </ListItem>
            {/******************* color list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/color")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <ColorLensIcon />
                </ListItemIcon>
                <ListItemText primary="Color" />
              </ListItemButton>
            </ListItem>
            {/******************* origin list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/origin")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <FlagCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Origin" />
              </ListItemButton>
            </ListItem>
            {/******************* brand list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/brand")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <BrandingWatermarkIcon />
                </ListItemIcon>
                <ListItemText primary="Brand" />
              </ListItemButton>
            </ListItem>
           
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/OffersList")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText primary="Offers" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/DiscountList")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <CelebrationIcon />
                </ListItemIcon>
                <ListItemText primary="Discounts" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/dashboard/PromotionsList")}
                // selected={activeItem === "product"}
              >
                <ListItemIcon>
                  <CastConnectedIcon />
                </ListItemIcon>
                <ListItemText primary="Promotions" />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[200],
            flexGrow: 1,
            height: "100vh",
            overflow: "scroll",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Toolbar />
          {/* {renderComponents()} */}
          <Routes>
            <Route element={<Offers />} path={"/Offers"}></Route>
            <Route element={<OffersList />} path={"/OffersList"}></Route>
            <Route element={<Category />} path={"/Category"}></Route>
            <Route element={<Product />} path={"/Product"}></Route>
            <Route element={<ProductsList />} path={"/ProductsList"}></Route>
            <Route element={<Occasion />} path={"/Occasion"}></Route>
            <Route element={<Craft />} path={"/Craft"}></Route>
            <Route element={<Fabric />} path={"/Fabric"}></Route>
            <Route element={<Color />} path={"/Color"}></Route>
            <Route element={<Origin />} path={"/Origin"}></Route>
            <Route element={<Brand />} path={"/Brand"}></Route>
            <Route element={<Offers />} path={"/Offers"}></Route>
            <Route element={<OffersList />} path={"/OffersList"}></Route>
            <Route element={<Discounts />} path={"/Discounts"}></Route>
            <Route element={<DiscountList />} path={"/DiscountList"}></Route>
            <Route element={<Promotions />} path={"/Promotions"}></Route>
            <Route element={<PromotionsList />} path={"/PromotionsList"}></Route>

          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
