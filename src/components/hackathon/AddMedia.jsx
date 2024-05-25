import { ChevronRight } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddMedia = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white right-side min-h-screen">
      <div className="ml-80">
        {" "}
        <h1 className=" text-gray-600 font-bold  text-[24px] mb-2 mt-10">
          Hackathon media{" "}
        </h1>{" "}
        <p className="text-xs text-gray-500 flex flex-row mb-6">
          <span className="mt-[2px]">Hackathons</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">Create a hackathon</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">media</span>
        </p>
        <h1 className="text-sm mb-10">
          Add a personal touch to your Hackathon project!
          <br /> Do you want to upload an image that inspires your project
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
            onClick={() => navigate("/organizer/hackathons/create/verify")}
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

export default AddMedia;
