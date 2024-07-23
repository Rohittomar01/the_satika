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
//   import "../StyleSheets/Occasion.css";
  import { useState } from "react";
  import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
  import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";
  import { useNavigate } from "react-router-dom";


  const StyledTextField = styled(TextField)({
    "& input::placeholder": {
      textTransform: "capitalize",
    },
  });
  
  export default function Occasion() {
    const navigate = useNavigate();
    const [file, setFile] = useState([]);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();
  
    const onSubmit = async (data) => {
      try {
        const body = {
          occasion_name: data.occasion_name,
          occasion_description: data.occasion_description,
          started_at: data.started_at,
          ended_at: data.ended_at,
          created_by: "admin",
        };
        // console.log(body);
        const response = await postData("product/add-occasion", body);
  
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
  
  
    const handleReset = () => {
      reset();
    };
  
    return (
      <Box component={"div"} className="occasion_mainContainer">
        <Paper elevation={4} id="paper">
          <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography id="category_mainHeading" variant="h5">
             Occasion
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
              onClick={() => navigate("/dashboard/OccasionList")}
              aria-label="list"
            >
              <FormatListBulletedIcon />
            </IconButton>
          </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      inputProps={{ style: { textTransform: "capitalize" } }}
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
                    <StyledTextField
                      fullWidth
                      inputProps={{ style: { textTransform: "capitalize" } }}
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
                      InputLabelProps={{ shrink: true }}
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
                      InputLabelProps={{ shrink: true }}
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
  