import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Breadcrumbs, Link, Typography, IconButton } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../StyleSheets/FilterPage/FilterPage.css";
import FilterBar from "../Components/FilterPage/FilterBar";
import NavBar from "../Common_Components/NavBar";
import DisplayProducts from "../Components/FilterPage/DisplayProducts";
import Footer from "../Common_Components/Footer";
import { useLocation } from "react-router-dom";

export default function FilterPage() {
  const location = useLocation();
  const { category_name } = location.state;

  const [filter, setFilter] = React.useState("");
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setReset(true);
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
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
    <div>
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
          <Grid item xs={12} xl={12} sm={12}>
            {" "}
            <div role="presentation" onClick={handleClick}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  MUI
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
                >
                  Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
              </Breadcrumbs>
            </div>
          </Grid>
          <Grid item xs={4} xl={4} sm={4}>
            <div className="filter_actions">
              <div>
                <Typography id="filter_by">Filter By:</Typography>
              </div>
              <div>
                <Button
                  onClick={() => handleReset()}
                  id="reset_button"
                  variant="text"
                  endIcon={<RotateLeftIcon />}
                >
                  Reset:
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
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filter}
                label="Filter By"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem id="menuItem" value={10}>
                  Ten
                </MenuItem>
                <MenuItem id="menuItem" value={20}>
                  Twenty
                </MenuItem>
                <MenuItem id="menuItem" value={30}>
                  Thirty
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {open ? null : (
          <Grid item xs={3} xl={3} sm={3}>
            <FilterBar resetState={reset} setResetState={setReset} categoryName={category_name} />
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
