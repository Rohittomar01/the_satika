import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Avatar,
  Button,
  Switch,
  FormControlLabel,
  Autocomplete,
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { getData, postData } from "../../Services/ServerServices";
import "../StyleSheets/Category.css";
import { useCallback, useEffect, useState } from "react";
import Sweet_Alert from "../../Common_Components/alerts/Sweet_Alert";
import UploadButton from "../../Common_Components/UploadButton";
import { useActiveItem } from "../../Common_Components/ActiveItemContext";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";

const sampleData = {
  categories: [
    { id: 1, name: "Clothing" },
    { id: 2, name: "Electronics" },
  ],
  occasions: [
    { id: 1, name: "Wedding" },
    { id: 2, name: "Birthday" },
  ],
  crafts: [
    { id: 1, name: "Handmade" },
    { id: 2, name: "Machine-made" },
  ],
  fabrics: [
    { id: 1, name: "Cotton" },
    { id: 2, name: "Silk" },
  ],
  colors: [
    { id: 1, name: "Red" },
    { id: 2, name: "Blue" },
  ],
  origins: [
    { id: 1, name: "USA" },
    { id: 2, name: "India" },
  ],
  brands: [
    { id: 1, name: "Brand A" },
    { id: 2, name: "Brand B" },
  ],
};

