import React from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { mens_kurta } from "../Data/Men/men_kurta";
import { mensShoesPage1 } from "../Data/shoes";
import { lengha_page1 } from "../Data/Women/LenghaCholi";
import { sareePage1 } from "../Data/Saree/page1";
import { dressPage1 } from "../Data/dress/page1";
import { gounsPage1 } from "../Data/Gouns/gouns";

const Homepage = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <HomeCarousel />
      <div className="space-y-4 py-2 flex flex-col justify-center">
        <HomeProductSection data={mens_kurta} section={"Men's Kurta"} />
        <HomeProductSection data={mensShoesPage1} section={"Men's Shoes"} />
        <HomeProductSection data={lengha_page1} section={"Lengha Choli"} />
        <HomeProductSection data={sareePage1} section={"Saree"} />
        <HomeProductSection data={dressPage1} section={"Dress"} />
        <HomeProductSection data={gounsPage1} section={"Gouns"} />
      </div>
    </div>
  );
};

export default Homepage;
