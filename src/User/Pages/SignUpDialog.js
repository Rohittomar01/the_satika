import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import "../StyleSheets/SignUpDialog.css";

export default function SignUpDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="signup-dialog-title"
        className="signup-dialog"
      >
        <DialogTitle id="signup-dialog-title" className="signup-dialog-title">
          Sign up to get FLAT 10% off on your first order
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className="signup-dialog-close-button"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="signup-dialog-content">
          <img
            src="https://t4.ftcdn.net/jpg/06/52/30/37/240_F_652303724_bvPQ9zr1cTQfF3GPPDUSwQN978jn3Lkc.jpg"
            alt="Signup offer"
            className="signup-dialog-image"
          />
          <p className="signup-dialog-offer-text">
            Use Code <strong>“WELCOME”</strong>
          </p>
          <div className="signup-dialog-input-group">
            <FormControl
              variant="outlined"
              className="signup-dialog-country-code"
            >
              <InputLabel>Country Code</InputLabel>
              <Select label="Country Code" defaultValue="+91">
                <MenuItem value="+91">+91</MenuItem>
                {/* Add other country codes here */}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label="Enter mobile number"
              className="signup-dialog-mobile-input"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="signup-dialog-button"
            onClick={handleClose}
          >
            SIGNUP / LOGIN
          </Button>
        </DialogActions>
        <DialogActions className="signup-dialog-guest">
          <Button
            fullWidth
            variant="text"
            className="signup-dialog-guest-button"
            onClick={handleClose}
          >
            Checkout As Guest
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
