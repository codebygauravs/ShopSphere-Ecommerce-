import React from "react";
import { Button, Alert, AlertTitle } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isCOD = searchParams.get("payment_method") === "COD";

  return (
    <div className="max-w-2xl mx-auto px-4 py-14 text-center">
      <div className="flex justify-center mb-5">
        <div
          className={`h-20 w-20 rounded-full flex items-center justify-center ${
            isCOD ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
          }`}
        >
          {isCOD ? (
            <LocalShippingOutlinedIcon sx={{ fontSize: 50 }} />
          ) : (
            <CheckCircleOutlineIcon sx={{ fontSize: 50 }} />
          )}
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900">
        {isCOD ? "Order Placed Successfully!" : "Payment Successful!"}
      </h1>
      <p className="text-slate-600 mt-2 text-sm">
        {isCOD
          ? "Your Cash on Delivery order has been confirmed and scheduled for shipment."
          : "Thank you for shopping with ShopSphere. Your payment has been verified."}
      </p>

      <div className="mt-8 border border-slate-200 rounded-xl p-6 bg-white shadow-sm text-left">
        <Alert severity={isCOD ? "info" : "success"} sx={{ mb: 3 }}>
          <AlertTitle className="font-bold">
            Order Reference: {orderId || "OD" + Date.now()}
          </AlertTitle>
          {isCOD
            ? "Please keep ₹799 cash or UPI ready at the time of delivery."
            : "Payment ID: " + (searchParams.get("razorpay_payment_id") || "PAY_" + Date.now())}
        </Alert>

        <div className="flex items-center space-x-4 border-t pt-4">
          <img
            src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/f/r/xl-k-spl-108-yellow-manthan-original-imag4z65qheewsaf-bb.jpeg?q=70"
            alt="Product"
            className="w-16 h-20 object-cover rounded-md border"
          />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              Men Embroidered Pure Cotton Straight Kurta
            </h4>
            <p className="text-xs text-slate-500">Size: M | Qty: 1</p>
            <p className="font-bold text-slate-900 text-sm mt-1">
              ₹799 ({isCOD ? "Pay on Delivery" : "Paid Online"})
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            bgcolor: "#f97316",
            fontWeight: 700,
            "&:hover": { bgcolor: "#ea580c" },
            borderRadius: "8px",
          }}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
