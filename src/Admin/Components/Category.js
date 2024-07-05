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
import "D:/The_Satika/the_satika/src/Admin/StyleSheets/Category.css";
import { useState } from "react";
import Swal from "sweetalert2";
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";

export default function Category() {
  // const validationSchema = yup.object({
  //   name: yup.string().required("Name is required"),
  //   description: yup.string(),
  // });
  const [file, setFile] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //   console.log("filllllllllllle",file)

  const onSubmit = async (data) => {
    const date = new Date();
    console.log("fileeeeeeeeeeeeee", file);

    const refineDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    try {
      const body = {
        name: data.name,
        description: data.description,
        file: file,
        created_at: refineDate,
        updated_at: refineDate,
        created_by: "admin",
      };
      const response = await postData("category/submitCategory_Data", body, {
        method: "POST",
      });

      console.log("responce", response);
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
    console.log("file", event.target.files[0]);
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
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 56, height: 56 }}
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
