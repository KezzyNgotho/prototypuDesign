import React, { useState, useEffect } from "react";
import { getPlatformStats } from "../../api/admins/admins";
import AdminLogOut from "./AdminLogOut";
import OrganizersChart from "./charts/OrganisersChart";
import HackathonChart from "./charts/HackathonCharts";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    getPlatformStats().then((res) => {
      setStats(res.data);
    });
  }, []);
  return (
    <div className="bg-[#F5F5F5] p-8 right-side min-h-screen min-w-full ">
      <div className="ml-60">
        <div className="flex justify-end ">
          <AdminLogOut />
        </div>
        <div className="bg-custom-blue h-[120px] rounded-md mt-3  ">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-white font-bold py-4 pl-5 text-[24px]">
                Dashboard
              </h1>
            </div>
            <img
              src="/assets/unitarblue.png"
              className="h-[120px] mr-[100px] w-[200px]"
            />
          </div>
        </div>
        <div className="flex flex-row gap-[30px]">
          <div className=" rounded-md bg-white shadow-md mt-[30px] w-[700px]">
            <h1 className="text-gray-700 font-semibold text-md mb-5 mt-10 ml-5">
              Top Five Most Participated in Hackathons
            </h1>
            <HackathonChart />
          </div>
          <div className="flex flex-col">
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <GroupOutlinedIcon className="ml-7 w-7 h-7 text-custom-blue mt-5" />
                <p className=" mt-4">Total Participants</p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold mt-6">
                {stats.participant}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <GroupOutlinedIcon className="ml-7 w-7 h-7 text-custom-blue mt-5 " />

                <p className=" mt-4">Total Organisers</p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold mt-6">
                {stats.organizer}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-md h-[120px] w-[250px] mt-8">
              <div className="flex  items-center gap-3">
                <LayersOutlinedIcon className="ml-7 w-7 h-7 text-custom-blue mt-5 " />
                <p className=" mt-4">Total Hackathons</p>
              </div>
              <p className="ml-[100px]  text text-[24px]  text-custom-blue font-bold mt-6">
                {stats.hackathon}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-white shadow-md mt-10 py-2">
          <h1 className="text-gray-700 font-semibold text-md mb-5 mt-10 ml-5">
            The Organizations with the most submitted hackathons
          </h1>
          <OrganizersChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
