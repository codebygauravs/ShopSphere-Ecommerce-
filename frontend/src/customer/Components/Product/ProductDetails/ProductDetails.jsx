import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { Button, Rating } from "@mui/material";
import AuthModal from "../../Auth/AuthModal";

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const customersProduct = useSelector((store) => store.customersProduct);
  const auth = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (productId && productId !== "undefined") {
      dispatch(findProductById({ productId }));
    }
  }, [productId, dispatch]);

  const product = customersProduct?.product || {
    _id: productId && productId !== "undefined" ? productId : "prod_1",
    title: "Men Embroidered Pure Cotton Straight Kurta",
    brand: "Manyavar",
    price: 1999,
    discountedPrice: 799,
    discountPersent: 60,
    imageUrl: "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/f/r/xl-k-spl-108-yellow-manthan-original-imag4z65qheewsaf-bb.jpeg?q=70",
    description: "Handcrafted pure cotton ethnic kurta with elegant embroidery work and mandarin collar.",
  };

  const handleAddToCart = () => {
    if (!jwt && !auth?.user?.email) {
      setOpenAuthModal(true);
      return;
    }

    const cartItemData = {
      _id: "cart_" + Date.now(),
      product: {
        _id: product._id,
        title: product.title,
        brand: product.brand,
        price: product.price,
        discountedPrice: product.discountedPrice,
        discountPersent: product.discountPersent,
        imageUrl: product.imageUrl || product.image,
      },
      size: selectedSize,
      quantity: 1,
      price: product.price,
      discountedPrice: product.discountedPrice,
    };

    dispatch({ type: "DIRECT_ADD_ITEM", payload: cartItemData });
    dispatch(addItemToCart({ productId: product._id, size: selectedSize }));
    navigate("/cart");
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <div className="mx-auto flex max-w-7xl items-center space-x-2 px-4 sm:px-6 lg:px-8 text-sm text-slate-500">
            <span className="cursor-pointer hover:text-slate-900" onClick={() => navigate("/")}>Home</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-slate-900" onClick={() => navigate("/men/clothing/mens_kurta")}>Men</span>
            <span>/</span>
            <span className="font-semibold text-slate-900">{product.title}</span>
          </div>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm max-w-[30rem] max-h-[35rem]">
              <img
                src={product.imageUrl || product.image}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-1 max-w-2xl px-4">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {product.brand}
            </h1>
            <h2 className="text-lg text-slate-600 mt-1">{product.title}</h2>

            <div className="flex items-center space-x-4 mt-4">
              <p className="text-3xl font-extrabold text-slate-900">₹{product.discountedPrice || product.price}</p>
              <p className="text-lg text-slate-400 line-through">₹{product.price}</p>
              <p className="text-lg font-bold text-green-600">{product.discountPersent}% Off</p>
            </div>

            <div className="mt-4 flex items-center space-x-3">
              <Rating name="read-only" value={4.5} precision={0.5} readOnly />
              <p className="text-sm text-slate-500">42,807 Ratings & 117 Reviews</p>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-900">Select Size</h3>
              <div className="grid grid-cols-4 gap-4 mt-3 max-w-xs">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 text-sm font-semibold rounded-md border text-center transition-all cursor-pointer ${
                      selectedSize === sz
                        ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm font-bold"
                        : "border-slate-200 text-slate-900 hover:border-slate-400"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Button
                onClick={handleAddToCart}
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.8,
                  bgcolor: "#f97316",
                  fontWeight: 700,
                  fontSize: "1rem",
                  "&:hover": { bgcolor: "#ea580c" },
                  borderRadius: "8px",
                  boxShadow: "0 4px 14px rgba(249, 115, 22, 0.3)"
                }}
                fullWidth
              >
                {jwt ? "ADD TO CART" : "SIGN IN TO BUY / ADD TO CART"}
              </Button>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-sm font-semibold text-slate-900">Description</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {product.description || "Premium fabric tailored to perfection for modern traditional aesthetics."}
              </p>
            </div>
          </div>
        </section>
      </div>

      <AuthModal handleClose={() => setOpenAuthModal(false)} open={openAuthModal} />
    </div>
  );
}
