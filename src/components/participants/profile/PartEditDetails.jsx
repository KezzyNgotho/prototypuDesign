import React, { useState, useEffect } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { axiosApi } from "../../../api";
import { useSelector } from "react-redux";
import { selectCurrentParticipantDetail } from "../../../features/participant/participantSlice";
import UserProfile from "./UserProfile";
import UpdateProfileModal from "./UpdateProfileModal";
import { useNavigate } from "react-router-dom";
import { themes, getSubthemes } from "../../common/utils/ThemeUtils";

const PartEditDetails = () => {
  const participantProfile = useSelector(selectCurrentParticipantDetail);
  const [profilePic, setProfilePic] = useState("");
  const [formData, setFormData] = useState(participantProfile);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [profileState, setProfileState] = useState("view");
  const [imageSrc, setImageSrc] = useState(null);
  const [userSubthemes, setUserSubthemes] = useState([]);
  const [subThemes, setSubThemes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const transmitPayload = new FormData();
    transmitPayload.append("full_name", formData.full_name);
    transmitPayload.append("email", formData.email);
    transmitPayload.append("city", formData.city);
    transmitPayload.append("gender", formData.gender);
    transmitPayload.append("date_of_birth", formData.date_of_birth);
    transmitPayload.append("pathway", formData.pathway);
    transmitPayload.append("hackathon_theme", formData.hackathon_theme);
    transmitPayload.append("sub_themes", JSON.stringify(userSubthemes));
    {
      profilePic !== "" && transmitPayload.append("profile_image", profilePic);
    }
    try {
      await axiosApi.patch(
        `/participants/${participantProfile.id}`,
        transmitPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);

        navigate("/participant");
      }, 1500);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };
  const handleThemeChange = (theme) => {
    setFormData((prevData) => ({
      ...prevData,
      hackathon_theme: theme,
    }));
    const subthemes = getSubthemes(theme);
    setSubThemes(subthemes);
  };
  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-blue-500";
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

  const handleCheckboxChange = (subtheme) => {
    const isSubthemeSelected = userSubthemes.includes(subtheme);

    if (isSubthemeSelected) {
      setUserSubthemes((prevUserSubthemes) =>
        prevUserSubthemes.filter(
          (selectedSubtheme) => selectedSubtheme !== subtheme
        )
      );
    } else {
      setUserSubthemes((prevUserSubthemes) => [...prevUserSubthemes, subtheme]);
    }
  };

  useEffect(() => {
    setUserSubthemes(participantProfile.sub_themes);
  }, []);

  return (
    <div className="bg-white p-8 right-side min-h-screen">
      <div className="overflow-y-auto ml-60 flex profile-details">
        <div className="flex flex-col flex-1">
          <h1 className="mt-0 text-gray-600 font-bold mb-10 text-[20px]">
            Learner Profile
          </h1>
          <span className="text-sm font-semibold">
            Update your profile details here.
          </span>

          <hr className="w-[600px] mt-6" />
          <div className="flex flex-col">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label className="mt-5 mb-2 text-md text-black">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name || " "}
                onChange={handleChange}
                className="w-[500px] px-3 py-2 border border-gray-400 rounded text-xs
          focus:outline-none focus:border-custom-blue"
                placeholder="John"
              />

              <label className="mt-5 mb-2 text-md text-black">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email || " "}
                onChange={handleChange}
                className="w-[500px] px-3 py-2 border border-gray-400 rounded text-xs
          focus:outline-none focus:border-custom-blue"
                placeholder="Doe"
              />

              <label className="mt-5 mb-2 text-md text-black">City</label>
              <input
                type="text"
                name="city"
                value={formData.city || " "}
                onChange={handleChange}
                className="w-[500px] px-3 py-2 border border-gray-400 rounded text-xs
          focus:outline-none focus:border-custom-blue"
                placeholder="Lagos, Nigeria"
              />

              <label className="mt-5 mb-2 text-md text-black">
                Date of Birth
              </label>
              <input
                type="text"
                name="date_of_birth"
                value={formData.date_of_birth || " "}
                onChange={handleChange}
                className="w-[500px] px-3 py-2 border border-gray-400 rounded text-xs
          focus:outline-none focus:border-custom-blue"
                placeholder="YYYY-MM-DD"
              />
              <label className="mt-5 text-md text-black">
                Select A Hackathon Theme To Work on
              </label>
              <select
                name="hackathon_theme"
                value={formData.hackathon_theme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="mt-1 p-2 w-[500px] mb-2 text-sm border  bg-inherit border-gray-400 rounded-md focus:outline-none focus:border-custom-blue"
              >
                <option value="Select..">Select..</option>
                {themes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {subThemes.length > 0 && (
                <label className="mt-2 mb-2 text-md text-black">
                  Select your focus area on the theme above
                </label>
              )}
              {subThemes.map((subtheme) => (
                <div key={subtheme}>
                  <input
                    type="checkbox"
                    id={subtheme}
                    checked={userSubthemes.includes(subtheme)}
                    onChange={() => handleCheckboxChange(subtheme)}
                  />
                  <label
                    htmlFor={subtheme}
                    className="text-sm text-gray-700 m-2"
                  >
                    {" "}
                    {subtheme}
                  </label>
                </div>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`text-white font-semibold bg-custom-blue rounded-md p-2 w-[150px] ${handleHover()}`}
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
            <UserProfile />
          </div>

          {profileState === "view" && (
            <Avatar
              alt="Profile pic"
              src={formData.profile_image_url}
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

export default PartEditDetails;
