import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import OtpInput from "react-otp-input";
import "../../StyleSheets/OTPDialog.css";

export default function OTPDialog(props) {
  const [otp, setOtp] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    props.setOtpOpen(false);
  };
  console.log("otp dialog", props.otpOpen);

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={props.otpOpen}
        aria-labelledby="otp-dialog-title"
        disableBackdropClick
        className="otp-dialog"
      >
        <DialogTitle className="dialog_title">
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
            className="otp-dialog-close-button"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="otp-dialog-content">
          <Typography variant="h6" align="center" className="otp-dialog-title">
            Enter OTP
          </Typography>
          <Typography
            variant="body2"
            align="center"
            className="otp-dialog-subtitle"
          >
            Enter the 6 digit OTP sent to your mobile number{" "}
            <div>+91 9285524467</div>
          </Typography>
          <div className="otp-input-group">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span style={{ padding: "0 10px" }}> - </span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{ height: "6vh", width: "3vw" }}
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                width: "30vw",
              }}
              shouldAutoFocus={true}
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
        <DialogActions id="otp_dialog_action">
          <Button
            variant="contained"
            onClick={handleClose}
            className="otp-dialog-button"
          >
            CONTINUE
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            id="otp-dialog-cancle_button"
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
