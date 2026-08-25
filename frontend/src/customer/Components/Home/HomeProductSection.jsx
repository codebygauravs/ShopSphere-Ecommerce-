import React, { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeProductCard from "./HomeProductCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomeProductSection = ({ section, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1.5 },
    568: { items: 2.5 },
    768: { items: 3.5 },
    1024: { items: 4.5 },
    1280: { items: 5.2 },
  };

  const slidePrev = () => carouselRef.current?.slidePrev();
  const slideNext = () => carouselRef.current?.slideNext();

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data?.slice(0, 10).map((item, index) => (
    <div key={index} className="flex justify-center p-1">
      <HomeProductCard product={item} />
    </div>
  ));

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2 py-3 bg-white rounded-xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-1 px-2">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          {section}
        </h2>
      </div>

      <div className="relative">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
          mouseTracking
        />

        {activeIndex < (items?.length || 0) - 5 && (
          <button
            onClick={slideNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all focus:outline-none"
            aria-label="next"
          >
            <ArrowForwardIosIcon sx={{ fontSize: 12, ml: "2px" }} />
          </button>
        )}

        {activeIndex !== 0 && (
          <button
            onClick={slidePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all focus:outline-none"
            aria-label="prev"
          >
            <ArrowForwardIosIcon sx={{ fontSize: 12, mr: "2px", transform: "rotate(180deg)" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeProductSection;
