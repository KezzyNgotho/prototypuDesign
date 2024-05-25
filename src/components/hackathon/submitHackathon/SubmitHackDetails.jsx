import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";
import UserProfile from "../../participants/profile/UserProfile";
import { submitTeamHackathonResponse } from "../../../api/teams/teams";
import SubmitModal from "./SubmitModal";
import { ChevronRight } from "@mui/icons-material";
const SubmitHackDetails = () => {
  const location = useLocation();
  const state = location.state;
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    team_id: state.team_id,
    hackathon_id: state.hackathon_id,
    repo_link: "",
    demo_video_link: "",
    blog_link: "",
    solution_title: "",
    solution_desc: "",
    solution_image: "",
    solution_live_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    submitTeamHackathonResponse(formData).then((res) => {
      if (res.status === 200) {
        setSubmitModalOpen(true);
        setTimeout(() => {
          setSubmitModalOpen(false);
          setIsSubmitting(false);
          navigate("/participant/teams-submissions");
        }, 1500);
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
  const handleModalClose = () => {
    setSubmitModalOpen(false);
  };

  return (
    <div className="ml-[260px]">
      <div className="flex justify-between">
        <h1 className="mt-5 text-gray-600 font-bold  text-[24px]">
          Hackathons
        </h1>
        <UserProfile />
      </div>
      <p className=" text-xs text-gray-500 flex mb-10 flex-row">
        <span className="mt-[2px]">Hackathons</span>
        <ChevronRight sx={{ width: "20px", height: "20px" }} />
        <span className="mt-[2px]">Build4SDGs</span>
        <ChevronRight sx={{ width: "20px", height: "20px" }} />
        <span className="mt-[2px]">Submit a project</span>
      </p>
      <h3 className="text-sm font-semibold mb-3 text-[15px]">
        Submit a project
      </h3>
      <form className="flex gap-[100px]" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mt-5 mb-2 font-semibold text-sm" name="projectName">
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
          <span className=" text-xs text-gray-500 mt-2">
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
            className="w-[400px] px-3 py-2 border border-gray-400 rounded font-semibold text-sm
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
              className="w-[300px] px-3 py-2 border border-grey-600 rounded font-semibold text-sm
        focus:outline-none focus:border-custom-blue "
              placeholder=""
            />
            <span className="text-gray-400  text-xs mt-2">Must be a URL</span>

            <label className="mt-5 mb-2  text-sm font-semibold">
              Solution Demo Video link
            </label>
            <input
              type="text"
              name="demo_video_link"
              value={formData.demo_video_link}
              onChange={handleChange}
              className="w-[300px] px-3 py-2 border border-grey-600 rounded font-semibold text-sm
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
              className="w-[300px] px-3 py-2 border border-grey-600 rounded font-semibold text-sm
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
              className="w-[300px] px-3 py-2 border border-grey-600 rounded font-semibold text-sm
        focus:outline-none focus:border-custom-blue"
              placeholder=""
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className={`${handleHover()} text-white mr-10  text-sm font-semibold bg-custom-blue  rounded-md p-2 w-[150px] mt-[20px]`}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                    Submitting...
                  </>
                ) : (
                  "Submit Project"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      <SubmitModal
        handleClose={handleModalClose}
        openModal={isSubmitModalOpen}
      />
    </div>
  );
};

export default SubmitHackDetails;
