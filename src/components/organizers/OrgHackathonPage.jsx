import React, { useEffect, useState } from "react";
import OrgHackathons from "./OrgHackathons";
import { useNavigate } from "react-router-dom";
import OrgProfile from "./profile/OrgProfile";
import { LinearProgress } from "@mui/material";

const OrgHackathonPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-8 right-side min-h-screen">
      <div className="ml-60">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h1 className="text-gray-600 font-bold  text-[24px]">Hackathons</h1>
            <OrgProfile />
          </div>
          <button
            onClick={() => navigate("create")}
            className="text-xs bg-custom-blue rounded-lg mt-10 mb-5 border w-[150px] text-white font-semibold p-3"
          >
            Create a hackathon
          </button>
          <span className="text-gray-600 font-semibold text-sm ">
            Your Hackathons
          </span>
        </div>
        <OrgHackathons />
      </div>
    </div>
  );
};

export default OrgHackathonPage;
