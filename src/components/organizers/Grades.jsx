import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectOrganizerCode } from "../../features/organizer/organizerSlice";
import { useSelector } from "react-redux";
import {
  getHackathonGradingList,
  getHackathonLeaderBoard,
  getOrgHackathons,
  getOrganizerGradingList,
  getOrganizerLeaderBoard,
  getKenyanGrades,
} from "../../api/grades/grades";
import { Grading } from "@mui/icons-material";
import CustomDataGrid from "../common/utils/CustomDataGrid";
import {
  Box,
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import IconButton from "@mui/joy/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ListIcon from "@mui/icons-material/List";
import Menu from "@mui/joy/Menu";
import { KE } from "country-flag-icons/react/3x2";
import OrgProfile from "./profile/OrgProfile";
import SendFeedbackDialog from "./SendFeedbackDialog";

const Grades = () => {
  const org_code = useSelector(selectOrganizerCode);
  const [loading, setLoading] = useState(true);
  const [gradesPayload, setGradesPayload] = useState([]);
  const [selectedView, setSelectedView] = useState("organizer");
  const [errorMessage, setErrorMessage] = useState("");
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState("");
  const [listType, setListType] = useState("leader-boards");
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setListType(newValue);
    setGradesPayload([]);
    setLoading(true);
  };
  const fetchOrgHackathons = () => {
    getOrgHackathons(org_code)
      .then((res) => {
        if (res.status === 200) {
          setHackathons(res.data);
        }
      })
      .catch(handleApiError);
  };

  useEffect(() => {
    fetchOrgHackathons();
  }, []);

  const handleApiError = (error) => {
    setLoading(false);
    if (error.response && error.response.status === 404) {
      setErrorMessage(
        "No submission Grades yet! Stay tuned for the showcase. Exciting entries are on the way."
      );
    }
  };

  const fetchPayload = () => {
    if (listType === "leader-boards") {
      if (selectedView === "organizer") {
        getOrganizerLeaderBoard(org_code)
          .then((res) => {
            if (res.status === 200) {
              const gradesWithIds = res.data.map((row, index) => ({
                ...row,
                id: index + 1,
              }));
              setGradesPayload(gradesWithIds);
              setLoading(false);
            }
          })
          .catch(handleApiError);
      } else if (selectedView === "hackathon") {
        if (selectedHackathon !== "") {
          getHackathonLeaderBoard(selectedHackathon)
            .then((res) => {
              if (res.status === 200) {
                const gradesWithIds = res.data.map((row, index) => ({
                  ...row,
                  id: index + 1,
                }));
                setGradesPayload(gradesWithIds);
                setLoading(false);
              }
            })
            .catch((error) => {
              setLoading(false);
              setGradesPayload([]);
              setErrorMessage(
                error.response?.data?.message || "An error occurred"
              );
            });
        }
      }
    } else if (listType === "full-list") {
      if (selectedView === "organizer") {
        getOrganizerGradingList(org_code)
          .then((res) => {
            if (res.status === 200) {
              const gradesWithIds = res.data.map((row, index) => ({
                ...row,
                id: index + 1,
              }));
              setGradesPayload(gradesWithIds);
              setLoading(false);
            }
          })
          .catch(handleApiError);
      } else if (selectedView === "hackathon") {
        if (selectedHackathon !== "") {
          getHackathonGradingList(selectedHackathon)
            .then((res) => {
              if (res.status === 200) {
                const gradesWithIds = res.data.map((row, index) => ({
                  ...row,
                  id: index + 1,
                }));
                setGradesPayload(gradesWithIds);
                setLoading(false);
              }
            })
            .catch((error) => {
              setLoading(false);
              setGradesPayload([]);
              setErrorMessage(error.response.data.message);
            });
        }
      }
    } else if (listType === "kenya-list") {
      getKenyanGrades()
        .then((res) => {
          if (res.status === 200) {
            const gradesWithIds = res.data.map((row, index) => ({
              ...row,
              id: index + 1,
            }));
            setGradesPayload(gradesWithIds);
            setLoading(false);
          }
        })
        .catch(handleApiError);
    }
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
    setGradesPayload([]);
    setLoading(true);
  };
  const handleHackathonChange = (event) => {
    setSelectedHackathon(event.target.value);
    setGradesPayload([]);
    setLoading(true);
  };

  const openNotifModal = (params) => {
    setSubmissionId(params.row.submission_id);
    setOpenNotificationModal(true);
  };

  const closeNotificationModal = () => {
    setOpenNotificationModal(false);
  };

  const showDetails = (params) => {
    navigate("view-submission", {
      state: { submissionId: params.row.submission_id },
    });
  };

  useEffect(() => {
    fetchPayload();
  }, [selectedView, listType, selectedHackathon]);

  const columns = [
    {
      field: "team",
      headerName: "Team Name",
      width: 250,
    },
    {
      field: "organizer",
      headerName: "Organizer",
      width: 150,
    },
    {
      field: "submission_title",
      headerName: "Submission Title",
      width: 200,
    },
    {
      field: "hackathon",
      headerName: "Hackathon Title",
      width: 300,
    },
    {
      field: "mark",
      headerName: "Grade",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => showDetails(params)}>
              View Details
            </MenuItem>
            <MenuItem onClick={() => openNotifModal(params)}>
              <button className="bg-custom-blue text-white rounded-md text-xs font-semibold px-3 py-2 hover:bg-white hover:text-custom-blue hover:border hover:border-custom-blue">
                Send Feedback
              </button>
            </MenuItem>
          </Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full ">
      <div className="ml-60">
        <div className="flex justify-between">
          <h1 className="text-[24px] font-bold text-gray-600">
            Learner Grades and Leaderboards
          </h1>
          <OrgProfile />
        </div>
        <div>
          <div>
            <p className="w-[550px]">
              View leader boards and grading lists for graded submissions.
            </p>
          </div>
          <div className="flex justify-between my-5">
            <Box sx={{ mb: 1 }}>
              <Typography variant="p" fontWeight="600">
                View{" "}
                {listType === "leader-boards"
                  ? "leader boards"
                  : "full grading lists"}{" "}
                for {selectedView}
              </Typography>
              <Tabs value={listType} onChange={handleTabChange}>
                <Tab
                  value="leader-boards"
                  label="Leader Boards"
                  icon={<LeaderboardIcon />}
                  sx={{ mr: 5 }}
                />
                <Tab
                  value="full-list"
                  label="Complete Lists"
                  icon={<ListIcon />}
                />
                <Tab
                  value="kenya-list"
                  label="Kenyan Projects"
                  icon={<KE height="16px" />}
                />
              </Tabs>
            </Box>
            <div className="flex flex-col">
              <Typography variant="p" fontWeight="600">
                Select Category
              </Typography>
              <Box sx={{ maxWidth: 250 }}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label=""
                    value={selectedView}
                    onChange={handleViewChange}
                  >
                    <MenuItem value="organizer">Organizer Grades</MenuItem>
                    <MenuItem value="hackathon">Hackathon Grades</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
          <div>
            {selectedView === "hackathon" && (
              <Box sx={{ mb: 1, maxWidth: 500 }}>
                <Typography variant="p" fontWeight="600">
                  Select Hackathon
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="hackathon-select-label"
                    id="hackathon-select"
                    label=""
                    value={selectedHackathon}
                    onChange={handleHackathonChange}
                  >
                    {hackathons.map((hackathon) => (
                      <MenuItem
                        key={hackathon.id}
                        value={hackathon.hackathon_id}
                      >
                        {hackathon.hackathon_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </div>
        </div>
        {loading ? (
          <>
            <LinearProgress />
            <Typography>Fetching grades data...</Typography>
          </>
        ) : gradesPayload.length > 0 ? (
          <div className="flex-grow">
            <CustomDataGrid
              sx={{ mt: 3 }}
              rows={gradesPayload}
              columns={columns}
            />
            <SendFeedbackDialog
              openNotificationModal={openNotificationModal}
              closeNotificationModal={closeNotificationModal}
              submission_id={submissionId}
            />
          </div>
        ) : (
          <div className="w-[600px] shadow bg-white rounded p-4 flex flex-row gap-5 mt-5">
            <Grading
              className="text-custom-blue"
              sx={{ width: "40px", height: "40px" }}
            />
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grades;
