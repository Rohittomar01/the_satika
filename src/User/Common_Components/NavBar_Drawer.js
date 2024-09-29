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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useGSAP } from "@gsap/react";
import gsap from "gsap-trial";

export default function NavBar_Drawer(props) {
  const toggleDrawer = (newOpen) => () => {
    props.setOpen(newOpen);
    console.log(newOpen);
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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem id="drawerBox" key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem id="drawerBox" key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
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
            // borderBottomRightRadius: "24px",
            paddingTop: "2%",
            display: {
              display: "flex",
              alignItems: "center",
            },
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
