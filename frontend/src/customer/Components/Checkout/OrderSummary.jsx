import React, { useEffect, useState } from "react";
import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import CartItem from "../Cart/CartItem";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QrCode2Icon from "@mui/icons-material/QrCode2";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id") || "ORD_" + Date.now();
  const { order, auth } = useSelector((state) => state);

  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");

  useEffect(() => {
    if (orderId && orderId !== "undefined") {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);

  const handlePaymentSubmit = () => {
    const totalPayable = order?.order?.totalDiscountedPrice || 799;

    if (paymentMethod === "COD") {
      navigate(
        `/payment/${orderId}?payment_method=COD&payment_status=PENDING&order_status=CONFIRMED`
      );
    } else if (paymentMethod === "RAZORPAY") {
      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag",
        amount: totalPayable * 100,
        currency: "INR",
        name: "ShopSphere",
        description: `Payment for Order #${orderId}`,
        image: "/logo.png",
        handler: function (response) {
          navigate(
            `/payment/${orderId}?razorpay_payment_id=${response.razorpay_payment_id}&razorpay_payment_link_status=paid&payment_method=ONLINE`
          );
        },
        prefill: {
          name: auth?.user?.firstName
            ? `${auth.user.firstName} ${auth.user.lastName || ""}`
            : "Customer",
          email: auth?.user?.email || "customer@shopsphere.com",
          contact: "9876543210",
        },
        theme: {
          color: "#f97316",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        navigate(
          `/payment/${orderId}?razorpay_payment_id=pay_sim_${Date.now()}&razorpay_payment_link_status=paid`
        );
      }
    }
  };

  const sampleItems = order?.order?.orderItems || [
    {
      _id: "order_item_1",
      product: {
        title: "Men Embroidered Pure Cotton Straight Kurta",
        brand: "Manyavar",
        price: 1999,
        discountedPrice: 799,
        discountPersent: 60,
        imageUrl:
          "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/f/r/xl-k-spl-108-yellow-manthan-original-imag4z65qheewsaf-bb.jpeg?q=70",
      },
      size: "M",
      quantity: 1,
      price: 1999,
      discountedPrice: 799,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
            Delivery Address
          </span>
          <h3 className="font-bold text-slate-800 text-sm mt-2">
            Gaurav Saini • 9876543210
          </h3>
          <p className="text-sm text-slate-600">
            Sector 62, Noida, Uttar Pradesh, 201309
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            {sampleItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
            <h2 className="text-base font-bold text-slate-900 border-b pb-3">
              SELECT PAYMENT METHOD
            </h2>

            <FormControl component="fieldset" className="w-full mt-3">
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="space-y-3"
              >
                <div
                  onClick={() => setPaymentMethod("RAZORPAY")}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "RAZORPAY"
                      ? "border-orange-500 bg-orange-50/40 ring-1 ring-orange-400"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Radio
                      checked={paymentMethod === "RAZORPAY"}
                      sx={{ color: "#f97316", "&.Mui-checked": { color: "#f97316" } }}
                    />
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        Online Payment (UPI, Cards, NetBanking)
                      </p>
                      <p className="text-xs text-slate-500">
                        Pay securely using Razorpay, Google Pay, PhonePe, Paytm or Debit/Credit Card
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <QrCode2Icon />
                    <CreditCardIcon />
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "COD"
                      ? "border-orange-500 bg-orange-50/40 ring-1 ring-orange-400"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Radio
                      checked={paymentMethod === "COD"}
                      sx={{ color: "#f97316", "&.Mui-checked": { color: "#f97316" } }}
                    />
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        Cash On Delivery (COD)
                      </p>
                      <p className="text-xs text-slate-500">
                        Pay in cash or UPI QR code to delivery partner at your doorstep
                      </p>
                    </div>
                  </div>
                  <LocalShippingIcon className="text-slate-400" />
                </div>
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm sticky top-24">
            <h2 className="text-sm font-bold text-slate-900 border-b pb-4 tracking-wider uppercase">
              PAYMENT SUMMARY
            </h2>
            <div className="space-y-3 py-4 text-sm font-medium">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span>₹1999</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Discount</span>
                <span className="text-green-600 font-semibold">-₹1200</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-extrabold text-base text-slate-900">
                <span>Total Amount</span>
                <span>₹799</span>
              </div>
            </div>

            <Button
              onClick={handlePaymentSubmit}
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.6,
                bgcolor: paymentMethod === "COD" ? "#16a34a" : "#f97316",
                fontWeight: 700,
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: paymentMethod === "COD" ? "#15803d" : "#ea580c",
                },
                borderRadius: "8px",
                boxShadow:
                  paymentMethod === "COD"
                    ? "0 4px 14px rgba(22, 163, 74, 0.3)"
                    : "0 4px 14px rgba(249, 115, 22, 0.3)",
              }}
            >
              {paymentMethod === "COD"
                ? "CONFIRM COD ORDER"
                : "PROCEED TO PAY ONLINE"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
