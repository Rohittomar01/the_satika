import React, { useEffect, useState } from "react";
import { getData } from "../../../Services/ServerServices";
import {
  Checkbox,
  FormControlLabel,
  Slider,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setPriceRange } from "../../../Store/Slices/filter";

export default function FilterBar({ resetState, setResetState }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters || {}); // Safe access

  const {
    colors: reduxColors = [],
    brands: reduxBrands = [],
    crafts: reduxCrafts = [],
    fabrics: reduxFabrics = [],
    origins: reduxOrigins = [],
    priceRange: reduxPriceRange = [0, 10000],
  } = filters;

  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    colors: reduxColors,
    brands: reduxBrands,
    crafts: reduxCrafts,
    fabrics: reduxFabrics,
    origins: reduxOrigins,
  });
  const [priceRange, setPriceRangeState] = useState([0, 10000]);
  const [openSections, setOpenSections] = useState({
    color: false,
    brand: false,
    craft: false,
    fabric: false,
    origin: false,
    price: false,
  });

  useEffect(() => {
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

  useEffect(() => {
    dispatch(
      setFilters({ category: "colors", values: selectedFilters.colors })
    );
    dispatch(
      setFilters({ category: "brands", values: selectedFilters.brands })
    );
    dispatch(
      setFilters({ category: "crafts", values: selectedFilters.crafts })
    );
    dispatch(
      setFilters({ category: "fabrics", values: selectedFilters.fabrics })
    );
    dispatch(
      setFilters({ category: "origins", values: selectedFilters.origins })
    );
    dispatch(setPriceRange(priceRange));
  }, [selectedFilters, priceRange, dispatch]);

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

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeState(newValue);
  };

  useEffect(() => {
    if (resetState) {
      setSelectedFilters({
        colors: [],
        brands: [],
        crafts: [],
        fabrics: [],
        origins: [],
      });
      setPriceRangeState([0, 10000]);
    }
  }, [resetState]);

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
            primary="Price"
          />
          {openSections.price ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSections.price} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton>
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={10}
                sx={{ width: "80%", mx: "auto" }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
}
