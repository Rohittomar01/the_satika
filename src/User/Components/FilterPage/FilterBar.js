import React, { useEffect, useState } from "react";
import { getData, postData } from "../../../Services/ServerServices";
import {
  Checkbox,
  FormControlLabel,
  Slider,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../Store/Slices/Products";

export default function FilterBar({ resetState, setResetState, categoryName }) {
  const dispatch = useDispatch();
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [origins, setOrigins] = useState([]);
  // const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    brands: [],
    crafts: [],
    fabrics: [],
    origins: [],
  });

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const [openSections, setOpenSections] = useState({
    color: false,
    brand: false,
    craft: false,
    fabric: false,
    origin: false,
    price: false,
  });

  useEffect(() => {
    // Fetch filter options on mount
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
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleClick = (section) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [section]: !prevOpenSections[section],
    }));
  };

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
  console.log("price", priceRange);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const fetchProducts = async () => {
    try {
      const params = {
        categoryName: categoryName,
        colors: selectedFilters.colors.join(","),
        brands: selectedFilters.brands.join(","),
        crafts: selectedFilters.crafts.join(","),
        fabrics: selectedFilters.fabrics.join(","),
        origins: selectedFilters.origins.join(","),
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };

      const response = await postData("product/fetch-products", params);
      dispatch(setProducts(response.data));
      setResetState(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (resetState) {
      setSelectedFilters({
        colors: [],
        brands: [],
        crafts: [],
        fabrics: [],
        origins: [],
      });
    }
  }, [selectedFilters, priceRange, resetState]);

  return (
    <div>
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
                      checked={selectedFilters.colors.includes(
                        color.color_name
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "colors",
                          color.color_name,
                          e.target.checked
                        )
                      }
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
                      checked={selectedFilters.brands.includes(
                        brand.brand_name
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "brands",
                          brand.brand_name,
                          e.target.checked
                        )
                      }
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
                      checked={selectedFilters.crafts.includes(
                        craft.craft_name
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "crafts",
                          craft.craft_name,
                          e.target.checked
                        )
                      }
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
                      checked={selectedFilters.fabrics.includes(
                        fabric.fabric_name
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "fabrics",
                          fabric.fabric_name,
                          e.target.checked
                        )
                      }
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
                      checked={selectedFilters.origins.includes(
                        origin.origin_name
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "origins",
                          origin.origin_name,
                          e.target.checked
                        )
                      }
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
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 6 }}>
              <Typography id="range-slider" gutterBottom>
                Price range
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={10000}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
      </List>
      {/* <div>
        <Typography variant="h6">Products:</Typography>
        <ul>
          {products.map((product) => (
            <li key={product.product_id}>{product.color}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
