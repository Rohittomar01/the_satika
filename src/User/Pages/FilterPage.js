import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { Breadcrumbs, Link } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setDropdownValue, resetFilters } from "../../Store/Slices/filter";
import "../StyleSheets/FilterPage/FilterPage.css";
import FilterBar from "../Components/FilterPage/FilterBar";
import NavBar from "../Common_Components/NavBar";
import DisplayProducts from "../Components/FilterPage/DisplayProducts";
import Footer from "../Common_Components/Footer";
import { useLocation } from "react-router-dom";
// import BreadCrumps from "../Common_Components/BreadCrumps";

export default function FilterPage() {
  const location = useLocation();
  const { category_name } = location?.state || { category_name: "" };

  const dispatch = useDispatch();
  const dropdownValue = useSelector((state) => state.filters.dropdownValue);

  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);

  const {
    control,
    handleSubmit,
    reset: resetForm,
    setValue,
  } = useForm({
    defaultValues: {
      filter: dropdownValue || "",
    },
  });

  const handleReset = () => {
    setReset(true);
    dispatch(resetFilters());
    resetForm({ filter: "" });
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ height: "120vh" }}>
      <Grid container className="main_grid">
        <Grid item xs={12} xl={12} sm={12}>
          <NavBar />
        </Grid>

        <Grid
          className="grid_container02"
          container
          xs={11.5}
          xl={11.5}
          sm={11.5}
        >
          <Grid item xs={4} xl={4} sm={4}>
            <div className="filter_actions">
              <div>
                <Typography id="filter_by">Filter By:</Typography>
              </div>
              <div>
                <Button
                  onClick={handleReset}
                  id="reset_button"
                  variant="text"
                  endIcon={<RotateLeftIcon />}
                >
                  Reset
                </Button>
              </div>
              <div>
                <IconButton onClick={handleOpen} aria-label="delete">
                  <ExpandCircleDownIcon
                    className={`expend_icon ${open ? "open" : ""}`}
                  />
                </IconButton>
              </div>
            </div>
          </Grid>
          <Grid className="filterBy_dropdown" item xs={8} xl={8} sm={8}>
            <FormControl sx={{ minWidth: 180 }} size="small">
              <InputLabel id="demo-select-small-label">Filter By:</InputLabel>
              <Controller
                name="filter"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={1}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={field.value}
                    label="Filter By"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      dispatch(setDropdownValue(e.target.value));
                    }}
                  >
                    <MenuItem id="menuItem" value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem id="menuItem" value={1}>
                      New Arrival
                    </MenuItem>
                    <MenuItem id="menuItem" value={2}>
                      Top Selling
                    </MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        {open ? null : (
          <Grid item xs={3} xl={3} sm={3}>
            <FilterBar
              resetState={reset}
              setResetState={setReset}
              categoryName={category_name}
            />
          </Grid>
        )}
        <Grid item xs={open ? 12 : 9} xl={open ? 12 : 9} sm={open ? 12 : 9}>
          <DisplayProducts />
        </Grid>
      </Grid>
      <Grid id="footer" item xs={12} xl={12} sm={12}>
        <Footer />
      </Grid>
    </div>
  );
}
