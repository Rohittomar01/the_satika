import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText,Divider } from '@mui/material';
import CategoryIcon from "@mui/icons-material/Category";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LiquorIcon from "@mui/icons-material/Liquor";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ListIcon from "@mui/icons-material/List";
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import { useActiveItem } from '../../../Common_Components/ActiveItemContext';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';



const DashboardSidebar = () => {
    const { setActiveItem } = useActiveItem();
  const [Item, setItem] = useState('product'); // Default to 'product'

  const handleItemClick = (item) => {
    setActiveItem(item)
  };

  return (
    <List component="nav">
    {/******************* category list **********************/}
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => handleItemClick('category')}
        // selected={activeItem === "category"}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Category" />
      </ListItemButton>
    </ListItem>

    {/******************* productlist list **********************/}
    <ListItem disablePadding>
      <ListItemButton
         onClick={() => handleItemClick("productlist")}
        // selected={activeItem === "product"}
      >
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Products List" />
      </ListItemButton>
    </ListItem>

    {/******************* occasionlist list **********************/}
    <ListItem disablePadding>
      <ListItemButton
       onClick={() => handleItemClick("occasionlist")}
        // selected={activeItem === "product"}
      >
        <ListItemIcon>
          <LiquorIcon />
        </ListItemIcon>
        <ListItemText primary="Occasion List" />
      </ListItemButton>
    </ListItem>

    {/******************* craftlist list **********************/}
    <ListItem disablePadding>
      <ListItemButton
       onClick={() => handleItemClick("craftlist")}
        // selected={activeItem === "product"}
      >
        <ListItemIcon>
          <AutoFixHighIcon />
        </ListItemIcon>
        <ListItemText primary="Craft List" />
      </ListItemButton>
    </ListItem>

    {/******************* fabric list **********************/}
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => handleItemClick("fabriclist")}
        // selected={activeItem === "product"}
      >
        <ListItemIcon>
          <CheckroomIcon />
        </ListItemIcon>
        <ListItemText primary="Fabric List" />
      </ListItemButton>
    </ListItem>

    {/******************* colorlist list **********************/}
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => handleItemClick("colorlist")}
        // selected={activeItem === "product"}
      >
        <ListItemIcon>
          <ColorLensIcon />
        </ListItemIcon>
        <ListItemText primary="Color List" />
      </ListItemButton>
    </ListItem>

    {/******************* originlist list **********************/}
    <ListItem disablePadding>
      <ListItemButton
      onClick={() => handleItemClick("originlist")}
        // selected={activeItem === "product"}
      >
        <ListItemIcon>
          <FlagCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Origin List" />
      </ListItemButton>
    </ListItem>

    {/******************* brand list **********************/}
    <ListItem disablePadding>
      <ListItemButton
         onClick={() => handleItemClick("brandlist")}
        // selected={activeItem === "product"}
      >
        <ListItemIcon>
          <BrandingWatermarkIcon />
        </ListItemIcon>
        <ListItemText primary="Brand List" />
      </ListItemButton>
    </ListItem>
    {/******************* stock list **********************/}
    <ListItem disablePadding>
      <ListItemButton
         onClick={() => handleItemClick("stocklist")}
        // selected={activeItem === "product"}
      >
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Stock List" />
      </ListItemButton>
    </ListItem>
    {/******************* stock list **********************/}
    <ListItem disablePadding>
      <ListItemButton
         onClick={() => handleItemClick("banner")}
        // selected={activeItem === "product"}
      >
        <ListItemIcon>
          <AddPhotoAlternateIcon />
        </ListItemIcon>
        <ListItemText primary="Add Banner" />
      </ListItemButton>
    </ListItem>

    <Divider sx={{ my: 1 }} />
  </List>
  );
};

export default DashboardSidebar;
