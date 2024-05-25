import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentParticipantDetail } from "../../../features/participant/participantSlice";
import {
  getLearnerInvitedTeams,
  getLearnerCreatedTeams,
} from "../../../api/teams/teams";
import InvitesTable from "./InvitesTable";
import UserProfile from "../profile/UserProfile";
import { LinearProgress } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Diversity2Icon from "@mui/icons-material/Diversity2";

const TeamSubmissions = () => {
  const [teamsMiniData, setTeamsMiniData] = useState([]);
  const [teamsInvitesData, setTeamsInvitesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const participant = useSelector(selectCurrentParticipantDetail);
  const navigate = useNavigate();

  const fetchTeams = () => {
    getLearnerCreatedTeams(participant.id).then((res) => {
      if (res.status === 200) {
        setTeamsMiniData(res.data);
        setLoading(false);
      }
    });
  };

  const fetchTeamInvites = () => {
    getLearnerInvitedTeams(participant.id).then((res) => {
      if (res.status === 200) {
        setTeamsInvitesData(res.data);
        setTeamsLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    fetchTeamInvites();
  }, []);

  function handleTeamView(id) {
    navigate("details", {
      state: { team_id: id },
    });
  }

  return (
    <div className="bg-[#FAF9F6] right-side min-h-screen min-w-full">
      <div className="ml-[280px]">
        <div className="flex justify-between mt-8">
          <div>
            {" "}
            <h1 className="text-gray-600 font-bold text-[24px]">
              Teams and Submissions
            </h1>{" "}
            <p className=" font-bold text-[18px] mt-4  text-gray-500">
              My Teams
            </p>
          </div>

          <div className="mr-10">
            <UserProfile />
          </div>
        </div>
        {loading ? (
          <LinearProgress />
        ) : teamsMiniData.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {teamsMiniData.map((team, index) => (
              <div
                key={index}
                className=" mt-4 bg-white w-[250px] p-4 rounded shadow  transition-transform transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3">
                  <Diversity2Icon
                    className=" text-custom-blue "
                    sx={{ width: "40px", height: "40px" }}
                  />
                </div>
                <p className="text-bold text-black">{team.team_name}</p>
                <p className="text-bold text-black text-sm">
                  {team.team_type === "solo"
                    ? "Flying Solo"
                    : "Teamwork makes the dream work"}{" "}
                </p>
                <div
                  className="flex gap-[2px] items-center"
                  onClick={() => handleTeamView(team.id)}
                >
                  <p className="text-xs text-custom-blue">
                    Click here for team details
                  </p>
                  <ChevronRightRoundedIcon className="text-custom-blue" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 bg-white w-3/4 p-4 rounded shadow flex gap-5 items-center">
            <InfoOutlined sx={{ color: "red" }} />
            <p className="text-bold text-black">
              You do not have any teams at the moment. Keep exploring!
            </p>
          </div>
        )}

        <InvitesTable
          invitesMiniData={teamsInvitesData}
          loading={teamsLoading}
        />
      </div>
    </div>
  );
};

export default TeamSubmissions;
