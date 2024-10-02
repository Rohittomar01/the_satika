import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  ListItem,
  ListItemText,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";

const CheckoutComponent = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [status, setStatus] = useState("");

  // Example addresses array
  const addresses = [
    {
      id: 1,
      fullName: "John Doe",
      street: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      phone: "123-456-7890",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      street: "456 Maple Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      phone: "987-654-3210",
    },
    {
      id: 3,
      fullName: "Sam Wilson",
      street: "789 Oak St",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      phone: "555-123-4567",
    },
  ];

  const handleSelectAddress = (event) => {
    setSelectedAddress(event.target.value);
  };

  // Razorpay payment options
  const fam = 200;
  const options = {
    key: "rzp_test_qPOfPOdzrtddEv",
    amount: fam * 100,
    name: "The Satika",
    prefill: {
      name: "Rohit Tomar",
      contact: "9174537339",
      email: "vishaljain2504@gmail.com",
    },
    image: "http://www.ipsgwalior.org/ipsctm_journal/img/logo.png",
    handler: function (response) {
      alert(response.razorpay_payment_id);
    },
    notes: {
      address: "Some address",
    },
    theme: {
      color: "#212121",
    },
    modal: {
      backdropclose: false, // Prevent closing by clicking outside
      escape: false, // Prevent closing by escape key
    },
  };

  const openPayModal = () => {
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    setStatus(true);
  };

  const OnlineMethod = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    setTimeout(() => {
      openPayModal();
    }, 1500);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "24px",
        margin: "20px auto",
        maxWidth: "800px",
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Delivery Address Section */}
      <Typography variant="h6" gutterBottom>
        <LocalShippingIcon
          sx={{ verticalAlign: "middle", marginRight: "8px" }}
        />
        Select Delivery Address
      </Typography>

      <RadioGroup value={selectedAddress} onChange={handleSelectAddress}>
        <Grid container direction="column">
          {addresses.map((address) => (
            <Grid item key={address.id}>
              <ListItem>
                <FormControlLabel
                  value={address.id.toString()}
                  control={
                    <Radio
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                    />
                  }
                  label={
                    <ListItemText
                      primary={`${address.fullName}, ${address.street}`}
                      secondary={`${address.city}, ${address.state}, ${address.zip} - ${address.phone}`}
                    />
                  }
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>

      <Divider sx={{ marginY: "20px" }} />

      {/* Payment Details Section */}
      <Typography variant="h6" gutterBottom>
        <CreditCardIcon sx={{ verticalAlign: "middle", marginRight: "8px" }} />
        Payment Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Total Amount:</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Rs.149.99
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                paddingX: "30px",
                paddingY: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                  opacity: 0.85,
                },
              }}
              onClick={OnlineMethod}
            >
              Make Payment
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CheckoutComponent;
