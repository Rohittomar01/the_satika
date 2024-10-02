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
import { useNavigate } from "react-router-dom";
import AddressFormDialog from "../../Pages/AddressFormDialog";
export default function OTPDialog(props) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [openAdressDialog, setAddressDialogOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const correctOtp = props.otp;

  const handleClose = () => {
    props.setOtpOpen(false);
  };

  const handleVerify = () => {
    if (parseInt(otp) === parseInt(correctOtp)) {
      setAddressDialogOpen(true);
      props.setOtpOpen(false);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

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
            Enter the 4-digit OTP sent to your mobile number
            <div>+91 9285524467</div>
          </Typography>
          <div className="otp-input-group">
            <OtpInput
              className="otpinput"
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span style={{ padding: "0 10px" }}> - </span>}
              renderInput={(props) => (
                <input style={{ borderRadius: 200 }} {...props} />
              )}
              inputStyle={{
                height: "7vh",
                width: "3.5vw",
                borderRadius: "50%",
              }}
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                width: "35vw",
              }}
              shouldAutoFocus={true}
            />
          </div>
          {error && (
            <Typography
              variant="body2"
              align="center"
              style={{ color: "red", marginTop: "10px" }}
            >
              {error}
            </Typography>
          )}
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
            fullWidth
            variant="contained"
            onClick={handleVerify} 
            id="otp-dialog-button"
          >
            CONTINUE
          </Button>
        </DialogActions>
      </Dialog>
      <AddressFormDialog
        open={openAdressDialog}
        setOpen={setAddressDialogOpen}
      />
    </React.Fragment>
  );
}
