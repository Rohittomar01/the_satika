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
import Swal from "sweetalert2";
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";

export default function Fabric() {
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

      const response = await postData("fabric/submitFabric_Data", body, {
        method: "POST",
      });

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
          <Grid item xs={12}>
            <Typography id="fabric_mainHeading" variant="h5">
              Fabric
            </Typography>
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
