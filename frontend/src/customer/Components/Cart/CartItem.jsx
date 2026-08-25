import React from "react";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CartItem = ({ item, onUpdateQty, onRemove }) => {
  const currentQuantity = item?.quantity || 1;
  const product = item?.product || {};

  return (
    <div className="p-5 shadow-sm border border-slate-200 rounded-xl bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
          <img
            className="w-full h-full object-cover object-top"
            src={
              product?.imageUrl ||
              product?.image ||
              "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop"
            }
            alt={product?.title || "Product"}
          />
        </div>

        <div className="space-y-1">
          <p className="font-bold text-slate-800 text-sm sm:text-base">
            {product?.brand || "Manyavar"}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 line-clamp-1">
            {product?.title || "Men Embroidered Pure Cotton Straight Kurta"}
          </p>
          <p className="text-xs text-slate-400 font-medium">
            Size: {item?.size || "M"}
          </p>

          <div className="flex items-center space-x-2 pt-1">
            <span className="font-extrabold text-slate-900 text-sm sm:text-base">
              ₹{product?.discountedPrice || item?.discountedPrice || 799}
            </span>
            <span className="line-through text-xs text-slate-400">
              ₹{product?.price || item?.price || 1999}
            </span>
            <span className="text-green-600 text-xs font-bold">
              {product?.discountPersent || 60}% Off
            </span>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <div className="flex items-center space-x-1">
          <IconButton
            onClick={() => onUpdateQty && onUpdateQty(item._id, -1)}
            disabled={currentQuantity <= 1}
            size="small"
          >
            <RemoveCircleOutlineIcon fontSize="small" />
          </IconButton>
          <span className="py-0.5 px-3 border border-slate-200 rounded text-sm font-bold">
            {currentQuantity}
          </span>
          <IconButton
            onClick={() => onUpdateQty && onUpdateQty(item._id, 1)}
            size="small"
            sx={{ color: "#f97316" }}
          >
            <AddCircleOutlineIcon fontSize="small" />
          </IconButton>
        </div>

        <Button
          onClick={() => onRemove && onRemove(item._id)}
          sx={{
            color: "#ef4444",
            fontWeight: 700,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            mt: { sm: 1 },
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
