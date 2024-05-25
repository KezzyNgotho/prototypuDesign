import React, { useState, useEffect } from "react";
import logo from "../../assets/unitar-logo.svg";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { Grading } from "@mui/icons-material";

const OrgSidebar = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");
  useEffect(() => {
    if (pathnameArray[2] === undefined || pathnameArray[2] === "dashboard") {
      setActivePage("dashboard");
    } else if (pathnameArray[2] === "hackathons") {
      setActivePage("hackathons");
    } else if (pathnameArray[2] === "submissions") {
      setActivePage("submissions");
    } else if (pathnameArray[2] === "grades") {
      setActivePage("grades");
    }
  }, [pathnameArray]);
  return (
    <div className=" flex ">
      <div className="bg-light-blue w-[250px]  p-5 h-screen fixed left-0 top-0 ">
        <div className="flex justify-between">
          <img src={logo} alt="" />
        </div>
        <button
          onClick={() => navigate("/organizer/dashboard")}
          style={{
            borderColor: activePage === "dashboard" ? "#089BD9" : "inherit",
            transition: "border-color 0.3s",
          }}
          className="py-2 pl-6 pr-5 border rounded-md   mt-16"
        >
          <div className="flex gap-5">
            <DashboardCustomizeOutlinedIcon className=" w-7 h-7 text-custom-blue " />
            <span className="text-[14px]">Dashboard</span>
          </div>
        </button>

        <button
          onClick={() => navigate("/organizer/hackathons")}
          style={{
            borderColor: activePage === "hackathons" ? "#089BD9" : "inherit",
            transition: "border-color 0.3s",
          }}
          className="py-2 pl-6 pr-5 border rounded-md hover:border-custom-blue mt-5"
        >
          <div className="flex gap-5">
            <LayersOutlinedIcon className=" w-7 h-7 text-custom-blue " />
            <span className="text-[14px]">Hackathons</span>
          </div>
        </button>

        <button
          onClick={() => navigate("/organizer/submissions")}
          style={{
            borderColor: activePage === "submissions" ? "#089BD9" : "inherit",
            transition: "border-color 0.3s",
          }}
          className="py-2 px-6 border rounded-md mt-5"
        >
          <div className="flex gap-5">
            <FolderOutlinedIcon className=" w-7 h-7 text-custom-blue " />
            <span className="text-[14px]">Submissions</span>
          </div>
        </button>
        <button
          onClick={() => navigate("/organizer/grades")}
          style={{
            borderColor: activePage === "grades" ? "#089BD9" : "inherit",
            transition: "border-color 0.3s",
          }}
          className="py-2 px-6 border rounded-md mt-5"
        >
          <div className="flex gap-5">
            <Grading className=" w-7 h-7 text-custom-blue " />
            <span className="text-[14px]">Grades</span>
          </div>
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default OrgSidebar;
