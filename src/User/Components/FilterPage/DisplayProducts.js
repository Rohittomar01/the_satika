import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button } from "@mui/material";
import "../../StyleSheets/FilterPage/DisplayProducts.css";
export default function DisplayProducts() {
  const product = [
    {
      product_id: 1,
      product_name: "Product 1",
      product_description: "Description for product 1",
      product_image:
        "https://images.unsplash.com/photo-1572470176170-98fa8abcb741?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FyZWV8ZW58MHwxfDB8fHww",
      price: 10.99,
      discount_id: 101,
      stock_id: 201,
      trend: "yes",
      new_arrival: "yes",
      top_selling: "no",
      category_id: 301,
      occasion_id: 401,
      craft_id: 501,
      fabric_id: 601,
      color_id: 701,
      origin_id: 801,
      brand_id: 901,
    },
    {
      product_id: 2,
      product_name: "Product 2",
      product_description: "Description for product 2",
      product_image:
        "https://images.unsplash.com/photo-1609748341905-080e077af4ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHNhcmVlfGVufDB8MXwwfHx8MA%3D%3D",
      price: 15.99,
      discount_id: 102,
      stock_id: 202,
      trend: "no",
      new_arrival: "yes",
      top_selling: "yes",
      category_id: 302,
      occasion_id: 402,
      craft_id: 502,
      fabric_id: 602,
      color_id: 702,
      origin_id: 802,
      brand_id: 902,
    },
    {
      product_id: 3,
      product_name: "Product 3",
      product_description: "Description for product 3",
      product_image:
        "https://images.unsplash.com/photo-1692992193981-d3d92fabd9cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHNhcmVlfGVufDB8MXwwfHx8MA%3D%3D",
      price: 20.99,
      discount_id: 103,
      stock_id: 203,
      trend: "yes",
      new_arrival: "no",
      top_selling: "no",
      category_id: 303,
      occasion_id: 403,
      craft_id: 503,
      fabric_id: 603,
      color_id: 703,
      origin_id: 803,
      brand_id: 903,
    },
    {
      product_id: 4,
      product_name: "Product 4",
      product_description: "Description for product 4",
      product_image:
        "https://plus.unsplash.com/premium_photo-1661891208364-1e204c01b52c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHNhcmVlfGVufDB8MXwwfHx8MA%3D%3D",
      price: 25.99,
      discount_id: 104,
      stock_id: 204,
      trend: "no",
      new_arrival: "yes",
      top_selling: "yes",
      category_id: 304,
      occasion_id: 404,
      craft_id: 504,
      fabric_id: 604,
      color_id: 704,
      origin_id: 804,
      brand_id: 904,
    },
    {
      product_id: 5,
      product_name: "Product 5",
      product_description: "Description for product 5",
      product_image:
        "https://plus.unsplash.com/premium_photo-1691030255526-c6661c7f713f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHNhcmVlfGVufDB8MXwwfHx8MA%3D%3D",
      price: 30.99,
      discount_id: 105,
      stock_id: 205,
      trend: "yes",
      new_arrival: "no",
      top_selling: "no",
      category_id: 305,
      occasion_id: 405,
      craft_id: 505,
      fabric_id: 605,
      color_id: 705,
      origin_id: 805,
      brand_id: 905,
    },
    {
      product_id: 6,
      product_name: "Product 6",
      product_description: "Description for product 6",
      product_image:
        "https://images.unsplash.com/photo-1716504628105-bd76d91e85f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHNhcmVlfGVufDB8MXwwfHx8MA%3D%3D",
      price: 35.99,
      discount_id: 106,
      stock_id: 206,
      trend: "no",
      new_arrival: "yes",
      top_selling: "yes",
      category_id: 306,
      occasion_id: 406,
      craft_id: 506,
      fabric_id: 606,
      color_id: 706,
      origin_id: 806,
      brand_id: 906,
    },
    {
      product_id: 7,
      product_name: "Product 7",
      product_description: "Description for product 7",
      product_image:
        "https://images.unsplash.com/photo-1615886753866-79396abc446e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHNhcmVlfGVufDB8MXwwfHx8MA%3D%3D",
      price: 40.99,
      discount_id: 107,
      stock_id: 207,
      trend: "yes",
      new_arrival: "no",
      top_selling: "no",
      category_id: 307,
      occasion_id: 407,
      craft_id: 507,
      fabric_id: 607,
      color_id: 707,
      origin_id: 807,
      brand_id: 907,
    },
    {
      product_id: 8,
      product_name: "Product 8",
      product_description: "Description for product 8",
      product_image:
        "https://images.unsplash.com/photo-1684961415565-80383f48c0c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNhcmVlfGVufDB8MXwwfHx8MA%3D%3D",
      price: 45.99,
      discount_id: 108,
      stock_id: 208,
      trend: "no",
      new_arrival: "yes",
      top_selling: "yes",
      category_id: 308,
      occasion_id: 408,
      craft_id: 508,
      fabric_id: 608,
      color_id: 708,
      origin_id: 808,
      brand_id: 908,
    },
    {
      product_id: 9,
      product_name: "Product 9",
      product_description: "Description for product 9",
      product_image:
        "https://images.unsplash.com/photo-1610030469839-f909584b43f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNhcmVlfGVufDB8MXwwfHx8MA%3D%3D",
      price: 50.99,
      discount_id: 109,
      stock_id: 209,
      trend: "yes",
      new_arrival: "no",
      top_selling: "no",
      category_id: 309,
      occasion_id: 409,
      craft_id: 509,
      fabric_id: 609,
      color_id: 709,
      origin_id: 809,
      brand_id: 909,
    },
    {
      product_id: 10,
      product_name: "Product 10",
      product_description: "Description for product 10",
      product_image:
        "https://plus.unsplash.com/premium_photo-1661964253167-abf4772f72cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNhcmVlfGVufDB8MXwwfHx8MA%3D%3D",
      price: 55.99,
      discount_id: 110,
      stock_id: 210,
      trend: "no",
      new_arrival: "yes",
      top_selling: "yes",
      category_id: 310,
      occasion_id: 410,
      craft_id: 510,
      fabric_id: 610,
      color_id: 710,
      origin_id: 810,
      brand_id: 910,
    },
  ];
  const renderProductCard = () => {
    return product.map((product) => {
      return (
        <div className="products-content-container" key={product.id}>
          <Card sx={{ maxWidth: 240 }}>
            <CardMedia
              className="product-media"
              component="img"
              // height="194"
              image={product.product_image}
              alt={product.product_name}
            />
            <CardContent>
              <Typography
                id="card-description"
                variant="body2"
                color="text.secondary"
              >
                {product.product_description}
              </Typography>
              <Typography id="card-price" component={"h3"}>
                Rs.{product.price}
              </Typography>
            </CardContent>
            <CardActions className="card-action-container" disableSpacing>
              <Box component={"div"}>
                <IconButton aria-label="add to favorites">
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </Box>
              <Box>
                <Button id="buy_now_button" variant="outlined">
                  Buy Now
                </Button>
              </Box>
            </CardActions>
          </Card>
        </div>
      );
    });
  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div className="sub_container">{renderProductCard()}</div>
    </div>
  );
}
