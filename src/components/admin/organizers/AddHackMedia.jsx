import React from "react";
import { useNavigate } from "react-router-dom";

const AddHackMedia = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white right-side min-h-screen">
      <div className="ml-[300px]">
        {" "}
        <h1 className=" text-gray-600 font-bold  text-[24px] mb-9 mt-10">
          Hackathon media{" "}
        </h1>{" "}
        <p className="text-xs text-gray-500 flex flex-row mb-6">
          <span>Hackathons</span>
          <img
            src="/assets/chevron-right-solid.svg"
            className="w-2 h-2 mt-[4px] m-1"
            alt="chevron"
          />
          <span>Create a hackathon</span>
          <img
            src="/assets/chevron-right-solid.svg"
            className="w-2 h-2 mt-[4px] m-1"
            alt="chevron"
          />
          <span>media</span>
        </p>
        <h1 className="text-sm mb-10">
          Add a personal touch to this Hackathon project!
          <br /> Do you want to upload an image that inspires this project
          goals?
        </h1>
        <div className="flex flex-row gap-3">
          <button
            onClick={() => navigate("details")}
            type="submit"
            className="py-3 px-2 bg-custom-blue rounded-md text-white  w-[100px] mt-10"
          >
            Yes
          </button>
          <button
            type="submit"
            className="py-3 px-2 border border-custom-blue rounded-md text-custom-blue  w-[100px] mt-10"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHackMedia;
