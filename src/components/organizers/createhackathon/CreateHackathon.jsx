import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Stack,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { themes } from "../../common/utils/ThemeUtils";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DatePicker from "../../common/utils/DatePicker";
import moment from "moment";
import { selectOrganizerCode } from "../../../features/organizer/organizerSlice";
import { createHackathon } from "../../../api/hackathons/hackathons";
import OrgProfile from "../profile/OrgProfile";
import { useNavigate } from "react-router-dom";
import { setCurrentHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import { ChevronRight } from "@mui/icons-material";
const CreateHackathon = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    title: "",
    highlight: "",
    location: "",
    description: "",
    deliverables: "",
    goals: "",
    hackathon_theme: "",
  });
  const {
    title,
    highlight,
    location,
    description,
    deliverables,
    goals,
    hackathon_theme,
  } = values;
  const [timelineItems, setTimelineItems] = useState([
    { period_name: "", start_date: "" },
  ]);

  const org_code = useSelector(selectOrganizerCode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleCreateHackathon = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let hackathonObj = {
      title: title,
      highlight: highlight,
      location: location,
      description: description,
      deliverables: deliverables,
      goals: goals,
      hackathon_theme: hackathon_theme,
      timelines: timelineItems,
      organizer_id: org_code,
    };
    createHackathon(hackathonObj)
      .then((res) => {
        if (res.status === 201) {
          dispatch(
            setCurrentHackathonDetail({ currentHackathonDetail: res.data })
          );

          navigate("media");
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };
  const handleThemeChange = (theme) => {
    setValues((prevData) => ({
      ...prevData,
      hackathon_theme: theme,
    }));
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
          <span className="mt-[2px]">Create a hackathon</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">Basic details</span>
        </p>

        <div className=" flex">
          <div>
            <ValidatorForm
              onSubmit={(e) => handleCreateHackathon(e)}
              className="flex gap-[80px]"
            >
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
                  onChange={handleChange("title")}
                  name="title"
                  value={title}
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
                  onChange={handleChange("highlight")}
                  name="highlight"
                  value={highlight}
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
                  onChange={handleChange("location")}
                  name="location"
                  value={location}
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
                  onChange={handleChange("description")}
                  name="description"
                  value={description}
                />
                <label className="flex flex-col mt-4">
                  <span className="font-semibold mt-5 mb-2 text-xs">
                    Select Hackathon Thematic Concern
                  </span>
                  <select
                    name="hackathon_theme"
                    value={values.hackathon_theme}
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
                                  {/* put a date field here */}
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
                  onChange={handleChange("deliverables")}
                  name="deliverables"
                  value={deliverables}
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
                  onChange={handleChange("goals")}
                  name="goals"
                  value={goals}
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`${handleHover()}  text-white  text-xs font-semibold bg-custom-blue  rounded-md p-2 w-[150px] mt-[20px]  hover:bg-white hover:text-custom-blue hover:border hover:border-custom-blue`}
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress sx={{ color: "primary" }} size={20} />{" "}
                        Submitting...
                      </>
                    ) : (
                      "Submit Hackathon Details"
                    )}
                  </button>
                </div>
              </div>
            </ValidatorForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHackathon;
