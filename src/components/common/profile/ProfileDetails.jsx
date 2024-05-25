import { Avatar } from "@mui/material";
import React, { useState } from "react";
import ProfileInputs from "./ProfileInputs";
import UserProfile from "../UserProfile";

const ProfileDetails = () => {
  const [profilePic, setProfilePic] = useState("");

  const handleUpdate = (newPic) => {
    setProfilePic(newPic);
  };

  const handleDelete = () => {
    setProfilePic(null); // Set to null or a default image path
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPic = reader.result;
        handleUpdate(newPic);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="bg-white p-8 right-side">
      <div className="overflow-y-auto  ml-60 flex  profile-details ">
        <div className="flex flex-col flex-1">
          <h1 className="mt-0 text-gray-600 font-bold mb-10 text-[20px] ">
            Profile
          </h1>
          <span className="text-sm font-semibold">Profile</span>
          <span className="text-sm text-gray-500 mt-2">
            Update your profile photo and details here
          </span>
          <hr className="w-[600px] mt-6" />
          <ProfileInputs />
        </div>
        <div className="flex-2 flex-col flex">
          <div className="flex justify-end mt-0 user-profile">
            <UserProfile profilePic={profilePic} />
          </div>

          <Avatar
            alt="Profile pic"
            src={profilePic}
            sx={{ width: "100px", height: "100px", marginTop: "50px" }}
          />
          <span className=" text-sm mt-5">Your photo</span>
          <span className="text-gray-500 text-xs mt-2">
            This will be displayed on your profile
          </span>
          <div className="flex gap-5 mt-5">
            <button className="text-red-600 text-xs" onClick={handleDelete}>
              Delete
            </button>
            <label className="text-xs text-custom-purple">
              Update
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
    </div>
  );
};

export default ProfileDetails;
