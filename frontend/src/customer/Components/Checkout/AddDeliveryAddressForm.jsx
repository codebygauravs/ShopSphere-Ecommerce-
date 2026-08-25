import React, { useState } from "react";
import { Button, Grid, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddressCard from "../adreess/AdreessCard";

export default function AddDeliveryAddressForm() {
  const navigate = useNavigate();

  const handleDeliverHere = () => {
    navigate(`/checkout?step=3&order_id=ORD_${Date.now()}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/checkout?step=3&order_id=ORD_${Date.now()}`);
  };

  return (
    <div className="space-y-6">
      <Grid container spacing={4}>
        {/* Left Side: Saved Address */}
        <Grid item xs={12} lg={5}>
          <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm border-b pb-2">
              SAVED ADDRESSES
            </h3>
            <AddressCard />
            <Button
              onClick={handleDeliverHere}
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                bgcolor: "#f97316",
                fontWeight: 700,
                "&:hover": { bgcolor: "#ea580c" },
                borderRadius: "8px",
              }}
            >
              Deliver Here
            </Button>
          </div>
        </Grid>

        {/* Right Side: Add New Address Form */}
        <Grid item xs={12} lg={7}>
          <div className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm border-b pb-3 mb-4">
              ADD NEW DELIVERY ADDRESS
            </h3>
            <Box component="form" onSubmit={handleSubmit} className="space-y-4">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="First Name" name="firstName" defaultValue="Gaurav" size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="Last Name" name="lastName" defaultValue="Saini" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth label="Street Address" name="address" multiline rows={2} defaultValue="Sector 62, Electronic City" size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="City" name="city" defaultValue="Noida" size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="State" name="state" defaultValue="Uttar Pradesh" size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="Pin Code" name="zipCode" defaultValue="201309" size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="Phone Number" name="phoneNumber" defaultValue="9876543210" size="small" />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.4,
                  px: 4,
                  bgcolor: "#f97316",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#ea580c" },
                  borderRadius: "8px",
                }}
              >
                Deliver to This Address
              </Button>
            </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
