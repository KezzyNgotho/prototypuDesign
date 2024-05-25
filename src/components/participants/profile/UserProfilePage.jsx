import { Avatar, Chip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentParticipantDetail } from "../../../features/participant/participantSlice";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const partProfile = useSelector(selectCurrentParticipantDetail);
  console.log(partProfile);

  return (
    <div className="right-side min-h-screen bg-white">
      <div className="ml-80">
        <h1 className="text-gray-600 text-[24px] font-bold py-3">
          Learner Profile
        </h1>
        <div className="flex flex-row gap-[100px] ">
          <div className="bg-[#2e4161] px-8 rounded h-[350px] mt-4">
            <div className="flex flex-col items-center">
              <Avatar
                alt="Profile pic"
                src={partProfile.profile_image_url}
                sx={{
                  width: "200px",
                  height: "200px",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              />{" "}
              <p className="text-[20px] text-white font-bold">
                {partProfile.full_name}
              </p>
              <button
                onClick={() => navigate("/participant/profile/edit")}
                className="border-custom-blue text-custom-blue p-2 rounded-md border text-sm w-[250px] mt-4"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div>
            <h1 className="mt-3 mb-2 text-gray-600 font-semibold">
              Personal Information
            </h1>
            <div className="flex flex-col">
              <div className="flex flex-row border border-gray-300 rounded py-2 px-2">
                <EmailIcon
                  sx={{ width: "20px", height: "20px", color: "#CCCCCC" }}
                />
                <p className=" px-3 text-sm border-r border-gray-300 text-gray-500 w-[80px]">
                  Email
                </p>
                <p className="px-3 text-sm "> {partProfile.email}</p>
              </div>
              <div className="flex flex-row border border-gray-300 rounded py-2 px-2 mt-3">
                <HomeIcon
                  sx={{ width: "20px", height: "20px", color: "#CCCCCC" }}
                />
                <p className=" px-3 text-sm border-r border-gray-300 text-gray-500 w-[80px]">
                  City
                </p>
                <p className="px-3 text-sm "> {partProfile.city}</p>
              </div>
              <div className="flex flex-row border border-gray-300 rounded py-2 px-2 mt-3">
                <PersonOutlineIcon
                  sx={{ width: "20px", height: "20px", color: "#CCCCCC" }}
                />
                <p className=" px-3 text-sm border-r border-gray-300 text-gray-500 w-[80px]">
                  Gender
                </p>
                <p className="px-3 text-sm "> {partProfile.gender}</p>
              </div>
              <div className="flex flex-row border border-gray-300 rounded py-2 px-2 mt-3">
                <CalendarMonthIcon
                  sx={{ width: "20px", height: "20px", color: "#CCCCCC" }}
                />
                <p className=" px-3 text-sm border-r border-gray-300 text-gray-500 w-[80px]">
                  DOB
                </p>
                <p className="px-3 text-sm "> {partProfile.date_of_birth}</p>
              </div>
            </div>
            <div className="mt-5 mb-5 flex flex-col">
              <div className="flex flex-col border border-gray-300 rounded py-2 px-2 mt-3">
                <p className=" px-3 text-sm text-gray-500 mb-2">
                  Learning Pathway
                </p>
                <p className="px-3 text-sm "> {partProfile.pathway}</p>
              </div>
              <div className="flex flex-col border border-gray-300 rounded py-2 px-2 mt-3">
                <p className=" px-3 text-sm text-gray-500 mb-2">
                  Hackathon Theme
                </p>
                <p className="px-3 text-sm "> {partProfile.hackathon_theme}</p>
              </div>
              <div className="flex flex-col border border-gray-300 rounded py-2 px-2 mt-3">
                <p className=" px-3 text-sm text-gray-500 mb-2">
                  Hackathon sub-theme(s)
                </p>
                {partProfile.sub_themes.map((subtheme, index) => (
                  <Chip
                    key={index}
                    label={subtheme}
                    sx={{
                      width: "200px",
                      marginTop: "8px",
                      backgroundColor: "#E2EDF1",
                      color: "#009edb",
                      transition: "width 0.3s",
                      "&:hover": {
                        width: "100%",
                      },
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
