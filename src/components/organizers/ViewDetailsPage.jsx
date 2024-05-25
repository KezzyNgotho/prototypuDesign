import React, { useEffect, useState } from "react";
import OrgProfile from "./profile/OrgProfile";
import { getSubmissionsDetails } from "../../api/teams/teams";
import { useLocation } from "react-router-dom";
import {
  ChevronRight,
  DeleteOutlineOutlined,
  Description,
  EditOutlined,
  FileCopyOutlined,
} from "@mui/icons-material";
import NotesIcon from "@mui/icons-material/Notes";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { CircularProgress, LinearProgress, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import GradingModal from "./GradingModal";
import {
  deleteFeedback,
  getSubmissionFeedback,
} from "../../api/feedback/feedback";
import DeleteSuccessModal from "../admin/hackathons/DeleteSuccessModal";
import UpdateFeedbackModal from "./UpdateFeedbackModal";
const ViewDetailsPage = () => {
  const location = useLocation();
  const submissionId = location.state && location.state.submissionId;
  const [submissionData, setSubmissionData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeletingArray, setIsDeletingArray] = useState(
    Array(feedback.length).fill(false)
  );

  const [clickedFeedbackId, setClickedFeedbackId] = useState(null);
  const [openGradingModal, setGradingModal] = useState(false);
  const openModal = () => setGradingModal(true);
  const closeModal = () => setGradingModal(false);
  const [feedbackError, setFeedbackError] = useState(null);
  const handleFeedbackItemClick = (feedbackId) => {
    setClickedFeedbackId(feedbackId);
  };
  const fetchSubmissionData = () => {
    getSubmissionsDetails(submissionId)
      .then((res) => {
        if (res.status === 200) {
          setSubmissionData(res.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        if (
          error.response.status === 404 &&
          error.response.data &&
          error.response.data.message === "Submission has no feedback yet"
        ) {
          setFeedbackError(
            "The submission has no feedback yet. Click on send feedback to send one."
          );
        } else {
          setFeedbackError(`Error fetching feedback: ${error.message}`);
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
            "This submission has no feedback yet. Click on send feedback from the submissions table or grade it while providing feedback."
          );
        } else {
          setFeedbackError(`Error fetching feedback: ${error.message}`);
        }
      });
  };

  useEffect(() => {
    fetchSubmissionData();
  }, []);
  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleDeleteFeedback = (index, feedbackId) => {
    const updatedIsDeletingArray = [...isDeletingArray];
    updatedIsDeletingArray[index] = true;
    setIsDeletingArray(updatedIsDeletingArray);
    deleteFeedback(feedbackId).then((res) => {
      if (res.status === 204) {
        setDeleteModalOpen(true);
        setTimeout(() => {
          setDeleteModalOpen(false);
          window.location.reload();
        }, 2000);
        updatedIsDeletingArray[index] = false;
        setIsDeletingArray(updatedIsDeletingArray);
      } else {
        setErrorMessage("Error Deleting Account");
        updatedIsDeletingArray[index] = false;
        setIsDeletingArray(updatedIsDeletingArray);
      }
    });
  };

  return (
    <div className="bg-[#FAF9F6] p-8  min-h-screen right-side">
      <div className="ml-60">
        {isDeleteModalOpen && (
          <DeleteSuccessModal
            openModal={isDeleteModalOpen}
            closeModal={() => setDeleteModalOpen(false)}
          />
        )}
        {clickedFeedbackId && (
          <UpdateFeedbackModal
            openUpdateModal={true}
            closeUpdateModal={() => setClickedFeedbackId(null)}
            feedback={feedback.find((item) => item.id === clickedFeedbackId)}
          />
        )}
        <div className="flex justify-between">
          <div className="mb-2">
            {" "}
            <h1 className="mt-0 text-gray-600 font-bold  text-[20px] relative ">
              View Submission Details
            </h1>
          </div>
          <div>
            {" "}
            <OrgProfile />
          </div>
        </div>{" "}
        <p className="text-xs text-gray-500 flex flex-row mb-5">
          <span className="mt-[2px]">Submissions</span>
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
                      <div className="flex gap-4">
                        <EditOutlined
                          className="text-custom-blue cursor-pointer"
                          onClick={() =>
                            handleFeedbackItemClick(feedbackMessage.id)
                          }
                        />
                        {isDeletingArray[index] ? (
                          <CircularProgress sx={{ color: "red" }} size={20} />
                        ) : (
                          <DeleteOutlineOutlined
                            className="text-red-500 cursor-pointer"
                            onClick={() =>
                              handleDeleteFeedback(index, feedbackMessage.id)
                            }
                          />
                        )}
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
                <p className=" flex flex-wrap mr-5 max-w-[350px]">
                  {submissionData?.submission.solution_title}
                </p>
              </div>
              <div className="flex flex-row justify-between text-sm mt-5 items-center border-b border-gray-150 p-2">
                <p className="text-gray-600  w-[90px]">Submission live link</p>
                <a
                  href={submissionData?.submission.solution_live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-blue flex flex-wrap ml-5 max-w-[350px]"
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
                  className="text-custom-blue flex flex-wrap ml-5 max-w-[350px]"
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
                  className="text-custom-blue flex flex-wrap ml-5 max-w-[350px]"
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
                  className="text-custom-blue flex flex-wrap ml-5 max-w-[350px]"
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
              <div className="flex justify-end">
                <button
                  className="bg-custom-blue rounded-md w-[150px] mt-8 text-white text-sm font-bold px-3 py-2 hover:bg-white hover:text-custom-blue hover:border hover:border-custom-blue"
                  onClick={() => openModal()}
                >
                  Grade Hackathon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {openGradingModal && (
        <GradingModal
          openModal={openModal}
          handleClose={closeModal}
          submissionId={submissionData.submission.id}
        />
      )}
    </div>
  );
};

export default ViewDetailsPage;
