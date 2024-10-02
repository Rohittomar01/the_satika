import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import OTPDialog from "../Components/OTPDialog/OTPDialog";
import "../StyleSheets/SignUpDialog.css";
import { DialogTitle, Typography } from "@mui/material";

export default function SignUpDialog(props) {
  const [otpOpen, setOtpOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [otp, setOtp] = useState(null);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleOtpOpen = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    if (otp) {
      alert(otp);
      setOtp(otp);
      setOtpOpen(true);
      props.setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="signup-dialog-title"
        id="signup-dialog"
      >
        <DialogTitle id="dialogTitle">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            id="signup-dialog-close-button"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent id="signup-dialog-content">
          <div id="signup-dialog-form-container">
            <img
              src="https://t4.ftcdn.net/jpg/06/52/30/37/240_F_652303724_bvPQ9zr1cTQfF3GPPDUSwQN978jn3Lkc.jpg"
              alt="Signup illustration"
              id="signup-dialog-image"
            />
            <form id="signup-dialog-form">
              <Typography variant="h6" id="signup-dialog-title">
                Join Us for Exciting Updates!
              </Typography>
              <Typography variant="body2" id="signup-dialog-subtitle">
                Enter your mobile number to receive an OTP and get started.
              </Typography>
              <div id="textFieldContainer">
                <TextField
                  fullWidth
                  label="Mobile No."
                  variant="outlined"
                  type="tel"
                  id="signup-dialog-input"
                  inputProps={{
                    pattern: "[0-9]{10}",
                    maxLength: 10,
                  }}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <Button
                  variant="contained"
                  id="signup-dialog-button"
                  onClick={() => handleOtpOpen()}
                >
                  Get OTP
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <OTPDialog otpOpen={otpOpen} setOtpOpen={setOtpOpen} otp={otp} />
    </React.Fragment>
  );
}
