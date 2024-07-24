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

export default function Stock() {
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
        product_id: data.product_id,
        stock_quantity: data.stock_quantity,
        created_by: "admin",
      };

      const response = await postData("product/add-stock", body);

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
    <Box component={"div"} className="stock_mainContainer">
      <Paper elevation={4} id="paper">
        <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography id="category_mainHeading" variant="h5">
               Stock
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
              onClick={() => navigate("/dashboard/StockList")}
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
                    id="product_id"
                    label="Product ID"
                    name="product_id"
                    variant="outlined"
                    {...register("product_id", { required: "Product ID is required" })}
                    error={!!errors.product_id}
                    helperText={errors.product_id?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="stock_quantity"
                    label="Stock Quantity"
                    name="stock_quantity"
                    variant="outlined"
                    {...register("stock_quantity", {
                      required: "Stock Quantity is required",
                    })}
                    error={!!errors.stock_quantity}
                    helperText={errors.stock_quantity?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    id="stock_button"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    id="stock_button"
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
