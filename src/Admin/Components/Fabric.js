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
import { useNavigate } from "react-router-dom";
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";

export default function Fabric() {
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
        fabric_name: data.fabric_name,
        fabric_description: data.fabric_description,
        created_by: "admin",
      };

      const response = await postData("product/add-fabric", body);

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
    <Box component={"div"} className="fabric_mainContainer">
      <Paper elevation={4} id="paper">
        <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography id="category_mainHeading" variant="h5">
              Fabric
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
              onClick={() => navigate("/dashboard/FabricList")}
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
                    id="fabric_name"
                    label="Fabric Name"
                    name="fabric_name"
                    variant="outlined"
                    {...register("fabric_name", { required: "Name is required" })}
                    error={!!errors.fabric_name}
                    helperText={errors.fabric_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="fabric_description"
                    label="Fabric Description"
                    name="fabric_description"
                    variant="outlined"
                    {...register("fabric_description", {
                      required: "Description is required",
                    })}
                    error={!!errors.fabric_description}
                    helperText={errors.fabric_description?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    id="fabric_button"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    id="fabric_button"
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
