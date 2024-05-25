import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatars from "../common/Avatars";
import { useNavigate } from "react-router-dom";
import OrgProfile from "./profile/OrgProfile";
import { selectOrganizerCode } from "../../features/organizer/organizerSlice";
import { setSelectedHackathonDetail } from "../../features/hackathon/hackathonSlice";
import { getOrganizerHackathons } from "../../api/hackathons/hackathons";
import HackathonMedia from "../common/utils/HackathonMedia";
import { LinearProgress } from "@mui/material";

const OrgSubmissionPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hackathonsPayload, setHackathonsPalyload] = useState([]);
  const org_code = useSelector(selectOrganizerCode);
  const fetchHackathons = () => {
    getOrganizerHackathons(org_code)
      .then((res) => {
        if (res.status === 200) {
          setHackathonsPalyload(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleViewClick = (hackathonDetails) => {
    dispatch(
      setSelectedHackathonDetail({ selectedHackathonDetail: hackathonDetails })
    );
    navigate("details");
  };
  useEffect(() => {
    fetchHackathons();
  }, []);
  return (
    <div className="bg-white p-8 right-side min-h-screen ">
      <div className="ml-60">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px] mb-10 ">
            Submissions
          </h1>
          <OrgProfile />
        </div>
        <p className="text-gray-600 text-sm font-semibold">Select Submissions to view from your Hackathons</p>
        {loading && <LinearProgress />}
        {!loading && (
          <div className="flex flex-wrap space-x-4 mt-5 ml-4">
            {hackathonsPayload.length > 0 &&
              hackathonsPayload.map((field, index) => (
                <div
                  key={index}
                  className=" hover:border-custom-blue relative overflow-hidden border border-[#C7C7C7]  rounded-[20px] shadow mb-4 w-[300px] h-[380px] transition-transform transform hover:-translate-y-1"
                >
                  <HackathonMedia
                    cover_image_url={field.cover_image_url}
                    avatar_url={field.avatar_url}
                  />
                  <div className="relative">
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-white p-4 border-[#7C7C7C] border-t rounded-[20px]">
                      <p className="text-sm font-bold mt-4">{field.title}</p>
                      <p className="text-sm text-gray-700">{field.highlight}</p>
                      <p className="text-xs text-gray-500  mt-2 h-[30px] overflow-hidden">
                        {field.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-5 mt-[110px] ml-[22px]">
                    <button
                      onClick={() => handleViewClick(field)}
                      className="border border-blue-500 rounded-md text-blue-500 w-[250px] text-xs mt-4 py-2 hover:bg-custom-blue hover:text-white"
                    >
                      View submissions
                    </button>{" "}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgSubmissionPage;