export default function Product() {
  const navigate = useNavigate();
  const { setActiveItem } = useActiveItem();
  const [hover, setHover] = useState(false);
  const [file, setFile] = useState(null);
  const [occasions, setOccasions] = useState([]);
  const [Crafts, setCrafts] = useState([]);
  const [Fabrics, setFabrics] = useState([]);
  const [Colors, setColors] = useState([]);
  const [Origins, setOrigins] = useState([]);
  const [Brands, setBrands] = useState([]);

  const fetchOccasions = useCallback(async () => {
    var response = await getData("product/fetch-occasions");
    setOccasions(response.data);
  });
  const fetchCrafts = useCallback(async () => {
    var response = await getData("product/fetch-crafts");
    setCrafts(response.data);
  });
  const fetchFabrics = useCallback(async () => {
    var response = await getData("product/fetch-fabrics");
    setFabrics(response.data);
  });
  const fetchColors = useCallback(async () => {
    var response = await getData("product/fetch-colors");
    setColors(response.data);
  });
  const fetchOrigins = useCallback(async () => {
    var response = await getData("product/fetch-origins");
    setOrigins(response.data);
  });
  const fetchBrands = useCallback(async () => {
    var response = await getData("product/fetch-brands");
    setBrands(response.data);
  });

  // console.log(occasions)

  useEffect(() => {
    fetchOccasions();
    fetchCrafts();
    fetchFabrics();
    fetchColors();
    fetchOrigins();
    fetchBrands();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    var body = {
      ...data,
      created_by: "admin",
    };

    try {
      const response = await postData("product/add-product", body);
      console.log("res",response.data)
      if (response && response.message) {
        if (file) {
          var fileFormData = new FormData();
          fileFormData.append("file", file);
          fileFormData.append("product_id", response.data.insertId);

          const fileResponse = await postData(
            "product/upload-file",
            fileFormData
          );

          if (fileResponse && fileResponse.message) {
            await Sweet_Alert({ title: fileResponse.message, icon: "success" });
            // reset();
            // setFile(null);
          } else {
            await Sweet_Alert({
              title:
                "An error occurred while uploading the file. Please try again.",
              icon: "error",
            });
          }
        }
      } else {
        Sweet_Alert({ title: response.message, icon: "error" });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleReset = () => {
    reset();
    setFile(null);
  };

  const handleButtonClick = () => {
    setActiveItem("productlist");
  };

  return (
    <Box
      component={"div"}
      sx={{ marginTop: "35%" }}
      className="category_mainContainer"
    >
      <Paper elevation={4} id="paper">
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography id="category_mainHeading" variant="h5">
              Product
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
              onClick={() => navigate("/dashboard/ProductsList")}
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
                    id="product_name"
                    label="Product Name"
                    name="product_name"
                    variant="outlined"
                    {...register("product_name", {
                      required: "Product Name is required",
                    })}
                    error={!!errors.product_name}
                    helperText={errors.product_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="product_description"
                    label="Product Description"
                    name="product_description"
                    variant="outlined"
                    {...register("product_description", {
                      required: "Product Description is required",
                    })}
                    error={!!errors.product_description}
                    helperText={errors.product_description?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    variant="outlined"
                    {...register("price", { required: "Price is required" })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="discount"
                    label="Discount"
                    name="discount"
                    variant="outlined"
                    {...register("discount", {
                      required: "Discount is required",
                    })}
                    error={!!errors.discount}
                    helperText={errors.discount?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="stock"
                    label="Stock"
                    name="stock"
                    variant="outlined"
                    {...register("stock", { required: "Stock is required" })}
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="new_arrival"
                    label="New Arrival"
                    name="new_arrival"
                    variant="outlined"
                    {...register("new_arrival", {
                      required: "New Arrival is required",
                    })}
                    error={!!errors.new_arrival}
                    helperText={errors.new_arrival?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="top_selling"
                    label="Top Selling"
                    name="top_selling"
                    variant="outlined"
                    {...register("top_selling", {
                      required: "Top Selling is required",
                    })}
                    error={!!errors.top_selling}
                    helperText={errors.top_selling?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="category"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={sampleData.categories.map(
                          (option) => option.name
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...register("category", {
                              required: "Category is required",
                            })}
                            {...params}
                            label="Category"
                            variant="outlined"
                            error={!!errors.category}
                            helperText={errors.category?.message}
                          />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="occasion"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={occasions.map(
                          (option) => option.occasion_name
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...register("occasion", {
                              required: "Occasion is required",
                            })}
                            {...params}
                            label="Occasion"
                            variant="outlined"
                            error={!!errors.occasion}
                            helperText={errors.occasion?.message}
                          />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="craft"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={Crafts.map((option) => option.craft_name)}
                        renderInput={(params) => (
                          <TextField
                            {...register("craft", {
                              required: "Craft is required",
                            })}
                            {...params}
                            label="Craft"
                            variant="outlined"
                            error={!!errors.craft}
                            helperText={errors.craft?.message}
                          />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="fabric"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={Fabrics.map((option) => option.fabric_name)}
                        renderInput={(params) => (
                          <TextField
                            {...register("fabric", {
                              required: "Fabric is required",
                            })}
                            {...params}
                            label="Fabric"
                            variant="outlined"
                            error={!!errors.fabric}
                            helperText={errors.fabric?.message}
                          />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="color"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={Colors.map((option) => option.color_name)}
                        renderInput={(params) => (
                          <TextField
                            {...register("color", {
                              required: "Color is required",
                            })}
                            {...params}
                            label="Color"
                            variant="outlined"
                            error={!!errors.color}
                            helperText={errors.color?.message}
                          />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="origin"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={Origins.map((option) => option.region_name)}
                        renderInput={(params) => (
                          <TextField
                            {...register("origin", {
                              required: "Origin is required",
                            })}
                            {...params}
                            label="Origin"
                            variant="outlined"
                            error={!!errors.origin}
                            helperText={errors.origin?.message}
                          />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="brand"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={Brands.map((option) => option.brand_name)}
                        renderInput={(params) => (
                          <TextField
                            {...register("brand", {
                              required: "Brand is required",
                            })}
                            {...params}
                            label="Brand"
                            variant="outlined"
                            error={!!errors.brand}
                            helperText={errors.brand?.message}
                          />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  sm={6}
                >
                  <Controller
                    name="Trending"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label="Trending"
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <UploadButton handleFile={handleFile} />
                  <Avatar
                    alt="Product Image"
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "/static/images/avatar/1.jpg"
                    }
                    sx={{ width: 100, height: 100, borderRadius: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    id="category_button"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    id="category_button"
                    onClick={handleReset}
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
