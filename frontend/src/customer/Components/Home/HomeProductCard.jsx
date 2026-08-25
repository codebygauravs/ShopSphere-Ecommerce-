import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product?._id || product?.id}`)}
      className="cursor-pointer flex flex-col items-center bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 overflow-hidden w-[13rem] sm:w-[14rem] mx-2 my-2 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-[13rem] w-full overflow-hidden bg-slate-50 flex items-center justify-center">
        <img
          className="object-cover object-top w-full h-full hover:scale-105 transition-transform duration-500"
          src={product?.imageUrl || product?.image}
          alt={product?.title}
        />
      </div>

      <div className="p-3 w-full text-left bg-white">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight truncate">
          {product?.brand}
        </h3>
        <p className="mt-1 text-xs text-slate-500 truncate leading-relaxed">
          {product?.title}
        </p>
      </div>
    </div>
  );
};

export default HomeProductCard;
