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
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";


export default function Color() {
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
        color_name: data.color_name,
        color_code: data.color_code,
        created_by: "admin",
      };

      const response = await postData("product/add-color", body);

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
    <Box component={"div"} className="color_mainContainer">
      <Paper elevation={4} id="paper">
        <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography id="category_mainHeading" variant="h5">
                Color
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
                onClick={() => navigate("/dashboard/ColorList")}
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
                    id="color_name"
                    label="Color Name"
                    name="color_name"
                    variant="outlined"
                    {...register("color_name", { required: "Name is required" })}
                    error={!!errors.color_name}
                    helperText={errors.color_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="color_code"
                    label="Color Code"
                    name="color_code"
                    variant="outlined"
                    {...register("color_code", {
                      required: "Color code is required",
                    })}
                    error={!!errors.color_code}
                    helperText={errors.color_code?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    id="color_button"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    id="color_button"
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
