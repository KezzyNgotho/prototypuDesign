import React from "react";
import { Outlet } from "react-router-dom";
import UserProfile from "../../participants/profile/UserProfile";
import OpenHackathon from "./OpenHackathon";
import WarningIcon from "@mui/icons-material/Warning";

const HackathonDashboard = () => {
  return (
    <>
      <div className="overflow-y-auto  ml-60 bg-white p-8 right-side min-h-screen">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px]">Hackathons</h1>
          <UserProfile />
        </div>
        <div className="mt-10">
          <h1 className="text-gray-600 font-semibold text-sm">
            Open Hackathons
          </h1>
          {/* <p className="text-sm mt-5 font-semibold">
            Module Not Open To Access{" "}
            <WarningIcon sx={{ marginBottom: "5px", color: "#EE0612" }} />
          </p> */}
          <OpenHackathon />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default HackathonDashboard;
