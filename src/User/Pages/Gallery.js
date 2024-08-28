import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button } from "@mui/material";
import QuickView from "./QuickView";
import "../StyleSheets/Gallery.css";

export default function Gallery() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const imageStyle = {
    height: "500px",
    width: "100%",
    objectFit: "cover",
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  return (
    <>
      <ImageList
        sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}
        cols={4}
        gap={6}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.images} className="imageListItem">
            <img
              onClick={() => handleImageClick(item)}
              srcSet={`${item.images}?w=300&height=450&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.images}?w=300&height=450&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={imageStyle}
            />
            <div className="overlay">
              <Button
                onClick={() => handleImageClick(item)}
                id="quickViewButton"
                size="small"
                variant="outlined"
              >
                Quick View
              </Button>
            </div>
            <ImageListItemBar
              id="galleryImage_title"
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <Button
                  onClick={() => navigate("/productdetails", { state: { item } })}
                  id="buyNow_button"
                  size="small"
                  variant="outlined"
                >
                  Buy Now
                </Button>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      {selectedProduct && (
        <QuickView
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          product={selectedProduct} // Pass the entire product object to QuickView
        />
      )}
    </>
  );
}

const itemData = [
  {
    images: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/27989168/2024/3/2/5ef86fa4-73e3-4266-8d81-d9921dded8751709348581018SidhidataWomensPrintedReadyToWearSareeWithUnstitchedBlousePi1.jpg",
    title: "Royal Blue Silk Saree",
    subtitle: "Traditional Elegance",
    price: "7999",
  },

  {
    images: "https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-ranipink-zariwork-artsilk-designer-saree-saus0021014_ranipink_3_large.jpg?v=1695981170",
    title: "Rani Pink Zari Saree",
    subtitle: "Elegant Weaves",
    price: "11999",
  },
  {
    images: "https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-ranipink-zariwork-net-designer-saree-saus0029319_ranipink_1_large.jpg?v=1685354836",
    title: "Maharani Pink Net Saree",
    subtitle: "Luxury Collection",
    price: "12999",
  },

  {
    images: "https://images.wholesalesalwar.com/2024y/July/51351/Cream-Silk-Wedding%20Wear-Weaving-Saree-MADHUBALA-T-1173%20(2).jpg",
    title: "Cream Silk Wedding Saree",
    subtitle: "Wedding Special",
    price: "14999",
  },
  {
    images: "https://assets.ajio.com/medias/sys_master/root/20230923/eWgZ/650ee5f9ddf7791519f7c61f/-1117Wx1400H-466621422-maroon-MODEL.jpg",
    title: "Maroon Bridal Saree",
    subtitle: "Festive Glam",
    price: "9999",
  },
  {
    images: "https://assets2.andaazfashion.com/media/catalog/product/cache/1/image/800x1200/a12781a7f2ccb3d663f7fd01e1bd2e4e/d/a/dark-green-mehndi-silk-wedding-wear-woven-zari-saree-sarv154007-1.jpg",
    title: "Dark Green Mehndi Saree",
    subtitle: "Traditional Charm",
    price: "10999",
  },
 
  {
    images: "https://images.shaadisaga.com/shaadisaga_production/photos/pictures/000/780/265/new_medium/sahibbakanand.jpg?1553586872",
    title: "Golden Kanjivaram Saree",
    subtitle: "Luxury Collection",
    price: "14999",
  },
  {
    images: "https://studiovirupa.com/cdn/shop/products/image_27871d37-84b5-4105-a720-590c40ea1767_600x.jpg?v=1664007959",
    title: "Sea Green Chiffon Saree",
    subtitle: "Light and Breezy",
    price: "8999",
  },
  {
    images: "https://www.kankatala.com/blog/wp-content/uploads/2023/03/327150798_3339527379709007_3598049178706899645_n-819x1024.jpg",
    title: "Peach Satin Saree",
    subtitle: "Evening Wear",
    price: "7999",
  },

  {
    images: "https://static.wixstatic.com/media/c70d98_80d553d3bd894427a2adb6d7aa269861~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg",
    title: "Ivory Silk Saree",
    subtitle: "Graceful Attire",
    price: "10999",
  },
];
