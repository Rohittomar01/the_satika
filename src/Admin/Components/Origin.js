import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton

} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { postData } from "../../Services/ServerServices";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";
import { useNavigate } from "react-router-dom";


export default function Origin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const body = {
        country_name: data.country_name,
        region_name: data.region_name,
        origin_description: data.origin_description,
        created_by: "admin",
      };

      const response = await postData("product/add-origin", body);

      if (response) {
        Sweet_Alert({ title: response.message, icon: "success" });
      } else {
        Sweet_Alert({ title: response.message, icon: "error" });
      }

      reset();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleReset = () => {
    reset();
  };

  return (
    <Box component={"div"} className="origin_mainContainer">
      <Paper elevation={4} id="paper">
        <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography id="category_mainHeading" variant="h5">
               Origin
            </Typography>
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "end" }}
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
          >
            <IconButton
              onClick={() => navigate("/dashboard/OriginList")}
              aria-label="list"
            >
              <FormatListBulletedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="country_name"
                    label="Country Name"
                    name="country_name"
                    variant="outlined"
                    {...register("country_name", { required: "Country name is required" })}
                    error={!!errors.country_name}
                    helperText={errors.country_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="region_name"
                    label="Region Name"
                    name="region_name"
                    variant="outlined"
                    {...register("region_name")}
                    error={!!errors.region_name}
                    helperText={errors.region_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="origin_description"
                    label="Origin Description"
                    name="origin_description"
                    variant="outlined"
                    {...register("origin_description")}
                    error={!!errors.origin_description}
                    helperText={errors.origin_description?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    id="origin_button"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    id="origin_button"
                    onClick={() => handleReset()}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
