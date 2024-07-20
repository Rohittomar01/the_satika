import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import "../../StyleSheets/FilterPage/FilterBar.css";

export default function FilterBar() {
  const [openSections, setOpenSections] = React.useState({
    color: false,
    range: false,
    craft: false,
    fiber: false,
    origin: false,
  });

  const handleClick = (section) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [section]: !prevOpenSections[section],
    }));
  };

  return (
    <List
      className="filterBar_list"
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* Color Section */}
      <ListItemButton onClick={() => handleClick("color")}>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              fontFamily: openSections.color
                ? "'Futura bold Italic',sans-serif"
                : "'Futura medium Italic',sans-serif",
            },
          }}
          primary="Color"
        />
        {openSections.color ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSections.color} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemText
              primaryTypographyProps={{
                sx: { fontFamily: "'Futura medium Italic',sans-serif" },
              }}
              primary="Option 1"
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemText
              primaryTypographyProps={{
                sx: { fontFamily: "'Futura medium Italic',sans-serif" },
              }}
              primary="Option 2"
            />
          </ListItemButton>
          {/* Add more items as needed */}
        </List>
      </Collapse>
      <Divider />

      {/* Range Section */}
      <ListItemButton onClick={() => handleClick("range")}>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              fontFamily: openSections.range
                ? "'Futura bold Italic',sans-serif"
                : "'Futura medium Italic',sans-serif",
            },
          }}
          primary="Range"
        />
        {openSections.range ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSections.range} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemText
              primaryTypographyProps={{
                sx: { fontFamily: "'Futura medium Italic',sans-serif" },
              }}
              primary="Option 1"
            />
          </ListItemButton>
          <ListItemButton
            primaryTypographyProps={{
              sx: { fontFamily: "'Futura medium Italic',sans-serif" },
            }}
            sx={{ pl: 6 }}
          >
            <ListItemText primary="Option 2" />
          </ListItemButton>
          {/* Add more items as needed */}
        </List>
      </Collapse>
      <Divider />

      {/* Craft Section */}
      <ListItemButton onClick={() => handleClick("craft")}>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              fontFamily: openSections.craft
                ? "Futura bold Italic"
                : "Futura medium Italic",
            },
          }}
          primary="Craft"
        />
        {openSections.craft ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSections.craft} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            primaryTypographyProps={{
              sx: { fontFamily: "'Futura medium Italic',sans-serif" },
            }}
            sx={{ pl: 6 }}
          >
            <ListItemText primary="Option 1" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemText
              primaryTypographyProps={{
                sx: { fontFamily: "'Futura medium Italic',sans-serif" },
              }}
              primary="Option 2"
            />
          </ListItemButton>
          {/* Add more items as needed */}
        </List>
      </Collapse>
      <Divider />

      {/* Fiber Section */}
      <ListItemButton onClick={() => handleClick("fiber")}>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              fontFamily: openSections.fiber
                ? "'Futura bold Italic',sans-serif"
                : "'Futura medium Italic',sans-serif",
            },
          }}
          primary="Fiber"
        />
        {openSections.fiber ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSections.fiber} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemText
              primaryTypographyProps={{
                sx: { fontFamily: "'Futura medium Italic',sans-serif" },
              }}
              primary="Option 1"
            />
          </ListItemButton>
          <ListItemButton
            primaryTypographyProps={{
              sx: { fontFamily: "'Futura medium Italic',sans-serif" },
            }}
            sx={{ pl: 6 }}
          >
            <ListItemText primary="Option 2" />
          </ListItemButton>
          {/* Add more items as needed */}
        </List>
      </Collapse>
      <Divider />

      {/* Origin Section */}
      <ListItemButton onClick={() => handleClick("origin")}>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              fontFamily: openSections.origin
                ? "'Futura bold Italic',sans-serif"
                : "'Futura medium Italic',sans-serif",
            },
          }}
          primary="Origin"
        />
        {openSections.origin ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSections.origin} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemText
              primaryTypographyProps={{
                sx: { fontFamily: "'Futura medium Italic',sans-serif" },
              }}
              primary="Option 1"
            />
          </ListItemButton>
          <ListItemButton
            primaryTypographyProps={{
              sx: { fontFamily: "'Futura medium Italic',sans-serif" },
            }}
            sx={{ pl: 6 }}
          >
            <ListItemText primary="Option 2" />
          </ListItemButton>
          {/* Add more items as needed */}
        </List>
      </Collapse>
      <Divider />
    </List>
  );
}
