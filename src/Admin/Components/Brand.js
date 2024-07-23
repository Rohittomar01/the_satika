import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { postData } from "../../Services/ServerServices";
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";

export default function Brand() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const body = {
        brand_name: data.brand_name,
        brand_description: data.brand_description,
        created_by: "admin",
      };

      const response = await postData("product/add-brand", body);

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
    <Box component={"div"} className="brand_mainContainer">
      <Paper elevation={4} id="paper">
        <Grid container>
          <Grid item xs={12}>
            <Typography id="brand_mainHeading" variant="h5">
              Brand
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="brand_name"
                    label="Brand Name"
                    name="brand_name"
                    variant="outlined"
                    {...register("brand_name", { required: "Name is required" })}
                    error={!!errors.brand_name}
                    helperText={errors.brand_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="brand_description"
                    label="Brand Description"
                    name="brand_description"
                    variant="outlined"
                    {...register("brand_description")}
                    error={!!errors.brand_description}
                    helperText={errors.brand_description?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    id="brand_button"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    id="brand_button"
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
