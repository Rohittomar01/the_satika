import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Divider, Checkbox, FormControlLabel, Typography, Slider } from "@mui/material";
import { getData } from "../../../Services/ServerServices";
import { useForm, Controller } from "react-hook-form";

export default function FilterBar() {
  const [colors, setColors] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [crafts, setCrafts] = React.useState([]);
  const [fabrics, setFabrics] = React.useState([]);
  const [origins, setOrigins] = React.useState([]);
  const [priceRanges, setPriceRanges] = React.useState([]);

  const [selectedFilters, setSelectedFilters] = React.useState({
    colors: [],
    brands: [],
    crafts: [],
    fabrics: [],
    origins: [],
  });

  const [priceRange, setPriceRange] = React.useState([0, 1000]); // Default range [min, max]

  const { control } = useForm();

  const [openSections, setOpenSections] = React.useState({
    color: false,
    brand: false,
    craft: false,
    fabric: false,
    origin: false,
    price: false,
  });

  const handleClick = (section) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [section]: !prevOpenSections[section],
    }));
  };

  const fetchOptions = async () => {
    try {
      const colorResult = await getData("product/fetch-colors");
      setColors(colorResult.data);

      const brandResult = await getData("product/fetch-brands");
      setBrands(brandResult.data);

      const craftResult = await getData("product/fetch-crafts");
      setCrafts(craftResult.data);

      const fabricResult = await getData("product/fetch-fabrics");
      setFabrics(fabricResult.data);

      const originResult = await getData("product/fetch-origins");
      setOrigins(originResult.data);

      const priceResult = await getData("product/fetch-price-ranges");
      setPriceRanges(priceResult.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  React.useEffect(() => {
    fetchOptions();
  }, []);

  const handleCheckboxChange = (category, value, isChecked) => {
    setSelectedFilters((prevFilters) => {
      const updatedCategory = isChecked
        ? [...prevFilters[category], value]
        : prevFilters[category].filter((item) => item !== value);

      return {
        ...prevFilters,
        [category]: updatedCategory,
      };
    });
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    // Fetch or filter data based on selected price range here
    console.log("Selected price range:", newValue);
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
          {colors.map((color) => (
            <ListItemButton key={color.color_id} sx={{ pl: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.colors.includes(color.color_id)}
                    onChange={(e) => handleCheckboxChange('colors', color.color_id, e.target.checked)}
                  />
                }
                label={color.color_name}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <Divider />

      {/* Brand Section */}
      <ListItemButton onClick={() => handleClick("brand")}>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              fontFamily: openSections.brand
                ? "'Futura bold Italic',sans-serif"
                : "'Futura medium Italic',sans-serif",
            },
          }}
          primary="Brand"
        />
        {openSections.brand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSections.brand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {brands.map((brand) => (
            <ListItemButton key={brand.brand_id} sx={{ pl: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.brands.includes(brand.brand_id)}
                    onChange={(e) => handleCheckboxChange('brands', brand.brand_id, e.target.checked)}
                  />
                }
                label={brand.brand_name}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <Divider />

      {/* Craft Section */}
      <ListItemButton onClick={() => handleClick("craft")}>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              fontFamily: openSections.craft
                ? "'Futura bold Italic',sans-serif"
                : "'Futura medium Italic',sans-serif",
            },
          }}
          primary="Craft"
        />
        {openSections.craft ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSections.craft} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {crafts.map((craft) => (
            <ListItemButton key={craft.craft_id} sx={{ pl: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.crafts.includes(craft.craft_id)}
                    onChange={(e) => handleCheckboxChange('crafts', craft.craft_id, e.target.checked)}
                  />
                }
                label={craft.craft_name}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <Divider />

      {/* Fabric Section */}
      <ListItemButton onClick={() => handleClick("fabric")}>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              fontFamily: openSections.fabric
                ? "'Futura bold Italic',sans-serif"
                : "'Futura medium Italic',sans-serif",
            },
          }}
          primary="Fabric"
        />
        {openSections.fabric ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSections.fabric} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {fabrics.map((fabric) => (
            <ListItemButton key={fabric.fabric_id} sx={{ pl: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.fabrics.includes(fabric.fabric_id)}
                    onChange={(e) => handleCheckboxChange('fabrics', fabric.fabric_id, e.target.checked)}
                  />
                }
                label={fabric.fabric_name}
              />
            </ListItemButton>
          ))}
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
          {origins.map((origin) => (
            <ListItemButton key={origin.origin_id} sx={{ pl: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.origins.includes(origin.origin_id)}
                    onChange={(e) => handleCheckboxChange('origins', origin.origin_id, e.target.checked)}
                  />
                }
                label={origin.origin_name}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <Divider />

      {/* Price Range Section */}
      <ListItemButton onClick={() => handleClick("price")}>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              fontFamily: openSections.price
                ? "'Futura bold Italic',sans-serif"
                : "'Futura medium Italic',sans-serif",
            },
          }}
          primary="Price Range"
        />
        {openSections.price ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSections.price} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 2 }}>
          <Typography gutterBottom>Price Range: ${priceRange[0]} - ${priceRange[1]}</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000} // Adjust max value as needed
            step={10} // Adjust step value as needed
          />
        </List>
      </Collapse>
    </List>
  );
}
