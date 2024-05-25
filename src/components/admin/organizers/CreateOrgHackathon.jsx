import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Stack, Grid, Typography, Box } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DatePicker from "../../common/utils/DatePicker";
import moment from "moment";
import { selectCurrentOrganizerDetail } from "../../../features/organizer/organizerSlice";
import { useNavigate } from "react-router-dom";
import { setCurrentHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import { createHackathon } from "../../../api/hackathons/hackathons";
const CreateOrgHackathon = () => {
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    title: "",
    highlight: "",
    location: "",
    description: "",
    deliverables: "",
    goals: "",
    prize: "",
  });
  const {
    title,
    highlight,
    location,
    description,
    deliverables,
    goals,
    prize,
  } = values;
  const [timelineItems, setTimelineItems] = useState([
    { period_name: "", start_date: "" },
  ]);
  const readCategories = (categoriesArray) => {
    setTags(categoriesArray);
  };
  const organization = useSelector(selectCurrentOrganizerDetail);
  const org_code = organization.id;

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
  const createOrgHackathon = (e) => {
    e.preventDefault();
    let hackathonObj = {
      title: title,
      highlight: highlight,
      location: location,
      description: description,
      deliverables: deliverables,
      goals: goals,
      prize: prize,
      timelines: timelineItems,
      tags: tags,
      organizer_id: org_code,
    };
    createHackathon(hackathonObj)
      .then((res) => {
        if (res.status === 201) {
          dispatch(
            setCurrentHackathonDetail({ currentHackathonDetail: res.data })
          );
          navigate("media");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full">
      <div className="ml-60">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px]">
            {" "}
            Create Hackathon
          </h1>
          {/* <OrgProfile /> */}
        </div>

        <div className=" flex">
          <div>
            <ValidatorForm
              onSubmit={(e) => createOrgHackathon(e)}
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

                <label
                  className="font-semibold mt-5 mb-4 text-xs  "
                  name="projectName"
                >
                  Hackathon categories
                </label>
                {/* <div className="flex flex-row border-gray-200 rounded p-2 border gap-2 ">
                  <TagSelector func={readCategories} />
                </div> */}
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
                <label
                  className="font-semibold mt-5 mb-2 text-xs "
                  name="projectName"
                >
                  Hackathon prizes
                </label>
                <TextField
                  id="outlined-multiline-static"
                  label=""
                  multiline
                  rows={4}
                  onChange={handleChange("prize")}
                  name="prize"
                  value={prize}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="  text-white  text-xs font-semibold bg-custom-blue  rounded-md p-2 w-[150px] mt-[20px]  hover:bg-white hover:text-custom-blue hover:border hover:border-custom-blue"
                  >
                    Submit Hackathon details
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

export default CreateOrgHackathon;
