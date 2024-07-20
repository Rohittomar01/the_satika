import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button } from "@mui/material";
import QuickView from "./QuickView"
import "../StyleSheets/Gallery.css";

export default function Gallery() {
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);

  const product = {
    image:
      "https://i.pinimg.com/originals/99/0a/3b/990a3b1680be2127f5b7b88c4badde05.jpg",
    subtitle: "Tussar and Combination",
    title: "Blue Woven Design Pure Tussar",
    price: "10999",
  };

  return (
    <>
      <ImageList
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img} className="imageListItem">
            <img
              onClick={() => setDialogOpen(true)}
              srcSet={`${item.img}?w=300&height=450&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=300&height=450&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <div className="overlay">
              <Button
                onClick={() => setDialogOpen(true)}
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
                  onClick={() => navigate("/productdetails")}
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
      <QuickView
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        product={product}
      />
    </>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];
