import React from "react";

const FeatureBanner = ({ icon, heading, text }) => {
  return (
    <div className=" banner-container lg:w-1/4 w-full">
      <div className="flex bg-[rgb(255,255,255,0.9)] rounded w-[60px] h-[60px] px-2 py-2">
        {" "}
        <img src={icon} alt="Feature Icon" className="w-10 h-10 " />
      </div>

      <h4 className="text-custom-blue text-[12px] md:text-lg text-left font-inter font-bold mt-4">
        {heading}
      </h4>
      <p className="text-white flex flex-wrap text-[10px] md:text-[14px]  text-left mt-2">
        {text}
      </p>
    </div>
  );
};

export default FeatureBanner;
