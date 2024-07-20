import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import OtpInput from 'react-otp-input';
import "../StyleSheets/OTPDialog.css";

export default function OTPDialog() {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open OTP Dialog
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="otp-dialog-title"
        // disableBackdropClick
        id="otp-dialog"
      >
        <DialogTitle className="dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className="otp-dialog-close-button"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent id="otp-dialog-content">
          <Typography variant="h6" align="center" className="otp-dialog-title">
            Enter OTP
          </Typography>
          <Typography
            variant="body2"
            align="center"
            className="otp-dialog-subtitle"
          >
            Enter the 6 digit OTP sent to your mobile number{" "}
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            <strong>+91 9285524467</strong>
          </Typography>
          <div className="otp-input-group">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <Typography
            variant="body2"
            align="center"
            className="otp-dialog-resend"
          >
            Didn't Receive? <a href="#resend">Resend OTP</a> in 02:39
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            className="otp-dialog-button"
          >
            CONTINUE
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
