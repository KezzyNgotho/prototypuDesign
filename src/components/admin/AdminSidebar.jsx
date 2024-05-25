import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/unitar-logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Diversity1Outlined, Grading } from "@mui/icons-material";

const AdminSidebar = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");
  useEffect(() => {
    if (pathnameArray[2] === undefined || pathnameArray[2] === "dashboard") {
      setActivePage("dashboard");
    } else {
      setActivePage(pathnameArray[2]);
    }
  }, [pathnameArray]);
  return (
    <div className="flex">
      <div className=" bg-light-blue  p-4  fixed left-0 top-0 w-[250px] overflow-y-auto h-screen ">
        <>
          <div className="flex justify-between items-center">
            <img src={logo} />
          </div>
          <button
            onClick={() => navigate("/admin/dashboard")}
            style={{
              borderColor: activePage === "dashboard" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5 "
          >
            <div className="flex gap-4">
              <DashboardCustomizeOutlinedIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px] ">Dashboard</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/teams")}
            style={{
              borderColor: activePage === "teams" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5  "
          >
            <div className="flex gap-4">
              <Diversity1Outlined className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px]">All Teams</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/participants")}
            style={{
              borderColor:
                activePage === "participants" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5 "
          >
            <div className="flex gap-4">
              <GroupOutlinedIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px] ">All participants</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/organizers")}
            style={{
              borderColor:
                activePage === "organizers" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5 "
          >
            <div className="flex gap-4">
              <GroupOutlinedIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px] ">All Organizers</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/hackathons")}
            style={{
              borderColor:
                activePage === "hackathons" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5 "
          >
            <div className="flex gap-4">
              <LayersOutlinedIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px] ">All Hackathons</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/submissions")}
            style={{
              borderColor:
                activePage === "submissions" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5 "
          >
            <div className="flex gap-4">
              <FolderOutlinedIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px] ">All Submissions</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/grades")}
            style={{
              borderColor: activePage === "grades" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5  "
          >
            <div className="flex gap-4">
              <Grading className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px]">All Grades</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            style={{
              borderColor: activePage === "users" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5 "
          >
            <div className="flex gap-4">
              <GroupOutlinedIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px]  ">Users</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/admin/categories")}
            style={{
              borderColor: activePage === "categories" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5  "
          >
            <div className="flex gap-4">
              <WorkspacesIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px]">Categories</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/notifications")}
            style={{
              borderColor: activePage === "notifications" ? "#089BD9" : "inherit",
              transition: "border-color 0.3s",
            }}
            className="  border rounded-md w-[200px] py-2 mt-5  "
          >
            <div className="flex gap-4">
              <NotificationsActiveIcon className="ml-7 w-7 h-7 text-custom-blue " />
              <p className=" text-[14px]">Notifications</p>
            </div>
          </button>
        </>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminSidebar;
