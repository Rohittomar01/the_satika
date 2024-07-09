import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Avatar,
    Button,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import CloudUploadIcon from "@mui/icons-material/CloudUpload";
  import { useForm } from "react-hook-form";
  import { postData } from "../../Services/ServerServices";
//   import "../StyleSheets/Occasion.css";
  import { useState } from "react";
  import Swal from "sweetalert2";
  import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";
  
  export default function Occasion() {
    const [file, setFile] = useState([]);
  
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
          occasion_name: data.occasion_name,
          occasion_description: data.occasion_description,
          started_at: data.started_at,
          ended_at: data.ended_at,
          created_by: "admin",
        };
        console.log(body);
        const response = await postData("occasion/submitOccasion_Data", body, {
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
  
    const handleFile = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleReset = () => {
      reset();
    };
  
    return (
      <Box component={"div"} className="occasion_mainContainer">
        <Paper elevation={4} id="paper">
          <Grid container>
            <Grid item xs={12}>
              <Typography id="occasion_mainHeading" variant="h5">
                Occasion
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="occasion_name"
                      label="Occasion Name"
                      name="occasion_name"
                      variant="outlined"
                      {...register("occasion_name", { required: "Name is required" })}
                      error={!!errors.occasion_name}
                      helperText={errors.occasion_name?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="occasion_description"
                      label="Occasion Description"
                      name="occasion_description"
                      variant="outlined"
                      {...register("occasion_description", {
                        required: "Description is required",
                      })}
                      error={!!errors.occasion_description}
                      helperText={errors.occasion_description?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="started_at"
                      label="Start Date"
                      name="started_at"
                      type="datetime-local"
                      variant="outlined"
                      {...register("started_at", { required: "Start date is required" })}
                      error={!!errors.started_at}
                      helperText={errors.started_at?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="ended_at"
                      label="End Date"
                      name="ended_at"
                      type="datetime-local"
                      variant="outlined"
                      {...register("ended_at", { required: "End date is required" })}
                      error={!!errors.ended_at}
                      helperText={errors.ended_at?.message}
                    />
                  </Grid>
              
             
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      id="occasion_button"
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      id="occasion_button"
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
  