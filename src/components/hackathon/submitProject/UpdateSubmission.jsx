import React, { useState } from "react";
import UserProfile from "../../participants/profile/UserProfile";
import { ChevronRight } from "@mui/icons-material";
import { CircularProgress, TextField } from "@mui/material";
import { selectCurrentSubmissionDetail } from "../../../features/submission/submissionSlice";
import { useSelector } from "react-redux";
import { updateTeamHackathonResponse } from "../../../api/teams/teams";
import { useNavigate } from "react-router-dom";
import UpdateModal from "./UpdateModal";
const UpdateSubmission = () => {
  const submittedData = useSelector(selectCurrentSubmissionDetail);
  const [formData, setFormData] = useState(submittedData);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const openModal = () => setOpenSuccessModal(true);
  const closeModal = () => setOpenSuccessModal(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    updateTeamHackathonResponse(formData.id, formData).then((res) => {
      if (res.status === 200) {
        setOpenUpdateModal(true);
        setTimeout(() => {
          navigate("/participant/teams-submissions");
        }, 1500);
        setIsSubmitting(false);
      }
    });
  };
  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-blue-500";
    }
  };
  return (
    <div className="bg-white right-side min-h-screen">
      <div className="ml-[280px] mt-6">
        <div className="flex justify-between items-center">
          <h1 className="mt-5 text-gray-600 font-bold  text-[24px]">
            Hackathons
          </h1>
          <div className="mr-10">
            <UserProfile />
          </div>
        </div>
        <p className=" text-xs text-gray-500 flex mb-10 flex-row">
          <span className="mt-[2px]">Hackathons</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">Submissions</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">Update</span>
        </p>
        <h3 className="text-sm font-semibold mb-3 text-[15px]">
          Update submission details
        </h3>
        <form className="flex gap-[100px] " onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              className="mt-5 mb-2 font-semibold text-sm"
              name="projectName"
            >
              Solution title
            </label>
            <input
              type="text"
              name="solution_title"
              value={formData.solution_title}
              onChange={handleChange}
              className="w-[400px] px-3 py-2 border border-gray-400 rounded font-semibold text-sm
          focus:outline-none focus:border-custom-blue "
              placeholder=""
            />
            <span className="text-xs text-gray-500 mt-2">
              Do not exceed 20 characters writing the project name
            </span>

            <label
              className="mt-5 mb-2 font-semibold text-sm"
              name="projectDescription"
            >
              Solution description
            </label>
            <TextField
              id="outlined-multiline-static"
              name="solution_desc"
              value={formData.solution_desc}
              onChange={handleChange}
              label=""
              multiline
              rows={4}
              defaultValue=""
            />

            <label
              className="mt-5 mb-2 font-semibold text-sm"
              name="projectImage"
            >
              Solution image url
            </label>

            <input
              type="text"
              name="solution_image"
              value={formData.solution_image}
              onChange={handleChange}
              className="w-[400px] px-3 py-2 border border-gray-400 rounded text-sm
          focus:outline-none focus:border-custom-blue "
              placeholder=""
            />
          </div>
          <div className="flex-col flex">
            <div className="flex flex-col">
              <label className="mt-5 mb-2 font-semibold text-sm">
                Solution live url
              </label>
              <input
                type="text"
                name="solution_live_url"
                value={formData.solution_live_url}
                onChange={handleChange}
                className="w-[300px] px-3 py-2 border border-grey-600 rounded  text-sm
    focus:outline-none focus:border-custom-blue "
                placeholder=""
              />
              <span className="text-gray-400 text-xs mt-2">Must be a URL</span>

              <label className="mt-5 mb-2 font-semibold text-sm">
                Solution Demo Video link
              </label>
              <input
                type="text"
                name="demo_video_link"
                value={formData.demo_video_link}
                onChange={handleChange}
                className="w-[300px] px-3 py-2 border border-grey-600 rounded  text-sm
    focus:outline-none focus:border-custom-blue "
                placeholder=""
              />

              <label className="mt-5 mb-2 font-semibold text-sm">
                Solution blog link (optional)
              </label>
              <input
                type="text"
                name="blog_link"
                value={formData.blog_link}
                onChange={handleChange}
                className="w-[300px] px-3 py-2 border border-grey-600 rounded  text-sm
    focus:outline-none focus:border-custom-blue"
                placeholder=""
              />

              <label className="mt-5 mb-2 font-semibold text-sm">
                Solution repository link
              </label>
              <input
                type="text"
                name="repo_link"
                value={formData.repo_link}
                onChange={handleChange}
                className="w-[300px] px-3 py-2 border border-grey-600 rounded text-sm
    focus:outline-none focus:border-custom-blue"
                placeholder=""
              />

              <div className="flex justify-end mb-5">
                <button
                  type="submit"
                  className={`${handleHover()} text-white mr-10 text-sm font-semibold bg-custom-blue  rounded-md p-2 w-[150px] mt-[20px]`}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                      Submitting...
                    </>
                  ) : (
                    "Update Submission"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {openUpdateModal && (
        <UpdateModal openModal={openModal} handleClose={closeModal} />
      )}
    </div>
  );
};

export default UpdateSubmission;
