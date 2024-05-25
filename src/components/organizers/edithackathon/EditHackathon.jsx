import React, { useState } from "react";
import { ChevronRight } from "@mui/icons-material";
import OrgProfile from "../profile/OrgProfile";
import {
  TextField,
  Button,
  Stack,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { themes } from "../../common/utils/ThemeUtils";
import DatePicker from "../../common/utils/DatePicker";
import { selectSelectedHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../../../api";

const EditHackathon = () => {
  const hackathonDetails = useSelector(selectSelectedHackathonDetail);
  const [formData, setFormData] = useState(hackathonDetails);
  const [coverImageSrc, setCoverImageSrc] = useState(null);
  const [avatarImageSrc, setAvatarImageSrc] = useState(null);
  const [avatarImagePic, setAvatarImagePic] = useState("");
  const [coverImagePic, setCoverImagePic] = useState("");
  const [coverImageState, setCoverImageState] = useState("view");
  const [avatarImageState, setAvatarImageState] = useState("view");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const coverImageUrl = hackathonDetails.cover_image_url
    ? hackathonDetails.cover_image_url
    : "/assets/noImage1.jpg";

  const avatarImageUrl = hackathonDetails.avatar_url
    ? hackathonDetails.avatar_url
    : "/assets/noImage2.jpg";

  const [timelineItems, setTimelineItems] = useState(
    hackathonDetails.timelines
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleAddTimelineItems = () => {
    const values = [...timelineItems];
    values.push({
      period_name: "",
      start_date: "",
    });
    setTimelineItems(values);
  };
  const handleRemoveTimelineItems = (index) => {
    const values = [...timelineItems];
    values.splice(index, 1);
    setTimelineItems(values);
  };
  const handleInputChange = (index, event) => {
    const values = [...timelineItems];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;
    setTimelineItems(values);
  };

  const handleCompletionDateChange = (date, index) => {
    let utcDate = moment.utc(date.$d, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
    const values = [...timelineItems];
    values[index]["start_date"] = utcDate.toISOString();
    setTimelineItems(values);
  };
  const handleThemeChange = (theme) => {
    setFormData((prevData) => ({
      ...prevData,
      hackathon_theme: theme,
    }));
  };

  const handleCoverImageChange = (event) => {
    setCoverImageState("edit");
    const selectedFile = event.target.files[0];
    setCoverImagePic(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImageSrc(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleAvatarImageChange = (event) => {
    setAvatarImageState("edit");
    const selectedFile = event.target.files[0];
    setAvatarImagePic(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarImageSrc(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const transmitPayload = new FormData();
    transmitPayload.append("title", formData.title);
    transmitPayload.append("highlight", formData.highlight);
    transmitPayload.append("location", formData.location);
    transmitPayload.append("description", formData.description);
    transmitPayload.append("hackathon_theme", formData.hackathon_theme);
    transmitPayload.append("deliverables", formData.deliverables);
    transmitPayload.append("goals", formData.goals);
    transmitPayload.append("timelines", JSON.stringify(timelineItems));
    {
      coverImagePic !== "" &&
        transmitPayload.append("cover_image", coverImagePic);
    }
    {
      avatarImagePic !== "" && transmitPayload.append("avatar", avatarImagePic);
    }
    console.log("raw", setFormData);
    console.log("edited", transmitPayload);
    try {
      // using put since we are attempting an overhaul by providing all details
      // this is a detriment to the images though, try patch and advise below
      // ------------------------
      await axiosApi.patch(
        `/hackathons/${hackathonDetails.id}/`,
        transmitPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(() => {
        navigate("/organizer/hackathons");
      }, 1500);
      setIsSubmitting(false);
    } catch (error) {
      // implement error handling mechanism
      console.log(error);
      setIsSubmitting(false);
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
    <div className="bg-white p-8 right-side min-h-screen min-w-full">
      <div className="ml-60">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px]">Hackathons</h1>
          <OrgProfile />
        </div>
        <p className="text-xs text-gray-500 flex flex-row">
          <span className="mt-[2px]">Hackathons</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">Edit Hackathon</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">Hackathon details</span>
        </p>
        <div className=" flex">
          <div>
            <ValidatorForm onSubmit={handleSubmit}>
              <div className="relative mt-8 mb-[80px]">
                {coverImageState === "view" &&
                  hackathonDetails.cover_image_url && (
                    <img
                      src={coverImageUrl}
                      alt=" "
                      style={{
                        width: "900px",
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                {coverImageState === "edit" && (
                  <img
                    src={coverImageSrc}
                    alt=""
                    style={{
                      width: "900px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div
                  style={{
                    position: "absolute",
                    bottom: "-40px",
                    left: "20px",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                >
                  {avatarImageState === "view" &&
                    hackathonDetails.avatar_url && (
                      <img
                        src={avatarImageUrl}
                        alt=""
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  {avatarImageState === "edit" && (
                    <img
                      src={avatarImageSrc}
                      alt=""
                      style={{
                        borderRadius: "50%",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-10 mb-10">
                {" "}
                <label className="text-xs text-[#8f45ad]">
                  Update cover image{" "}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleCoverImageChange}
                  />
                </label>
                <label className="text-xs text-[#db3b14]">
                  Update avatar image
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleAvatarImageChange}
                  />
                </label>
              </div>
              <p className="text-[18px] font-semibold text-gray-600">
                Hackathon Details
              </p>

              <div className="flex gap-[80px]">
                <div className="flex flex-col ">
                  <label
                    className="font-semibold mt-5 mb-2 text-xs "
                    name="projectName"
                  >
                    Hackathon title
                  </label>
                  <input
                    type="text"
                    className="w-[400px] px-3 py-2 border border-gray-400 rounded text-xs
                  focus:outline-none focus:border-custom-blue "
                    placeholder="Stack a Stake Competition"
                    required
                    onChange={handleChange}
                    name="title"
                    value={formData.title || " "}
                  />

                  <label
                    className="mt-5 mb-2 text-xs font-semibold"
                    name="projectName"
                  >
                    Hackathon highlight Phrase
                  </label>
                  <input
                    type="text"
                    className="w-[400px] px-3 py-2 border border-gray-400 rounded text-xs
                  focus:outline-none focus:border-custom-blue "
                    placeholder="Building for the future"
                    required
                    onChange={handleChange}
                    name="highlight"
                    value={formData.highlight || " "}
                  />
                  <label
                    className="mt-5 mb-2 text-xs font-semibold"
                    name="projectName"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-[400px] px-3 py-2 border border-gray-400 rounded text-xs
        focus:outline-none focus:border-custom-blue "
                    placeholder="virtual, hybrid, onsite, etc"
                    required
                    onChange={handleChange}
                    name="location"
                    value={formData.location || " "}
                  />
                  <label
                    className="font-semibold mt-5 mb-2 text-xs"
                    name="projectDescription"
                  >
                    Description
                  </label>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    name="description"
                    value={formData.description || " "}
                  />
                  <label className="flex flex-col mt-4">
                    <span className="font-semibold mt-5 mb-2 text-xs">
                      Select Hackathon Thematic Concern
                    </span>
                    <select
                      name="hackathon_theme"
                      value={formData.hackathon_theme || " "}
                      onChange={(e) => handleThemeChange(e.target.value)}
                      className="mt-1 px-2 py-[6px] w-[300px] mb-4 text-sm border  bg-inherit border-gray-400 rounded-md focus:outline-none focus:border-custom-blue"
                    >
                      <option value="Select..">Select..</option>
                      {themes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="flex flex-row gap-5">
                    <Grid>
                      {timelineItems.length > 0 &&
                        timelineItems.map((field, index) => {
                          return (
                            <Stack key={index}>
                              <Grid
                                container
                                component="fieldset"
                                sx={{
                                  border: "solid 3px #295FAB",
                                  borderRadius: "15px",
                                  padding: (theme) => theme.spacing(2),
                                }}
                              >
                                <legend>
                                  <Typography>Hackathon Timeline</Typography>
                                </legend>
                                <Grid sx={{ m: 1 }}>
                                  <Box>
                                    <Typography sx={{ fontWeight: "500" }}>
                                      Event Name
                                    </Typography>
                                    <TextValidator
                                      placeholder="project ideation"
                                      fullWidth
                                      value={field.period_name}
                                      onChange={(event) =>
                                        handleInputChange(index, event)
                                      }
                                      type="text"
                                      name="period_name"
                                      validators={["required"]}
                                      errorMessages={["This Field is Required"]}
                                    />
                                  </Box>
                                  <Box>
                                    <Typography sx={{ fontWeight: "500" }}>
                                      Date Due
                                    </Typography>
                                    <DatePicker
                                      handleDateChange={
                                        handleCompletionDateChange
                                      }
                                      idx={index}
                                    />
                                  </Box>
                                  <Box sx={{ mt: 2 }}>
                                    <Button
                                      sx={{
                                        color: "error.main",
                                        borderColor: "error.main",
                                      }}
                                      variant="outlined"
                                      onClick={() =>
                                        handleRemoveTimelineItems(index)
                                      }
                                    >
                                      Remove Entry
                                    </Button>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Stack>
                          );
                        })}
                      <Grid>
                        <Box>
                          <Stack direction="row">
                            {" "}
                            <Button
                              variant="outlined"
                              onClick={() => handleAddTimelineItems()}
                              sx={{ mt: 1, borderRadius: 2 }}
                            >
                              Add timeline entry
                            </Button>
                          </Stack>
                        </Box>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-semibold mt-5 mb-2 text-xs "
                    name="projectName"
                  >
                    Hackathon project deliverables
                  </label>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    sx={{ width: "400px" }}
                    onChange={handleChange}
                    name="deliverables"
                    value={formData.deliverables || " "}
                  />
                  <label
                    className="font-semibold mt-5 mb-2 text-xs "
                    name="projectName"
                  >
                    Hackathon project Goals
                  </label>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    name="goals"
                    value={formData.goals || " "}
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`${handleHover()} text-white  text-xs font-semibold bg-custom-blue  rounded-md p-2 w-[150px] mt-[20px]  hover:bg-white hover:text-custom-blue hover:border hover:border-custom-blue`}
                    >
                      {isSubmitting ? (
                        <>
                          <CircularProgress
                            sx={{ color: "primary" }}
                            size={20}
                          />{" "}
                          Submitting...
                        </>
                      ) : (
                        "Edit Hackathon Details"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </ValidatorForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHackathon;
