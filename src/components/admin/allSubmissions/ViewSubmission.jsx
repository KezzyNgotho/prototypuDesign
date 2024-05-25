import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSubmissionsDetails } from "../../../api/teams/teams";
import AdminLogOut from "../AdminLogOut";
import {
  ChevronRight,
  Description,
  FileCopyOutlined,
} from "@mui/icons-material";
import { LinearProgress, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Diversity2Icon from "@mui/icons-material/Diversity2";

const ViewSubmissions = () => {
  const location = useLocation();
  const submissionId = location.state && location.state.submission_id;
  const [submissionData, setSubmissionData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubmissionData = () => {
    getSubmissionsDetails(submissionId)
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
  };

  useEffect(() => {
    fetchSubmissionData();
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
          <span className="mt-[2px]">Al Submissions</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">View Submissions</span>
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
            <div className="flex gap-5">
              {" "}
              <div className=" mt-4 bg-white w-[250px] p-4 rounded shadow  transition-transform transform hover:-translate-y-1">
                <div className="flex justify-center mb-3">
                  <Diversity2Icon
                    className=" text-custom-blue "
                    sx={{ width: "40px", height: "40px" }}
                  />
                </div>
                <p className="text-bold text-black">
                  {submissionData?.team.team_name}
                </p>
                <p className="text-bold text-black text-sm">
                  {submissionData?.team.team_type === "solo"
                    ? "Flying Solo"
                    : "Teamwork makes the dream work"}{" "}
                </p>
              </div>
              <div className="  mt-4 bg-white w-[530px]  p-4 rounded shadow  transition-transform transform hover:-translate-y-1">
                <div className="flex gap-4 items-center">
                  <Description
                    className="text-custom-blue"
                    sx={{ width: "40px", height: "40px" }}
                  />
                  <p className="font-bold text-gray-600">Description</p>
                </div>
                <div className="flex flex-row justify-between text-sm mt-5 items-center px-2">
                  <p>{submissionData?.submission.solution_desc}</p>
                </div>
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
                  {submissionData?.submission.solution_title}
                </p>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600  w-[90px]">Submission live link</p>
                <a
                  href={submissionData?.submission.solution_live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-blue flex flex-wrap ml-5"
                >
                  {submissionData?.submission.solution_live_url}
                </a>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600 w-[90px]">
                  {" "}
                  Demonstration video link
                </p>
                <a
                  href={submissionData?.submission.demo_video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-blue flex flex-wrap ml-5"
                >
                  {submissionData?.submission.demo_video_link}
                </a>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600">Blog link</p>
                <a
                  href={submissionData?.submission.blog_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-blue flex flex-wrap ml-5"
                >
                  {submissionData?.submission.blog_link}
                </a>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600">Repository link</p>
                <a
                  href={submissionData?.submission.repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-blue flex flex-wrap ml-5"
                >
                  {submissionData?.submission.repo_link}
                </a>
              </div>
              {submissionData?.submission.grade != null ? (
                <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150">
                  <p className="text-gray-600">Grade</p>
                  <p>{submissionData?.submission.grade}</p>
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

export default ViewSubmissions;
