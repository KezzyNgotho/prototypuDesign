import React from "react";
import OrgSubmissionsTable from "./OrgSubmissionsTable";
import OrgProfile from "./profile/OrgProfile";
import { useSelector } from "react-redux";
import { selectSelectedHackathonDetail } from "../../features/hackathon/hackathonSlice";
import { ChevronRight } from "@mui/icons-material";

const OrgSubmissions = () => {
  const hackathon = useSelector(selectSelectedHackathonDetail);
  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full">
      <div className="ml-60">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px] mb-5 ">
          {hackathon.title} Hackathon Submissions
          </h1>
          <OrgProfile />
        </div>
        <p className="text-xs text-gray-500  flex flex-row mb-5">
          <span className="mt-[2px]">Submissions</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">{hackathon.title}</span>
        </p>
        <div>
          <OrgSubmissionsTable hackathonId={hackathon.id} />
        </div>
      </div>
    </div>
  );
};

export default OrgSubmissions;
