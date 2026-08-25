import React, { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, Avatar, Menu, MenuItem, Badge } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/Auth/Action";
import AuthModal from "../Auth/AuthModal";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Festive Arrivals",
          href: "/women/clothing/lengha_choli",
          imageSrc: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Ethnic & Fusion Wear",
          items: [
            { name: "Sarees", id: "saree" },
            { name: "Lehenga Choli", id: "lengha_choli" },
            { name: "Gowns", id: "gouns" },
            { name: "Kurtas & Suits", id: "women_dress" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "Men's Wedding Special",
          href: "/men/clothing/mens_kurta",
          imageSrc: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=600&auto=format&fit=crop",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Men's Collection",
          items: [
            { name: "Ethnic Kurtas", id: "mens_kurta" },
            { name: "Casual Shirts", id: "shirt" },
            { name: "Denim & Trousers", id: "men_jeans" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Trending Deals", id: "/men/clothing/mens_kurta" },
    { name: "Stores", id: "/women/clothing/saree" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const auth = useSelector((store) => store.auth);
  const cart = useSelector((store) => store.cart);
  const jwt = localStorage.getItem("jwt");

  const handleUserClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate("/");
  };

  const handleCategoryClick = (category, section, item) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    setOpen(false);
  };

  const handleOpenCart = () => {
    navigate("/cart");
  };

  return (
    <div className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      {/* Promo Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-4 py-2 text-center text-xs font-semibold text-white tracking-wide shadow-inner">
        ✨ Get free express delivery on orders over ₹499 • ShopSphere Festive Special!
      </div>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <button
              type="button"
              className="rounded-md bg-white p-2 text-slate-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Original ShopSphere Logo */}
            <div
              className="flex items-center cursor-pointer space-x-2"
              onClick={() => navigate("/")}
            >
              <img
                src="/logo.png"
                alt="ShopSphere"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/logo192.png";
                }}
              />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:space-x-8">
              {navigation.categories.map((category) => (
                <Popover key={category.name} className="flex">
                  {({ open }) => (
                    <>
                      <div className="relative flex">
                        <Popover.Button
                          className={classNames(
                            open
                              ? "border-orange-500 text-orange-600"
                              : "border-transparent text-slate-700 hover:text-orange-600",
                            "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-semibold transition-colors duration-200 ease-out outline-none cursor-pointer"
                          )}
                        >
                          {category.name}
                        </Popover.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute inset-x-0 top-full text-sm text-slate-500 shadow-xl border-t bg-white">
                          <div className="mx-auto max-w-7xl px-8 py-6">
                            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                              {category.sections.map((section) => (
                                <div key={section.name}>
                                  <p className="font-bold text-slate-900 border-b pb-2 mb-3">
                                    {section.name}
                                  </p>
                                  <ul className="space-y-2">
                                    {section.items.map((item) => (
                                      <li
                                        key={item.name}
                                        onClick={() =>
                                          handleCategoryClick(category, section, item)
                                        }
                                        className="cursor-pointer hover:text-orange-600 transition-colors font-medium text-slate-700"
                                      >
                                        {item.name}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ))}

              {navigation.pages.map((page) => (
                <span
                  key={page.name}
                  onClick={() => navigate(page.id)}
                  className="flex items-center text-sm font-semibold text-slate-700 hover:text-orange-600 cursor-pointer"
                >
                  {page.name}
                </span>
              ))}
            </div>

            {/* Right Icons: Sign In & Bag */}
            <div className="flex items-center space-x-5">
              {jwt || auth?.user?.email ? (
                <div>
                  <Avatar
                    onClick={handleUserClick}
                    sx={{
                      bgcolor: "#f97316",
                      cursor: "pointer",
                      width: 36,
                      height: 36,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    {auth?.user?.firstName ? auth.user.firstName[0].toUpperCase() : "G"}
                  </Avatar>
                  <Menu
                    anchorEl={anchorEl}
                    open={openUserMenu}
                    onClose={handleCloseUserMenu}
                    PaperProps={{
                      elevation: 3,
                      sx: { borderRadius: "12px", minWidth: 160, mt: 1 },
                    }}
                  >
                    <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/account/order"); }}>
                      My Orders
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: "#ef4444", fontWeight: 600 }}>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  onClick={() => setOpenAuthModal(true)}
                  variant="contained"
                  sx={{
                    bgcolor: "#f97316",
                    color: "white",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 2.5,
                    py: 0.8,
                    "&:hover": { bgcolor: "#ea580c" },
                  }}
                >
                  Sign In
                </Button>
              )}

              {/* Cart Icon with Dynamic Badge */}
              <div
                onClick={handleOpenCart}
                className="cursor-pointer p-1.5 text-slate-700 hover:text-orange-600 transition-colors relative"
              >
                <Badge
                  badgeContent={cart?.cart?.cartItems?.length || cart?.cart?.totalItem || 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#f97316",
                      color: "white",
                      fontWeight: 700,
                    },
                  }}
                >
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                </Badge>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={() => setOpenAuthModal(false)} open={openAuthModal} />
    </div>
  );
}
