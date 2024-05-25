import React, { useState } from "react";
import { TextField } from "@mui/material";
import SubmissionModal from "./SubmissionModal";
import { useNavigate } from "react-router-dom";
import AdminProfile from "../AdminLogOut";

const EditSubmission = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "Existing Project Title",
    desc: "Existing Project Description",
    image: "https://example.com/image.jpg",
    gh_link: "https://github.com/username/project",
    demo_link: "https://example.com/demo",
    live_url: "https://example.com/live",
    blog: "https://example.com/blog",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);

      navigate("/admin/submissions");
    }, 2500);
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="bg-white min-h-screen min-w-full right-side ">
      <div className="ml-[300px] ">
        <div className="flex justify-between">
          <h1 className="mt-5 text-gray-600 font-bold text-[24px]">
            Hackathons
          </h1>
          <AdminProfile />
        </div>
        <h3 className="text-sm font-semibold mb-3 text-[15px]">
          Submit a project
        </h3>
        <form className="flex gap-[100px]" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mt-5 mb-2 text-xs" name="projectName">
              Project title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-[400px] px-3 py-2 border border-gray-400 rounded text-xs
              focus:outline-none focus:border-custom-blue "
              placeholder=""
              required
            />
            <span className="text-xs text-gray-500 mt-2">
              Do not exceed 20 characters writing the project name
            </span>

            <label className="mt-5 mb-2 text-xs" name="projectDescription">
              Project description
            </label>
            <TextField
              id="outlined-multiline-static"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              label=""
              multiline
              rows={4}
              defaultValue=""
            />

            <label className="mt-5 mb-2 text-xs" name="projectImage">
              Project image url
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-[400px] px-3 py-2 border border-gray-400 rounded text-xs
              focus:outline-none focus:border-custom-blue "
              placeholder=""
              required
            />
          </div>
          <div className="flex-col flex">
            <div className="flex flex-col">
              <label className="mt-5 mb-2 text-xs">Project link</label>
              <input
                type="text"
                name="gh_link"
                value={formData.gh_link}
                onChange={handleChange}
                className="w-[300px] px-3 py-2 border border-grey-600 rounded text-xs
        focus:outline-none focus:border-custom-blue "
                placeholder=""
                required
              />
              <span className="text-gray-400 text-xs mt-2">Must be a URL</span>

              <label className="mt-5 mb-2 text-xs">
                Project Demo Presentation link
              </label>
              <input
                type="text"
                name="demo_link"
                value={formData.demo_link}
                onChange={handleChange}
                className="w-[300px] px-3 py-2 border border-grey-600 rounded text-xs
        focus:outline-none focus:border-custom-blue "
                placeholder=""
                required
              />

              <label className="mt-5 mb-2 text-xs">Project live link</label>
              <input
                type="text"
                name="live_url"
                value={formData.live_url}
                onChange={handleChange}
                className="w-[300px] px-3 py-2 border border-grey-600 rounded text-xs
        focus:outline-none focus:border-custom-blue"
                placeholder=""
                required
              />

              <label className="mt-5 mb-2 text-xs">
                Project Blog link(optional)
              </label>
              <input
                type="text"
                name="blog"
                value={formData.blog}
                onChange={handleChange}
                className="w-[300px] px-3 py-2 border border-grey-600 rounded text-xs
        focus:outline-none focus:border-custom-blue"
                placeholder=""
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white mr-10 text-xs font-semibold bg-custom-blue  rounded-md p-2 w-[200px] mt-[20px]"
                >
                  Edit project submission
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <SubmissionModal
        openModal={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </div>
  );
};

export default EditSubmission;
