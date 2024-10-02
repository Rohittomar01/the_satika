import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  pinCode: yup.string().required("Pin Code is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  street: yup.string().required("Street is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const AddressFormDialog = ({ open, setOpen }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("addrss submit data",data)
    setOpen(false)
    navigate("/checkout")
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Enter Shipping Address
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              {/* Title Field */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Title</InputLabel>
                  <Controller
                    name="Title"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select label="Title" {...field} error={!!errors.title}>
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Mrs">Mrs</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.title && <p>{errors.title.message}</p>}
                </FormControl>
              </Grid>

              {/* Name Field */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Name"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* Pin Code Field */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="pinCode"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Pin Code"
                      error={!!errors.pinCode}
                      helperText={errors.pinCode ? errors.pinCode.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* City/Town Field */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="City/Town"
                      error={!!errors.city}
                      helperText={errors.city ? errors.city.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* State Field */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="State"
                      error={!!errors.state}
                      helperText={errors.state ? errors.state.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* Street Field */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="street"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Street/Building/Locality/Landmark"
                      error={!!errors.street}
                      helperText={errors.street ? errors.street.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* Phone Field */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone"
                      error={!!errors.phone}
                      helperText={errors.phone ? errors.phone.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
              </Grid>

              {/* Checkbox Fields */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Controller
                      name="billingSameAsShipping"
                      control={control}
                      defaultValue={true}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                      )}
                    />
                  }
                  label="Billing address is same as Shipping Address"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Controller
                      name="defaultAddress"
                      control={control}
                      defaultValue={true}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                      )}
                    />
                  }
                  label="Make this my default address"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button style={{color:"red"}} onClick={handleClose}>Cancel</Button>
            <Button onClick={()=>handleSubmit(onSubmit())} type="submit" style={{background:"black"}}  variant="contained" color="primary">
              Continue
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddressFormDialog;
