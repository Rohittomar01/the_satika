import React, { useState } from "react";
import { Box, Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { postData } from "../../Services/ServerServices";
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";

export default function Banner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = async (data) => {
    var formData = new FormData();
    formData.append("title", data.title);
    formData.append("banner_description", data.banner_description);
    formData.append("picture", selectedFile);
    formData.append("started_at", data.started_at);
    formData.append("ended_at", data.ended_at);
    formData.append("status", data.status);
    formData.append("created_by", "admin");
    // console.log([...formData.entries()]);
    try {
      const response = await postData("banner/add_banner", formData);

      if (response) {
        Sweet_Alert({ title: response.message, icon: "success" });
      } else {
        Sweet_Alert({ title: response.message, icon: "error" });
      }

      reset();
      setSelectedFile(null);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleReset = () => {
    reset();
    setSelectedFile(null);
  };

  return (
    <Box component={"div"} className="banner_mainContainer">
      <Paper elevation={4} id="paper">
        <Grid container>
          <Grid item xs={12}>
            <Typography id="banner_mainHeading" variant="h5">
              Banner
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    // id="title"
                    label="Title"
                    name="title"
                    variant="outlined"
                    {...register("title", { required: "Title is required" })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="banner_description"
                    label="Banner Description"
                    name="banner_description"
                    variant="outlined"
                    {...register("banner_description", {
                      required: "Description is required",
                    })}
                    error={!!errors.banner_description}
                    helperText={errors.banner_description?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <input
                    type="file"
                    accept="image/*"
                    id="picture"
                    name="picture"
                    onChange={handleFileChange}
                    style={{ display: "block", margin: "10px 0" }}
                  />
                  {errors.image && <p>{errors.image.message}</p>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="started_at"
                    label="Start Date"
                    type="datetime-local"
                    name="started_at"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    {...register("started_at", {
                      required: "Start date is required",
                    })}
                    error={!!errors.started_at}
                    helperText={errors.started_at?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="ended_at"
                    label="End Date"
                    type="datetime-local"
                    name="ended_at"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    {...register("ended_at", {
                      required: "End date is required",
                    })}
                    error={!!errors.ended_at}
                    helperText={errors.ended_at?.message}
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
                    {...register("status", { required: "Status is required" })}
                    error={!!errors.status}
                    helperText={errors.status?.message}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    id="banner_button"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    id="banner_button"
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
