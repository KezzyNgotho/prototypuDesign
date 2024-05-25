import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTeamsHackathonSubmission } from "../../../api/teams/teams";
import {
  ChevronRight,
  Description,
  FileCopyOutlined,
} from "@mui/icons-material";
import { LinearProgress, Typography } from "@mui/material";
import AdminLogOut from "../AdminLogOut";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const TeamSubmission = () => {
  const location = useLocation();
  const teamId = location.state && location.state.team_id;

  const [submissionData, setSubmissionData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  function getTeamSubmissions() {
    if (teamId) {
      getTeamsHackathonSubmission(teamId)
        .then((res) => {
          if (res.status === 200) {
            setSubmissionData(res.data);
            setIsLoading(false);
            console.log(res.data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response && error.response.status === 404) {
            setError("Team has no submission");
          } else {
            setError(`Error fetching team submission: ${error.message}`);
          }
        });
    }
  }
  useEffect(() => {
    getTeamSubmissions();
  }, []);
  return (
    <div className="bg-[#FAF9F6] right-side min-h-screen">
      <div className="ml-[280px] mt-6">
        <div className="flex justify-between">
          <h1 className="mt-0 text-gray-600 font-bold text-[20px] relative">
            View Submission
          </h1>
          <div className="mr-10">
            <AdminLogOut />
          </div>
        </div>
        <p className="text-xs text-gray-500 flex flex-row mb-5">
          <span className="mt-[2px]">All Teams</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">View Submission Details</span>
        </p>
        {isLoading ? (
          <>
            <LinearProgress />
            <Typography>Fetching submission data...</Typography>
          </>
        ) : error ? (
          <div className="w-[600px] shadow bg-white rounded p-4 flex flex-row gap-5">
            <SentimentVeryDissatisfiedIcon
              className="text-custom-blue"
              sx={{ width: "40px", height: "40px" }}
            />
            <p>
              Looks like this team hasn't submitted anything yet! Watch out for
              submission updates.
            </p>
          </div>
        ) : (
          <div>
            <div className="  mt-4 bg-white w-[500px]  p-4 rounded shadow  transition-transform transform hover:-translate-y-1">
              <div className="flex gap-4 items-center">
                <Description
                  className="text-custom-blue"
                  sx={{ width: "40px", height: "40px" }}
                />
                <p className="font-bold text-gray-600">Description</p>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center px-2">
                <p>{submissionData?.solution_desc}</p>
              </div>
            </div>
            <div className="mt-4 bg-white w-3/4 mb-10 p-4 rounded shadow transition-transform transform hover:-translate-y-1">
              <div className="flex gap-4 items-center">
                <FileCopyOutlined
                  className="text-custom-blue"
                  sx={{ width: "40px", height: "40px" }}
                />
                <p className="font-bold text-gray-600">Submission Details</p>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600  w-[90px]">Submission Title</p>
                <p className=" flex flex-wrap mr-5">
                  {submissionData?.solution_title}
                </p>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600  w-[90px]">Submission live link</p>
                <a
                  href={submissionData?.solution_live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-blue flex flex-wrap ml-5"
                >
                  {submissionData?.solution_live_url}
                </a>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600 w-[90px]">
                  {" "}
                  Demonstration video link
                </p>
                <a
                  href={submissionData?.demo_video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-blue flex flex-wrap ml-5"
                >
                  {submissionData?.demo_video_link}
                </a>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600">Blog link</p>
                <a
                  href={submissionData?.blog_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-blue flex flex-wrap ml-5"
                >
                  {submissionData?.blog_link}
                </a>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600">Repository link</p>
                <a
                  href={submissionData?.repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-blue flex flex-wrap ml-5"
                >
                  {submissionData?.repo_link}
                </a>
              </div>
              {submissionData?.grade != null ? (
                <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150">
                  <p className="text-gray-600">Grade</p>
                  <p>{submissionData?.grade}</p>
                </div>
              ) : (
                <div className="flex flex-row justify-between text-sm mt-5 items-center p-2">
                  <p className="text-gray-600">Grade</p>
                  <p>Not graded yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSubmission;
