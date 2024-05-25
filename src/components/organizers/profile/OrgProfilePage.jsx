import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentOrganizerDetail } from "../../../features/organizer/organizerSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FactoryIcon from "@mui/icons-material/Factory";

const OrgProfilePage = () => {
  const navigate = useNavigate();
  const orgProfile = useSelector(selectCurrentOrganizerDetail);

  return (
    <div className="right-side min-h-screen bg-white ">
      <div className="ml-80">
        <h1 className="text-gray-600 text-[24px] font-bold mt-3">
          Organizer Profile
        </h1>
        <div className="flex flex-row gap-[100px]">
          <div className="bg-[#2e4161] px-8 rounded h-[350px] mt-[50px]">
            <div className="flex flex-col items-center">
              <Avatar
                alt="Profile pic"
                src={orgProfile.profile_image_url}
                sx={{
                  width: "200px",
                  height: "200px",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              />{" "}
              <p className="text-[20px] text-white font-bold">
                {orgProfile.full_name}
              </p>
              <button
                onClick={() => navigate("/organizer/profile/edit")}
                className="border-custom-blue text-custom-blue p-2 rounded-md border text-sm w-[250px] mt-4"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="mt-3 mb-2 text-gray-600 font-semibold">
              Profile Details
            </h1>
            <div className="flex flex-col ">
              <div className="flex flex-row border border-gray-300 rounded py-2 px-2 mt-3">
                <PersonOutlineIcon
                  sx={{ width: "20px", height: "20px", color: "#CCCCCC" }}
                />
                <p className=" px-3 text-sm border-r border-gray-300 text-gray-500 w-[80px]">
                  Name
                </p>
                <p className="px-3 text-sm "> {orgProfile.name}</p>
              </div>
              <div className="flex flex-row border border-gray-300 rounded py-2 px-2 mt-3">
                <FactoryIcon
                  sx={{ width: "20px", height: "20px", color: "#CCCCCC" }}
                />
                <p className=" px-3 text-sm border-r border-gray-300 text-gray-500 w-[80px]">
                  Industry
                </p>
                <p className="px-3 text-sm "> {orgProfile.industry}</p>
              </div>
              <div className="flex flex-row border border-gray-300 rounded py-2 px-2 mt-3">
                <LocationOnIcon
                  sx={{ width: "20px", height: "20px", color: "#CCCCCC" }}
                />
                <p className=" px-3 text-sm border-r border-gray-300 text-gray-500 w-[80px]">
                  Location
                </p>
                <p className="px-3 text-sm "> {orgProfile.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgProfilePage;
