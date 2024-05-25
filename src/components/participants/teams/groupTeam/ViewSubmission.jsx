import React, { useEffect, useState } from "react";
import UserProfile from "../../profile/UserProfile";
import {
  ChevronRight,
  Description,
  FileCopyOutlined,
} from "@mui/icons-material";
import NotesIcon from '@mui/icons-material/Notes';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useLocation } from "react-router-dom";
import { getTeamSubmission } from "../../../../api/teams/teams";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { getSubmissionFeedback } from "../../../../api/feedback/feedback";

const ViewSubmission = () => {
  const location = useLocation();
  const teamId = location.state && location.state.team_id;
  const submissionId = location.state && location.state.submission_id;
  const [submissionData, setSubmissionData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackError, setFeedbackError] = useState(null);

  const fetchSubmissionData = () => {
    getTeamSubmission(teamId)
      .then((res) => {
        if (res.status === 200) {
          setSubmissionData(res.data);
          setIsLoading(false);
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
  const fetchFeedback = () => {
    getSubmissionFeedback(submissionId)
      .then((res) => {
        setFeedback(res.data);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        if (error.response && error.response.status === 404) {
          setFeedbackError(
            "You have not received any feedback yet."
          );
        } else {
          setFeedbackError(`Error fetching feedback: ${error.message}`);
        }
      });
  };

  useEffect(() => {
    fetchFeedback();
  }, []);
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
            <UserProfile />
          </div>
        </div>
        <p className="text-xs text-gray-500 flex flex-row mb-5">
          <span className="mt-[2px]">Teams & Submissions</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">View Team Details</span>
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
              Looks like this team hasn't submitted anything yet! Encourage your
              team leader to make a submission when they're ready.
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
                <NotesIcon
                  className="text-custom-blue"
                  sx={{ width: "40px", height: "40px" }}
                />
                <p className="font-bold text-gray-600">Feedback</p>
              </div>
              <div className="mt-5">
                {feedbackError ? (
                  <div className="flex gap-4">
                    {" "}
                    <EditNoteIcon
                      className="text-custom-blue"
                      sx={{ width: "40px", height: "40px" }}
                    />
                    <p>{feedbackError}</p>
                  </div>
                ) : (
                  feedback.map((feedbackMessage, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2 p-4 border-b border-gray-200"
                    >
                      <div className="flex flex-col">
                        <p className="max-w-[450px]">
                          {feedbackMessage.detail}
                        </p>
                      </div>
                    </div>
                  ))
                )}
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
                <p className=" flex flex-wrap mr-5  max-w-[350px]">
                  {submissionData?.solution_title}
                </p>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600  w-[90px]">Submission live link</p>
                <a
                  href={submissionData?.solution_live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-blue flex flex-wrap ml-5  max-w-[350px]"
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
                  className="text-custom-blue flex flex-wrap ml-5  max-w-[350px]"
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
                  className="text-custom-blue flex flex-wrap ml-5  max-w-[350px]"
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

export default ViewSubmission;
