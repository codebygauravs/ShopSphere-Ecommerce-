import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";

const HomeCarousel = () => {
  const navigate = useNavigate();

  const carouselData = [
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
      title: "Ethnic & Festive Collection",
      path: "/men/clothing/mens_kurta",
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop",
      title: "Designer Sarees & Lehengas",
      path: "/women/clothing/lengha_choli",
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
      title: "Exclusive Modern Attire",
      path: "/women/clothing/saree",
    },
  ];

  const items = carouselData.map((item, index) => (
    <div
      key={index}
      onClick={() => navigate(item.path)}
      className="cursor-pointer relative h-[250px] sm:h-[360px] md:h-[440px] w-full rounded-2xl overflow-hidden shadow-sm"
    >
      <img
        className="w-full h-full object-cover object-center"
        src={item.image}
        alt={item.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10">
        <span className="text-xs uppercase tracking-widest font-bold bg-orange-600 text-white px-3 py-1 rounded-md w-fit mb-2">
          FEATURED COLLECTION
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {item.title}
        </h2>
      </div>
    </div>
  ));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000}
        infinite
        mouseTracking
        animationDuration={800}
      />
    </div>
  );
};

export default HomeCarousel;
