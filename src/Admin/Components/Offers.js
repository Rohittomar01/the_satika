import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import { useForm } from "react-hook-form";
  import { postData } from "../../Services/ServerServices";
  import { useState } from "react";
  import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";
  import "../StyleSheets/Category.css";
  
  export default function Offers() {
    const [file, setFile] = useState(null);
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
        const response = await postData("offers/add_offers", body, {
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
      <Box component={"div"} className="category_mainContainer">
        <Paper elevation={4} style={{marginTop:"25vh"}} id="paper">
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography id="category_mainHeading" variant="h5">
                Offer
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      variant="outlined"
                      {...register("title", { required: "Title is required" })}
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="offer_description"
                      label="Offer Description"
                      name="offer_description"
                      variant="outlined"
                      {...register("offer_description", {
                        required: "Offer description is required",
                      })}
                      error={!!errors.offer_description}
                      helperText={errors.offer_description?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
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
                      {...register("start_date", { required: "Start date is required" })}
                      error={!!errors.start_date}
                      helperText={errors.start_date?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
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
                      {...register("end_date", { required: "End date is required" })}
                      error={!!errors.end_date}
                      helperText={errors.end_date?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="discount_type"
                      label="Discount Type"
                      name="discount_type"
                      variant="outlined"
                      select
                      {...register("discount_type", {
                        required: "Discount type is required",
                      })}
                      error={!!errors.discount_type}
                      helperText={errors.discount_type?.message}
                    >
                      <MenuItem value="percentage">Percentage</MenuItem>
                      <MenuItem value="fixed">Fixed Amount</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="discount_value"
                      label="Discount Value"
                      name="discount_value"
                      variant="outlined"
                      type="number"
                      {...register("discount_value", {
                        required: "Discount value is required",
                      })}
                      error={!!errors.discount_value}
                      helperText={errors.discount_value?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="minimum_order_value"
                      label="Minimum Order Value"
                      name="minimum_order_value"
                      variant="outlined"
                      type="number"
                      {...register("minimum_order_value", {
                        required: "Minimum order value is required",
                      })}
                      error={!!errors.minimum_order_value}
                      helperText={errors.minimum_order_value?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="maximum_discount_amount"
                      label="Maximum Discount Amount"
                      name="maximum_discount_amount"
                      variant="outlined"
                      type="number"
                      {...register("maximum_discount_amount", {
                        required: "Maximum discount amount is required",
                      })}
                      error={!!errors.maximum_discount_amount}
                      helperText={errors.maximum_discount_amount?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="applicable_to"
                      label="Applicable To"
                      name="applicable_to"
                      variant="outlined"
                      {...register("applicable_to", {
                        required: "Applicable to is required",
                      })}
                      error={!!errors.applicable_to}
                      helperText={errors.applicable_to?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="usage_limit"
                      label="Usage Limit"
                      name="usage_limit"
                      variant="outlined"
                      type="number"
                      {...register("usage_limit", {
                        required: "Usage limit is required",
                      })}
                      error={!!errors.usage_limit}
                      helperText={errors.usage_limit?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="per_user_limit"
                      label="Per User Limit"
                      name="per_user_limit"
                      variant="outlined"
                      type="number"
                      {...register("per_user_limit", {
                        required: "Per user limit is required",
                      })}
                      error={!!errors.per_user_limit}
                      helperText={errors.per_user_limit?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="status"
                      label="Status"
                      name="status"
                      variant="outlined"
                      {...register("status", {
                        required: "Status is required",
                      })}
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      id="offers_button"
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      id="offers_button"
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
  }
  