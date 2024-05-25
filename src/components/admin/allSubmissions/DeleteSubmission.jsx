import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import AdminProfile from "../AdminLogOut";
import { useSelector } from "react-redux";
import { selectCurrentSubmissionDetail } from "../../../features/submission/submissionSlice";
import { deleteHackathonSubscription } from "../../../api/hackathons/hackathons";
import DeleteSubmissionModal from "./DeleteSubmissionModal";
import { useNavigate } from "react-router-dom";
const DeleteSubmission = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const submissionDetails = useSelector(selectCurrentSubmissionDetail);
  const [errorMessage, setErrorMessage] = useState("");
  const handleDelete = () => {
    deleteHackathonSubscription(submissionDetails.id).then((res) => {
      if (res.status === 204) {
        setModalOpen(false);
        setDeleteModalOpen(true);
        setTimeout(() => {
          setDeleteModalOpen(false);
          navigate(-1);
        }, 2000);
      } else {
        setErrorMessage("Error deleting submission");
      }
    });
  };
  const handleClick = () => {
    setModalOpen(true);
  };
  return (
    <div className="bg-white right-side min-h-screen min-w-full">
      <div className="ml-[280px]">
        <div className="flex justify-between mt-8">
          <h1 className="text-gray-600 font-bold text-[24px]">
            Submitted Hackathons
          </h1>
          <div className="mr-10">
            <AdminProfile />
          </div>
        </div>
        <div className="flex flex-wrap space-x-4  ml-4">
          <div className="flex rounded-[6px] shadow-xl flex-col border border-gray-100   w-[300px] h-[430px] transition-transform transform hover:-translate-y-1">
            <img
              className="rounded-t-[20px] w-[300px] h-[200px] object-cover"
              src={submissionDetails.hackathon.cover_image_url}
              alt=""
            />
            <p className=" text-sm ml-4 text-gray-700 mt-3 mb-1 font-bold">
              {submissionDetails.title}
            </p>

            <p className=" text-sm ml-4 text-gray-500">
              {submissionDetails.desc}
            </p>
            <div className=" ml-6 mt-[100px] ">
              <button
                onClick={handleClick}
                className="bg-red-500 text-white px-2 py-1 rounded-md mt-5 w-[250px]  hover:bg-red-600 "
              >
                Delete
              </button>
            </div>
          </div>
          <DeleteModal
            openModal={isModalOpen}
            closeModal={() => setModalOpen(false)}
            deleteSub={handleDelete}
            errorMessage={errorMessage}
          />
          <DeleteSubmissionModal
            openModal={isDeleteModalOpen}
            closeModal={() => setDeleteModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteSubmission;
