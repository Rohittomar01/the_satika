import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useTheme } from "@mui/material/styles";

const QuickView = ({ open, onClose, product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <div
          style={{
            marginLeft: "-4%",
            flex: 1,
            background: `url(${product.image}) no-repeat center center`,
            backgroundSize: "cover",
            minHeight: "50vh",
            minWidth: "15vw",
          }}
        />
        <div
          style={{
            flex: 1,
            padding:"5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography variant="subtitle1" fontFamily="Futura Medium Italic">
              {product.subtitle}
            </Typography>
            <Typography variant="h5" fontFamily="Futura Medium Italic">
              {product.title}
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
          <Divider sx={{ my: 2,marginTop:"35%" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "4%",
            }}
          >
            <Button
              startIcon={<ThumbUpAltOutlinedIcon />}
              variant="text"
              sx={{ marginRight: 1 }}
            >
              Love This!
            </Button>
            <Button
              startIcon={<ThumbDownAltOutlinedIcon />}
              variant="text"
              sx={{ marginRight: 1 }}
            >
              Not For Me
            </Button>
            <Button variant="text" startIcon={<ShareOutlinedIcon />}></Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;
