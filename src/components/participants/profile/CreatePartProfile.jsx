import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, CircularProgress } from "@mui/material";
import { axiosApi } from "../../../api";
import { selectLoggedInUserRef } from "../../../features/user/userSlice";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";
import { themes, getSubthemes } from "../../common/utils/ThemeUtils";
const CreatePartProfile = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const openModal = () => setOpenSuccessModal(true);
  const closeModal = () => setOpenSuccessModal(false);
  const navigate = useNavigate();

  const part_ref = useSelector(selectLoggedInUserRef);
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [subThemes, setSubThemes] = useState([]);
  const [userSubthemes, setUserSubthemes] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [participantDetails, setParticipantDetails] = useState({
    full_name: "",
    email: "",
    city: "",
    gender: "",
    date_of_birth: "",
    pathway: "",
    hackathon_theme: "",
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
    setParticipantDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const transmitPayload = new FormData();
    transmitPayload.append("full_name", participantDetails.full_name);
    transmitPayload.append("email", participantDetails.email);
    transmitPayload.append("city", participantDetails.city);
    transmitPayload.append("gender", participantDetails.gender);
    transmitPayload.append("date_of_birth", participantDetails.date_of_birth);
    transmitPayload.append("pathway", participantDetails.pathway);
    transmitPayload.append(
      "hackathon_theme",
      participantDetails.hackathon_theme
    );
    transmitPayload.append("sub_themes", JSON.stringify(userSubthemes));
    transmitPayload.append("user_id", part_ref);
    transmitPayload.append("profile_image", file);
    axiosApi
      .post("/participants", transmitPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          openModal();
          setSuccessMessage(true);

          setTimeout(() => {
            closeModal();
            navigate("/participant");
          }, 3000);
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };
  const handleThemeChange = (theme) => {
    setParticipantDetails((prevData) => ({
      ...prevData,
      hackathon_theme: theme,
    }));
    const subthemes = getSubthemes(theme);
    setSubThemes(subthemes);
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

      <div className=" right-side bg-white min-h-screen">
        <div>
          <form className=" ml-80 mt-4" onSubmit={handleSubmit}>
            <h1 className="text-[24px] text-gray-600 font-bold">
              Profile Information
            </h1>
            <div className=" bg-[#2e4161] rounded shadow w-[800px] h-[180px] mt-5 mb-5 px-5 py-3">
              <div>
                <h1 className="text-custom-blue text-[18px] font-bold ">
                  Dear Learner,
                </h1>
                <p className="text-sm mt-3 text-white ">
                  Thank you for completing the assigned Learning Pathway(Phase1)
                  of the UNITAR training programme on "Developing Essential
                  Digital Skills for Women and Youth in Africa: Enhancing
                  Employment and Livelihood Development in the Digital Economy"
                </p>
                <p className="text-sm mt-5 text-custom-blue">
                  Please complete your profile below to utilize this platform.
                </p>
              </div>
            </div>
            <h1 className="mb-2 text-[#4d4d4d] font-semibold text-[18px]">
              Your Details
            </h1>
            <label className="flex flex-col">
              <span className="text-black text-bold text-sm mb-4 ml-10">
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
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-row gap-[40px]">
                <div className=" px-10 py-3 w-[400px] h-[450px]  mt-5 mb-5">
                  <label className="flex flex-col">
                    <span className="text-black text-bold text-sm mt-[10px]">
                      Full Name
                    </span>
                    <input
                      type="text"
                      name="full_name"
                      value={participantDetails.full_name}
                      onChange={handleChange}
                      className="mt-1 mb-2 px-2 py-1 w-[350px]  border bg-inherit border-gray-400 rounded-md focus:outline-none focus:border-custom-blue"
                      required
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-black text-bold text-sm mt-2">
                      Email
                    </span>
                    <input
                      type="text"
                      name="email"
                      value={participantDetails.email}
                      onChange={handleChange}
                      className="mt-2 mb-2 px-2 py-1 w-[350px] border bg-inherit border-gray-400 rounded-md focus:outline-none focus:border-custom-blue"
                      required
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-black text-bold text-sm mt-2">
                      City
                    </span>
                    <input
                      type="text"
                      name="city"
                      value={participantDetails.city}
                      onChange={handleChange}
                      className="mt-2 px-2 py-1 w-[350px] bg-inherit border-gray-400 border rounded-md focus:outline-none focus:border-custom-blue"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-black text-bold text-sm mt-5">
                      Gender
                    </span>
                    <select
                      name="gender"
                      value={participantDetails.gender}
                      onChange={handleChange}
                      className="mt-1 px-2 py-[6px] w-[350px] mb-8 text-sm border  bg-inherit border-gray-400 rounded-md focus:outline-none focus:border-custom-blue"
                    >
                      {" "}
                      <option value="Select...">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </label>
                  <label className="flex flex-col">
                    <span className="text-black text-bold text-sm">
                      Date of Birth
                    </span>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={participantDetails.date_of_birth}
                      onChange={handleChange}
                      className="mt-1 px-2 py-[6px] w-[350px] text-sm border bg-inherit border-gray-400 rounded-md focus:outline-none focus:border-custom-blue"
                    />
                  </label>
                </div>
                <div className=" px-10 py-3 w-[500px] h-[500px] mt-8">
                  <label className="flex flex-col">
                    <span className="text-black text-bold text-sm mt-[10px">
                      Select Learning Pathway
                    </span>
                    <select
                      name="pathway"
                      value={participantDetails.pathway}
                      onChange={handleChange}
                      className="mt-1 px-2 py-[6px] w-[300px] mb-8 text-sm border  bg-inherit border-gray-400 rounded-md focus:outline-none focus:border-custom-blue"
                    >
                      <option value="Select...">Select...</option>
                      <option value="IBM Learning">IBM Learning</option>
                      <option value="Microsoft Learning">
                        Microsoft Learning
                      </option>
                    </select>
                  </label>
                  <label className="flex flex-col">
                    <span className="text-black text-bold text-sm">
                      Select A Hackathon Theme To Work on
                    </span>
                    <select
                      name="hackathon_theme"
                      value={participantDetails.hackathon_theme}
                      onChange={(e) => handleThemeChange(e.target.value)}
                      className="mt-1  px-2 py-[6px] w-[300px] mb-4 text-sm border  bg-inherit border-gray-400 rounded-md focus:outline-none focus:border-custom-blue"
                    >
                      <option value="Select..">Select..</option>
                      {themes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  {subThemes.length > 0 && (
                    <label className=" mb-2 text-sm text-black">
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

                  <div className="flex justify-around mt-4 ml-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-custom-blue text-white p-3 rounded-md ${handleHover()}`}
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePartProfile;
