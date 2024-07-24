import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
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
import CelebrationIcon from "@mui/icons-material/Celebration";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
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
import BrandList from "../../Components/BrandList";
// import DashboardSidebar from "./DashboardSidebar";
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
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const fontFamilyLight = "Futura light Italic";

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
              sx={{ flexGrow: 1, fontFamily: fontFamilyLight }}
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
          <List component="nav" style={{ height: "89vh", overflow: "scroll" }}>
            {/******************* category list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/Category"),
                  setActiveItem("category"),
                ]}
                selected={activeItem === "category"}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Category"
                />
              </ListItemButton>
            </ListItem>
            {/******************* product list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/ProductsList"),
                  setActiveItem("ProductList"),
                ]}
                selected={activeItem === "ProductList"}
              >
                <ListItemIcon>
                  <AddShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Products"
                />
              </ListItemButton>
            </ListItem>

            {/******************* occasion list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/OccasionList"),
                  setActiveItem("occasion"),
                ]}
                selected={activeItem === "occasion"}
              >
                <ListItemIcon>
                  <LiquorIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Occasion"
                />
              </ListItemButton>
            </ListItem>
            {/******************* craft list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/CraftList"),
                  setActiveItem("craft"),
                ]}
                selected={activeItem === "craft"}
              >
                <ListItemIcon>
                  <AutoFixHighIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Craft"
                />
              </ListItemButton>
            </ListItem>
            {/******************* fabric list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/FabricList"),
                  setActiveItem("fabric"),
                ]}
                selected={activeItem === "fabric"}
              >
                <ListItemIcon>
                  <CheckroomIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Fabric"
                />
              </ListItemButton>
            </ListItem>
            {/******************* color list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/ColorList"),
                  setActiveItem("color"),
                ]}
                selected={activeItem === "color"}
              >
                <ListItemIcon>
                  <ColorLensIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Color"
                />
              </ListItemButton>
            </ListItem>
            {/******************* origin list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/OriginList"),
                  setActiveItem("origin"),
                ]}
                selected={activeItem === "origin"}
              >
                <ListItemIcon>
                  <FlagCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Origin"
                />
              </ListItemButton>
            </ListItem>
            {/******************* brand list **********************/}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/BrandList"),
                  setActiveItem("brand"),
                ]}
                selected={activeItem === "brand"}
              >
                <ListItemIcon>
                  <BrandingWatermarkIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Brand"
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/OffersList"),
                  setActiveItem("OfferList"),
                ]}
                selected={activeItem === "OfferList"}
              >
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Offers"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/DiscountList"),
                  setActiveItem("DiscountList"),
                ]}
                selected={activeItem === "DiscountList"}
              >
                <ListItemIcon>
                  <CelebrationIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Discounts"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/PromotionsList"),
                  setActiveItem("PromotionsList"),
                ]}
                selected={activeItem === "PromotionsList"}
              >
                <ListItemIcon>
                  <CastConnectedIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Promotions"
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/StockList"),
                  setActiveItem("StockList"),
                ]}
                selected={activeItem === "StockList"}
              >
                <ListItemIcon>
                  <CastConnectedIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Stock"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => [
                  navigate("/dashboard/Banner"),
                  setActiveItem("Banner"),
                ]}
                selected={activeItem === "Banner"}
              >
                <ListItemIcon>
                  <CastConnectedIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontFamily: fontFamilyLight },
                  }}
                  primary="Banner"
                />
              </ListItemButton>
            </ListItem>

            {/* <Divider sx={{ my: 1 }} /> */}
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
            paddingTop: "10%",
          }}
        >
          <Toolbar />
          {/* {renderComponents()} */}
          <Routes style={{ PaddingTop: "20vh" }}>
            <Route element={<Offers />} path={"/Offers"}></Route>
            <Route element={<OffersList />} path={"/OffersList"}></Route>
            <Route element={<Category />} path={"/Category"}></Route>
            <Route element={<Product />} path={"/Product"}></Route>
            <Route element={<ProductsList />} path={"/ProductsList"}></Route>
            <Route element={<Occasion />} path={"/occassion"}></Route>
            <Route element={<OccasionList />} path={"/OccasionList"}></Route>
            <Route element={<Craft />} path={"/craft"}></Route>
            <Route element={<CraftList />} path={"/CraftList"}></Route>
            <Route element={<Fabric />} path={"/fabric"}></Route>
            <Route element={<FabricList />} path={"/FabricList"}></Route>
            <Route element={<Color />} path={"/color"}></Route>
            <Route element={<ColorList />} path={"/ColorList"}></Route>
            <Route element={<Origin />} path={"/origin"}></Route>
            <Route element={<OriginList />} path={"/OriginList"}></Route>
            <Route element={<Brand />} path={"/brand"}></Route>
            <Route element={<BrandList />} path={"/BrandList"}></Route>
            <Route element={<Discounts />} path={"/Discounts"}></Route>
            <Route element={<DiscountList />} path={"/DiscountList"}></Route>
            <Route element={<Promotions />} path={"/Promotions"}></Route>
            <Route element={<Stock />} path={"/Stock"}></Route>
            <Route element={<StockList />} path={"/StockList"}></Route>
            <Route element={<Banner />} path={"/Banner"}></Route>
            <Route
              element={<PromotionsList />}
              path={"/PromotionsList"}
            ></Route>
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
