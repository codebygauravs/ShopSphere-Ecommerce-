import React, { useState } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthModal from "../Auth/AuthModal";

const Cart = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((store) => store.cart?.cart);
  const cartItems = cart?.cartItems || [];
  const authUser = useSelector((store) => store.auth?.user);
  const jwt = localStorage.getItem("jwt");

  const handleUpdateQuantity = (itemId, change) => {
    const targetItem = cartItems.find((i) => i._id === itemId);
    if (targetItem) {
      const newQty = targetItem.quantity + change;
      if (newQty <= 0) {
        dispatch({ type: "DIRECT_REMOVE_ITEM", payload: itemId });
      } else {
        dispatch({
          type: "DIRECT_UPDATE_QTY",
          payload: { _id: itemId, quantity: newQty },
        });
      }
    }
  };

  const handleRemove = (itemId) => {
    dispatch({ type: "DIRECT_REMOVE_ITEM", payload: itemId });
  };

  const handleProceedCheckout = () => {
    if (!jwt && !authUser?.email) {
      setOpenAuthModal(true);
      return;
    }
    navigate("/checkout?step=2");
  };

  if (!jwt && !authUser?.email) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
          <LockOutlinedIcon sx={{ fontSize: 32 }} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Please Sign In to View Cart & Checkout
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-md">
          Explore products freely. Sign in to add items, save your bag, and complete booking.
        </p>
        <Button
          onClick={() => setOpenAuthModal(true)}
          variant="contained"
          sx={{
            mt: 3,
            px: 4,
            py: 1.2,
            bgcolor: "#f97316",
            fontWeight: 700,
            "&:hover": { bgcolor: "#ea580c" },
            borderRadius: "8px",
          }}
        >
          Sign In Now
        </Button>
        <AuthModal handleClose={() => setOpenAuthModal(false)} open={openAuthModal} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[65vh]">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <div className="h-16 w-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-500">
            <RemoveShoppingCartIcon sx={{ fontSize: 36 }} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Your Shopping Cart is Empty!</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            Explore our trending collections and add items to your cart.
          </p>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{
              mt: 3,
              px: 4,
              py: 1.2,
              bgcolor: "#f97316",
              fontWeight: 700,
              "&:hover": { bgcolor: "#ea580c" },
              borderRadius: "8px",
            }}
          >
            START SHOPPING
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQty={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm sticky top-24">
              <h2 className="text-sm font-bold text-slate-900 border-b pb-4 tracking-wider uppercase">
                PRICE DETAILS
              </h2>
              <div className="space-y-3 py-4 text-sm font-medium">
                <div className="flex justify-between text-slate-600">
                  <span>Price ({cart?.totalItem || cartItems.length} items)</span>
                  <span>₹{cart?.totalPrice || 1999}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Discount</span>
                  <span className="text-green-600 font-semibold">
                    -₹{cart?.discounte || 1200}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-extrabold text-base text-slate-900">
                  <span>Total Amount</span>
                  <span>₹{cart?.totalDiscountedPrice || 799}</span>
                </div>
              </div>

              <Button
                onClick={handleProceedCheckout}
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  bgcolor: "#f97316",
                  fontWeight: 700,
                  fontSize: "1rem",
                  "&:hover": { bgcolor: "#ea580c" },
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)",
                }}
              >
                CHECKOUT
              </Button>
            </div>
          </div>
        </div>
      )}

      <AuthModal handleClose={() => setOpenAuthModal(false)} open={openAuthModal} />
    </div>
  );
};

export default Cart;
