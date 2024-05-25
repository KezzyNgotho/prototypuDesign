import React from "react";
import { useNavigate } from "react-router-dom";
const NoPage = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-white min-h-screen overflow-hidden">
      <div>
        <img className="p-5" src="/assets/unitar-logo.svg" alt="logo" />
      </div>
      <div className="flex justify-between ">
        <img
          src="/assets/robot2.jpg"
          className="relative top-[150px]"
          alt="robot"
        />
        <div className="flex flex-col">
          <img
            className="w-[500px] h-[300px] relative bottom-[100px] right-[250px]"
            src="/assets/404 image.jpg"
            alt="404 page"
          />
          <button onClick={() => navigate(-1)} className=" border-2 border-custom-blue rounded-md px-10 py-2 w-[150px] font-semibold text-sm text-custom-blue">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
