import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import gsap from "gsap-trial";
import { useGSAP } from "@gsap/react";
import { Typography } from "@mui/material";

export default function NavBar_Drawer(props) {
  const toggleDrawer = (newOpen) => () => {
    props.setOpen(newOpen);
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from("#drawerBox", {
      x: 10,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.2,
    });
  }, [props.open]);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {/* First section */}
        {[
          { text: "Profile", icon: <PersonIcon /> },
          { text: "Orders", icon: <ShoppingBagIcon /> },
          { text: "Track Order", icon: <TrackChangesIcon /> },
          { text: "Exchange Request", icon: <SwapHorizIcon /> },
        ].map((item) => (
          <ListItem id="drawerBox" key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Second section */}
      <List>
        {[
          { text: "Offers", icon: <LocalOfferIcon /> },
          { text: "Customer Support", icon: <SupportAgentIcon /> },
        ].map((item) => (
          <ListItem id="drawerBox" key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            borderTopRightRadius: "24px",
            paddingTop: "2%",
            display: "flex",
            alignItems: "center",
          },
        }}
        transitionDuration={500}
        open={props.open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
