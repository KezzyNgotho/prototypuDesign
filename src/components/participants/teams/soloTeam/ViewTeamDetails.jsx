import React, { useEffect, useState } from "react";
import UserProfile from "../../profile/UserProfile";
import { useDispatch } from "react-redux";
import { ChevronRight, Email } from "@mui/icons-material";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import { getTeamDetails, getTeamSubmission } from "../../../../api/teams/teams";
import { LinearProgress, CircularProgress } from "@mui/joy";
import { setCurrentSubmissionDetail } from "../../../../features/submission/submissionSlice";
import { Chip } from "@mui/material";

const ViewTeamDetails = () => {
  const [fullTeamData, setFullTeamData] = useState({ id: "" });
  const [teamSubmission, setTeamSubmission] = useState({});
  const [statusIsLoading, setStatusIsLoading] = useState("loading");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const state = location.state;
  const team_id = state.team_id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getTeamInfo() {
    if (team_id) {
      getTeamDetails(team_id).then((res) => {
        if (res.status === 200) {
          setFullTeamData(res.data);
          setLoading(false);
        }
      });
    }
  }
  function checkSubmission() {
    if (team_id) {
      getTeamSubmission(team_id)
        .then((res) => {
          if (res.status === 200) {
            setTeamSubmission(res.data);
            dispatch(
              setCurrentSubmissionDetail({ currentSubmissionDetail: res.data })
            );
            setLoading(false);
            setStatusIsLoading("true");
          } else {
            setStatusIsLoading("false");
          }
        })
        .catch((error) => {
          console.error("Error in Axios request:", error);
          setStatusIsLoading("false");
        });
    }
  }

  const handleMakeSubmitClick = (team, hackathon) => {
    navigate("/participant/teams-submissions/submit", {
      state: { team_id: team, hackathon_id: hackathon },
    });
  };
  const handleEditSubmitClick = () => {
    navigate("/participant/teams-submissions/update");
  };
  const viewTeamSubmission = () => {
    navigate("/participant/teams-submissions/invite/submission", {
      state: { team_id: team_id, submission_id: teamSubmission.id },
    });
  };

  useEffect(() => {
    getTeamInfo();
  }, []);
  useEffect(() => {
    checkSubmission();
  }, []);
  return (
    <div className="bg-[#FAF9F6] right-side min-h-screen">
      <div className="ml-[280px] mt-6">
        <div className="flex justify-between">
          <h1 className="mt-0 text-gray-600 font-bold  text-[20px] relative ">
            Hackathons
          </h1>
          <div className="mr-10">
            <UserProfile />
          </div>
        </div>{" "}
        <p className="text-xs text-gray-500  flex flex-row mb-5">
          <span className="mt-[2px]">Teams & Submissions</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">View Team Details</span>
        </p>
        {loading && <LinearProgress />}
        <div>
          {!loading && fullTeamData.id !== "" && (
            <div className="flex gap-10">
              {fullTeamData.team_type == "solo" ? (
                <div className="  mt-4 bg-white w-[350px] h-[230px] p-4 rounded shadow  transition-transform transform hover:-translate-y-1">
                  <div className="flex gap-4 items-center">
                    <Diversity2Icon
                      className=" text-custom-blue "
                      sx={{ width: "40px", height: "40px" }}
                    />
                    <p className="font-bold text-gray-600">Team Information</p>
                  </div>
                  <div className="flex flex-row justify-between text-sm mt-5 items-center">
                    {" "}
                    <p className="w-[80px] text-gray-600">Name</p>
                    <p>{fullTeamData.team_name}</p>
                  </div>
                  <div className="flex flex-row justify-between text-sm mt-5 items-center">
                    {" "}
                    <p className="w-[80px] text-gray-600">Type</p>
                    <p>
                      {fullTeamData.team_type === "solo"
                        ? "Flying Solo"
                        : "Team work makes the dream work"}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between text-sm mt-5 items-center">
                    {" "}
                    <p className="w-[80px] text-gray-600">Leader</p>
                    <p>{fullTeamData.team_lead.full_name}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="  mt-4 bg-white w-[350px]  p-4 rounded shadow  transition-transform transform hover:-translate-y-1">
                    <div className="flex gap-4 items-center">
                      <Diversity2Icon
                        className=" text-custom-blue "
                        sx={{ width: "40px", height: "40px" }}
                      />
                      <p className="font-bold text-gray-600">Team Members</p>
                    </div>
                    <div className="flex flex-row justify-between text-sm mt-5 items-center">
                      {" "}
                      <p className="w-[80px] text-gray-600">Leader</p>
                      <p>{fullTeamData.team_lead.full_name}</p>
                    </div>
                    {fullTeamData.team_members.map((member, index) => (
                      <div
                        key={member.id}
                        className="flex flex-row justify-between text-sm mt-5 items-center"
                      >
                        <p className=" text-gray-600">Member {index + 1}</p>
                        <p>{member.full_name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="  mt-4 bg-white w-[350px]  p-4 rounded shadow  transition-transform transform hover:-translate-y-1">
                    <div className="flex gap-4 items-center">
                      <Email
                        className=" text-custom-blue "
                        sx={{ width: "40px", height: "40px" }}
                      />
                      <p className="font-bold text-gray-600">Invited Members</p>
                    </div>
                    {fullTeamData.invited_members.map((member, index) => (
                      <div
                        key={member.id}
                        className="flex flex-row justify-between text-sm mt-5 items-center"
                      >
                        <p className="w-[80px] text-gray-600">
                          Member {index + 1}
                        </p>
                        <p>{member.full_name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-8 mt-4 bg-white w-[450px] p-4 rounded shadow transition-transform transform hover:-translate-y-1">
                <div className="flex gap-4 items-center mb-3">
                  <LayersOutlinedIcon
                    className="text-custom-blue"
                    sx={{ width: "40px", height: "40px" }}
                  />
                  <p className="font-bold text-gray-600">
                    Team Hackathon Details
                  </p>
                </div>
                <div className="mt-3">
                  <div className="flex text-sm mt-5 flex-col">
                    {" "}
                    <p className="  font-bold text-sm">Title</p>
                    <p className="mt-2">{fullTeamData.hackathon.title}</p>
                  </div>
                  <div className="flex flex-col text-sm mt-2 ">
                    {" "}
                    <p className="  font-bold text-sm mt-5">Hackthon Theme</p>
                    <p className="mt-2">
                      {fullTeamData.hackathon.hackathon_theme}
                    </p>
                  </div>
                  <p className="  font-bold mt-8 text-sm mb-4">
                    Hackthon Sub-Thematic concerns
                  </p>
                  {fullTeamData.hackathon.sub_themes &&
                    fullTeamData.hackathon.sub_themes.map((field, index) => (
                      <Chip
                        key={index}
                        label={field}
                        sx={{
                          width: "350px",
                          backgroundColor: "#E2EDF1",
                          marginTop: "10px",
                          marginRight: "10px",
                          color: "#009edb",
                          transition: "width 0.3s",
                          "&:hover": {
                            width: "100%",
                          },
                        }}
                      />
                    ))}
                </div>
                {statusIsLoading === "loading" ? (
                  <CircularProgress />
                ) : statusIsLoading === "false" ? (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() =>
                        handleMakeSubmitClick(
                          fullTeamData.id,
                          fullTeamData.hackathon.id
                        )
                      }
                      className="border-custom-blue w-[200px] text-sm text-custom-blue border rounded px-2 py-1 "
                    >
                      Make Hackathon Submission
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between mt-10">
                    {" "}
                    <div>
                      <button
                        onClick={() => viewTeamSubmission()}
                        className="border-custom-blue w-[200px] py-2 text-sm text-custom-blue border rounded px-2  "
                      >
                        View Submission
                      </button>
                    </div>{" "}
                    <div>
                      <button
                        onClick={() => handleEditSubmitClick()}
                        className="bg-custom-blue w-[200px] py-2 text-sm text-white border rounded px-2  "
                      >
                        Edit Hackathon Submission
                      </button>
                    </div>
                  </div>
                )}{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTeamDetails;
