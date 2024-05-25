import React, { useState } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import OrgProfile from "./OrgProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentOrganizerDetail } from "../../../features/organizer/organizerSlice";
import { axiosApi } from "../../../api";
import UpdateProfileModal from "../../participants/profile/UpdateProfileModal";

const OrgEditDetails = () => {
  const orgProfile = useSelector(selectCurrentOrganizerDetail);
  const [profilePic, setProfilePic] = useState("");
  const [organizerDetails, setOrganizerDetails] = useState(orgProfile);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [profileState, setProfileState] = useState("view");
  const [imageSrc, setImageSrc] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganizerDetails((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const transmitPayload = new FormData();
    transmitPayload.append("name", organizerDetails.name);
    transmitPayload.append("location", organizerDetails.location);
    transmitPayload.append("industry", organizerDetails.industry);
    {
      profilePic !== "" && transmitPayload.append("profile_image", profilePic);
    }
    try {
      await axiosApi.patch(`/organizers/${orgProfile.id}`, transmitPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);

        navigate("/organizer");
      }, 1500);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    setProfileState("edit");
    const selectedFile = event.target.files[0];
    setProfilePic(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-blue-500";
    }
  };
  return (
    <div className="bg-white p-8 right-side min-h-screen">
      <div className="overflow-y-auto  ml-60 flex  profile-details ">
        <div className="flex flex-col flex-1">
          <h1 className="mt-0 text-gray-600 font-bold mb-10 text-[20px] ">
            Profile
          </h1>
          <span className="text-sm font-semibold">Profile</span>
          <span className="text-sm text-gray-500 mt-2">
            Update your details and profile photo here.
          </span>
          <hr className="w-[600px] mt-6" />
          <div className="flex flex-col">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label className="mt-5 mb-2 text-sm text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={organizerDetails.name || " "}
                onChange={handleChange}
                className="w-[500px] px-3 py-2 border border-gray-400 rounded text-xs
          focus:outline-none focus:border-custom-blue"
                placeholder="Google"
              />

              <label className="mt-5 mb-2 text-sm text-gray-700">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={organizerDetails.industry || " "}
                onChange={handleChange}
                className="w-[500px] px-3 py-2 border border-gray-400 rounded text-xs
          focus:outline-none focus:border-custom-blue"
                placeholder="Tech"
              />

              <label className="mt-5 mb-2 text-sm text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={organizerDetails.location || " "}
                onChange={handleChange}
                className="w-[500px] px-3 py-2 border border-gray-400 rounded text-xs
          focus:outline-none focus:border-custom-blue"
                placeholder="USA"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${handleHover()} bg-custom-blue w-[150px] mt-4 text-white py-2 px-1 rounded-md hover:bg-blue-500`}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                    Submitting...
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="flex-2 flex-col flex">
          <div className="flex justify-end mt-0 user-profile">
            <OrgProfile />
          </div>

          {profileState === "view" && (
            <Avatar
              alt="Profile pic"
              src={organizerDetails.profile_image_url}
              sx={{ width: "100px", height: "100px", marginTop: "50px" }}
            />
          )}
          {profileState === "edit" && (
            <Avatar
              alt="Profile pic"
              src={imageSrc}
              sx={{ width: "100px", height: "100px", marginTop: "50px" }}
            />
          )}

          <span className="text-sm mt-5">Your photo</span>
          <span className="text-gray-500 text-xs mt-2">
            This will be displayed on your profile
          </span>
          <div className="flex gap-5 mt-5">
            <label className="text-xs text-custom-purple">
              Select New Profile Image
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
      <UpdateProfileModal
        openModal={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </div>
  );
};

export default OrgEditDetails;
