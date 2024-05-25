import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserProfile from "../profile/UserProfile";
import {
  selectInviteRef,
  setCurrentInviteDetail,
} from "../../../features/invite/inviteSlice";
import {
  getTeamInviteDetails,
  invitationActions,
} from "../../../api/teams/teams";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { Email } from "@mui/icons-material";
import {
  Chip,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
const ViewInviteDetails = () => {
  const [inviteDetails, setInviteDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isActivating, setIsActivating] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const invite_id = useSelector(selectInviteRef);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchInviteDetails = () => {
    getTeamInviteDetails(invite_id).then((res) => {
      if (res.status === 200) {
        setInviteDetails(res.data);
        dispatch(setCurrentInviteDetail({ currentInviteDetail: res.data }));
        setIsLoading(false);
      }
    });
  };
  const acceptInvitation = () => {
    setIsActivating(true);
    invitationActions({
      user_action: "accept",
      key: inviteDetails.key,
    }).then((res) => {
      if (res.status === 200) {
        setIsLoading(true);
        fetchInviteDetails();
      } else alert("something went wrong!");
    });
  };

  const declineInvitation = () => {
    setIsDeactivating(true);
    invitationActions({
      user_action: "decline",
      key: inviteDetails.key,
    }).then((res) => {
      if (res.status === 200) {
        setIsLoading(true);
        fetchInviteDetails();
      } else alert("something went wrong!");
    });
  };

  const viewTeamSubmission = () => {
    navigate("submission", {
      state: { team_id: inviteDetails.team.id },
    });
  };

  useEffect(() => {
    fetchInviteDetails();
  }, []);

  const handleHoverActivate = () => {
    if (isActivating) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue";
    }
  };
  const handleHoverDeactivate = () => {
    if (isDeactivating) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue";
    }
  };
  return (
    <>
      <div className="bg-[#FAF9F6] right-side min-h-screen min-w-full">
        <div className="ml-[280px]">
          <div className="flex justify-between mt-5">
            <h1 className="mt-0 text-gray-600 font-bold  text-[24px] relative ">
              Team Invite Details
            </h1>
            <div className="mr-10">
              <UserProfile />
            </div>
          </div>
          {isLoading && (
            <>
              <LinearProgress />
              <Typography>Invite details loading...</Typography>
            </>
          )}
          {!isLoading && inviteDetails && (
            <div className="flex gap-10">
              <div>
                <div className="  mt-4 bg-white w-[350px]  p-4 rounded shadow  transition-transform transform hover:-translate-y-1">
                  <div className="flex gap-4 items-center">
                    <Diversity2Icon
                      className=" text-custom-blue "
                      sx={{ width: "40px", height: "40px" }}
                    />
                    <p className="font-bold text-gray-600">Team Details</p>
                  </div>
                  <div className="flex flex-row justify-between text-sm mt-5 items-center">
                    <p className="w-[80px] text-gray-600">Name</p>
                    <p>{inviteDetails.team.team_name}</p>
                  </div>
                  <div className="flex flex-row justify-between text-sm mt-5 items-center">
                    {" "}
                    <p className="w-[80px] text-gray-600">Leader</p>
                    <p>{inviteDetails.team_lead.full_name}</p>
                  </div>
                  <div className="flex flex-row justify-between text-sm mt-5 items-center">
                    <p className="w-[80px] text-gray-600"> Type</p>
                    <p>{inviteDetails.team.team_type}</p>
                  </div>
                  <div className="flex flex-row justify-between text-sm mt-5 items-center">
                    <p className="w-[120px] text-gray-600"> Active Members</p>
                    <p>{inviteDetails.team.active_participants.length}</p>
                  </div>
                </div>
                <div className="  mt-4 bg-white w-[350px]  p-4 rounded shadow  transition-transform transform hover:-translate-y-1">
                  <div className="flex gap-4 items-center">
                    <Email
                      className=" text-custom-blue "
                      sx={{ width: "40px", height: "40px" }}
                    />
                    <p className="font-bold text-gray-600">My Invitation</p>
                  </div>
                  <div className="flex flex-row justify-between text-sm mt-5 items-center">
                    <p className="w-[100px] text-gray-600">Invitation For</p>
                    <p>{inviteDetails.member.full_name}</p>
                  </div>

                  <div className="flex flex-row justify-between text-sm mt-5 items-center">
                    <p className="w-[80px] text-gray-600">Status</p>
                    <p
                      style={{
                        color:
                          inviteDetails.status === "Accepted"
                            ? "green"
                            : inviteDetails.status === "Pending"
                              ? "orange"
                              : "red",
                      }}
                    >
                      {inviteDetails.status}
                    </p>
                  </div>
                </div>
              </div>

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
                    <p className="mt-2">{inviteDetails.hackathon.title}</p>
                  </div>
                  <div className="flex flex-col text-sm mt-2 ">
                    {" "}
                    <p className="  font-bold text-sm mt-5">Hackthon Theme</p>
                    <p className="mt-2">
                      {inviteDetails.hackathon.hackathon_theme}
                    </p>
                  </div>
                  <p className="  font-bold mt-8 text-sm mb-4">
                    Hackthon Sub-Thematic concerns
                  </p>
                  {inviteDetails.hackathon.sub_themes &&
                    inviteDetails.hackathon.sub_themes.map((field, index) => (
                      <Chip
                        key={index}
                        label={field}
                        sx={{
                          width: "350px",
                          backgroundColor: "#E2EDF1",
                          marginTop: "8px",
                          marginRight: "4px",
                          color: "#009edb",
                          transition: "width 0.3s",
                          "&:hover": {
                            width: "100%",
                          },
                        }}
                      />
                    ))}
                </div>
                {inviteDetails.status !== "Accepted" ? (
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => acceptInvitation()}
                      disabled={isActivating}
                      className={`${handleHoverActivate()} bg-green-600 text-white px-4 py-2 rounded`}
                    >
                      {isActivating ? (
                        <>
                          <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                          Accepting...
                        </>
                      ) : (
                        "Accept Invite"
                      )}
                    </button>
                    <button
                      onClick={() => declineInvitation()}
                      disabled={isDeactivating}
                      className={`${handleHoverDeactivate()} bg-[#D40C0C] text-white px-4 py-2 rounded`}
                    >
                      {isDeactivating ? (
                        <>
                          <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                          Declining...
                        </>
                      ) : (
                        "Decline Invite"
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    {" "}
                    <button
                      onClick={() => viewTeamSubmission()}
                      className="border-custom-blue border text-custom-blue px-4 py-2 rounded mt-5"
                    >
                      View Team Submission
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ViewInviteDetails;
