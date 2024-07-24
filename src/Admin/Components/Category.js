import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Avatar,
  Button,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import { postData } from "../../Services/ServerServices";
import "../StyleSheets/Category.css";
import { useState } from "react";
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";

export default function Category() {
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
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("created_at", refineDate);
      formData.append("updated_at", refineDate);
      formData.append("file", file);
      formData.append("created_by", "admin");

      const response = await postData("category/submitCategory_Data", formData, {
        method: "POST",
      });

      console.log("responce", response);
      if (response) {
        setFile(null)
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
    <Box component={"div"} className="category_mainContainer">
      <Paper elevation={4} id="paper">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography id="category_mainHeading" variant="h5">
              Category
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    variant="outlined"
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name} // Set error prop if there's an error for "name"
                    helperText={errors.name?.message} // Display error message if available
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    variant="outlined"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </Grid>
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                >
                  <Button
                    fullWidth
                    component="label"
                    variant="text"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Picture
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => handleFile(e)}
                      multiple={false}
                    />
                  </Button>
                </Grid>
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                >
                  <Avatar
                    alt="Caqtegory Image"
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://th.bing.com/th/id/OIP.VOB_2CiLZ6FSNWDMMGdQKAHaLe?w=198&h=308&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                    }
                    sx={{ width: 65, height: 65 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    id="category_button"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    id="category_button"
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
