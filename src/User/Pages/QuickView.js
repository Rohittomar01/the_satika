import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
  Divider,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useTheme } from "@mui/material/styles";
import ShareDialog from "../Common_Components/ShareDialog";
import { ServerURL } from "../../Services/ServerServices";

const QuickView = ({ open, onClose, product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentProduct, setCurrentProduct] = useState(null); // For storing the product details for sharing
  const [showShareDialog, setShowShareDialog] = useState(false);

  useEffect(() => {
    if (product) {
      setCurrentProduct(product);
    }
  }, [product]);

  const handleShare = (product) => {
    setCurrentProduct(product);
    setShowShareDialog(true);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="md"
      PaperProps={{
        style: {
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          padding: 0,
          width: "65vw",
          height: "62vh",
        },
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", padding: 0, margin: 0 }}>
        <Grid container>
          <Grid
            item
            xs={5}
            lg={5}
            sm={5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "21vw", height: "70vh", objectFit: "cover" }}
              src={
                product && product.images && product.images.length > 0
                  ? `${ServerURL}/images/${product.images[0].image_name}`
                  : null
              }
              alt={product ? product.product_name : "Product Image"}
            />
          </Grid>
          <Grid
            item
            xs={7}
            lg={7}
            sm={7}
            style={{
              flex: 1,
              padding: "5%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "inherit",
              wordWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            <div>
              <Typography variant="subtitle1" fontFamily="Futura Medium Italic">
                {product.product_name}
              </Typography>
              <Typography variant="h5" fontFamily="Futura Medium Italic">
                {product.product_description}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                fontFamily="Futura Light Italic"
              >
                ₹ {product.price}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                fontFamily="Futura Light Italic"
              >
                Inclusive of all taxes
              </Typography>
            </div>
            <Divider sx={{ my: 2, marginTop: "35%" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "4%",
              }}
            >
              <Button
                onClick={() => handleShare(product)}
                variant="text"
                startIcon={<ShareOutlinedIcon />}
              >
                Share
              </Button>
            </div>

            <div>
              <ShareDialog
                open={showShareDialog}
                setOpen={setShowShareDialog}
                shareUrl={
                  currentProduct
                    ? `${ServerURL}/product/${currentProduct.id}`
                    : ""
                }
                quote={
                  currentProduct
                    ? `Check out this amazing product: ${currentProduct.product_name}`
                    : ""
                }
                hashtag="#TrendingProduct"
              />
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;
