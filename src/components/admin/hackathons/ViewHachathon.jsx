import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HackathonMedia from "../../common/utils/HackathonMedia";
import AdminProfile from "../AdminLogOut";
import { selectSelectedHackathonDetail } from "../../../features/hackathon/hackathonSlice";
const ViewHackathon = () => {
  const navigate = useNavigate();
  const hackathonDetails = useSelector(selectSelectedHackathonDetail);
  return (
    <div className="bg-white right-side min-h-screen ">
      <div className="ml-[300px]">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px] mt-5">
            All active Hackathons
          </h1>{" "}
          <div className="mt-6 mr-5">
            {" "}
            <AdminProfile />
          </div>
        </div>

        <div className="flex flex-wrap space-x-4 mt-5 ml-4">
          <div className="hover:border-custom-blue relative overflow-hidden border border-[#C7C7C7]  rounded-[20px] shadow mb-4 w-[300px] h-[380px] transition-transform transform hover:-translate-y-1">
            <HackathonMedia
              cover_image_url={hackathonDetails.cover_image_url}
              avatar_url={hackathonDetails.avatar_url}
            />
            <div className="relative">
              <div className="absolute bottom-0 left-0 border-[#7C7C7C] border-t right-0 h-1/3 bg-white p-4 rounded-[20px]">
                <p className="text-sm font-bold mt-4">
                  {hackathonDetails.title}
                </p>
                <p className="text-sm text-gray-700">
                  {hackathonDetails.highlight}{" "}
                </p>
                <p className="text-xs text-gray-500  mt-2 h-[45px] overflow-hidden">
                  {hackathonDetails.description}
                </p>
              </div>
            </div>
            <div className="flex gap-5 mt-[90px] ml-[22px]">
              <button
                onClick={() => navigate("/admin/hackathons/view/details")}
                className="border border-blue-500 rounded-md text-blue-500 w-[250px] text-xs mt-[50px] py-1 hover:bg-custom-blue mb-3 hover:text-white"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHackathon;
