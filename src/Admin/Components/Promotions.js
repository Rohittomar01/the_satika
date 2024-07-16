import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { postData } from "../../Services/ServerServices";
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";

const Promotions = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const date = new Date();
    const refineDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    try {
      const body = {
        ...data,
        created_at: refineDate,
        updated_at: refineDate,
        created_by: "admin",
      };
      const response = await postData("promotion/add_promotion", body, {
        method: "POST",
      });

      console.log("response", response);
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

  return (
    <Box component={"div"} className="promotion_mainContainer">
      <Paper elevation={4} style={{ marginTop: "25vh" }} id="paper">
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography id="promotion_mainHeading" variant="h5">
              Promotion
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
              onClick={() => navigate("/dashboard/PromotionsList")}
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
                    id="title"
                    label="Title"
                    name="title"
                    variant="outlined"
                    {...register("title", {
                      required: "Title is required",
                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="status"
                    label="Status"
                    name="status"
                    variant="outlined"
                    select
                    {...register("status", {
                      required: "Status is required",
                    })}
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="promotion_description"
                    label="Promotion Description"
                    name="promotion_description"
                    variant="outlined"
                    multiline
                    {...register("promotion_description")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="start_date"
                    label="Start Date"
                    name="start_date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("start_date", {
                      required: "Start date is required",
                    })}
                    error={!!errors.start_date}
                    helperText={errors.start_date?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="end_date"
                    label="End Date"
                    name="end_date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("end_date", {
                      required: "End date is required",
                    })}
                    error={!!errors.end_date}
                    helperText={errors.end_date?.message}
                  />
                </Grid>
               
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => reset()}
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
};

export default Promotions;
