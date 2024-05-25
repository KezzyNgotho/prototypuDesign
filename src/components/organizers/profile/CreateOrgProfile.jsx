import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, CircularProgress } from "@mui/material";
import { axiosApi } from "../../../api";
import { selectLoggedInUserRef } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../participants/profile/SuccessModal";

const CreateOrgProfile = () => {
  const org_ref = useSelector(selectLoggedInUserRef);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const openModal = () => setOpenSuccessModal(true);
  const closeModal = () => setOpenSuccessModal(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [organizerDetails, setOrganizerDetails] = useState({
    name: "",
    location: "",
    industry: "",
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganizerDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const transmitPayload = new FormData();
    transmitPayload.append("name", organizerDetails.name);
    transmitPayload.append("location", organizerDetails.location);
    transmitPayload.append("industry", organizerDetails.industry);
    transmitPayload.append("user_id", org_ref);
    transmitPayload.append("profile_image", file);
    axiosApi
      .post("/organizers", transmitPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          setSuccessMessage(true);
          openModal();
          setTimeout(() => {
            closeModal();
            navigate("/organizer");
          }, 1000);
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
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
    <>
      {successMessage && (
        <SuccessModal openModal={openModal} handleClose={closeModal} />
      )}

      <div className="right-side min-h-screen bg-white">
        <form className="ml-80 mt-8" onSubmit={handleSubmit}>
          <h1 className="text-gray-600 text-[24px] font-bold">
            Organizer Profile
          </h1>

          <p className="font-bold text-sm text-custom-blue bg-[#2e4161] px-4 flex items-center rounded w-[600px] h-[80px] mt-4">
            Please complete your organizer profile below to utilize this
            platform.
          </p>
          <label className="flex flex-col mt-5">
            <span className="text-black text-bold text-md mb-2">
              Profile Image
            </span>
          </label>
          <div className="flex items-center ml-10 gap-[50px]">
            {file != null && (
              <Avatar
                alt="Profile pic"
                src={imageSrc}
                sx={{
                  width: "150px",
                  height: "150px",
                  marginTop: "20px",
                  marginBottom: "5px",
                }}
              />
            )}
            <div>
              <label
                className="bg-transparent w-[120px] ml-10  text-sm border text-custom-blue border-custom-blue  px-2 py-2 rounded-md cursor-pointer"
                htmlFor="imageInput"
              >
                {file === null ? "Add an Image" : "Choose new Image"}
                <input
                  id="imageInput"
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className=" w-[500px]  h-[600px] ">
            <div className="grid grid-cols-1 gap-6">
              <label className="block mt-5">
                <span className="text-black text-bold text-sm ">Name</span>
                <input
                  type="text"
                  name="name"
                  value={organizerDetails.name}
                  onChange={handleChange}
                  className="mt-1 px-2 py-1 w-full border border-gray-600 bg-inherit rounded-md focus:outline-none focus:border-custom-blue"
                  required
                />
              </label>

              <label className="block">
                <span className="text-black text-bold text-sm">Industry</span>
                <input
                  type="text"
                  name="industry"
                  value={organizerDetails.industry}
                  onChange={handleChange}
                  className="mt-1 px-2 py-1 w-full border border-gray-600 bg-inherit rounded-md focus:outline-none focus:border-custom-blue"
                  required
                />
              </label>

              <label className="block">
                <span className="text-black text-bold text-sm">Location</span>
                <input
                  type="text"
                  name="location"
                  value={organizerDetails.location}
                  onChange={handleChange}
                  className="mt-1 px-2 py-1 w-full border border-gray-600 bg-inherit rounded-md focus:outline-none focus:border-custom-blue"
                />
              </label>

              <div className="flex justify-around ml-[350px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${handleHover()} bg-custom-blue w-[150px] text-white py-2 px-1 rounded-md hover:bg-blue-500`}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                      Submitting...
                    </>
                  ) : (
                    "Save Profile"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateOrgProfile;
