import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import { selectCurrentParticipantDetail } from "../../../features/participant/participantSlice";
import UserProfile from "../profile/UserProfile";
import { ChevronRight, ConstructionOutlined } from "@mui/icons-material";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";
import { enrolSoloToHackathon } from "../../../api/teams/teams";
import ParticipantSelector from "./groupTeam/ParticipantSelector";
import InvitesModal from "./groupTeam/InvitesModal";
import { enrolTeamToHackathon } from "../../../api/teams/teams";
import { CircularProgress } from "@mui/material";
const TeamsPage = () => {
  const hackathonData = useSelector(selectSelectedHackathonDetail);
  const learnerData = useSelector(selectCurrentParticipantDetail);
  const [selectedOption, setSelectedOption] = useState(" ");
  const [invitedParticipants, setInvitedParticipant] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openInvitesModal, setOpenInvitesModal] = useState(false);
  const openModal = () => setOpenSuccessModal(true);
  const closeModal = () => setOpenSuccessModal(false);
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setTeamName("");
    setGroupName("");
  };
  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    enrolSoloToHackathon(teamName, hackathonData.id, learnerData.id).then(
      (res) => {
        if (res.status === 200) {
          setOpenSuccessModal(true);
          setTimeout(() => {
            closeModal();
            navigate("/participant/teams-submissions");
          }, 1500);
          setIsSubmitting(false);
        }
      }
    );
    // catch error here and show error details
  };
  const readParticipant = (participantsArray) => {
    setInvitedParticipant(participantsArray);
  };
  const handleGroupSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setOpenSuccessModal(true);
    enrolTeamToHackathon(
      groupName,
      hackathonData.id,
      learnerData.id,
      invitedParticipants
    )
      .then((res) => {
        if (res.status === 200) {
          setOpenInvitesModal(true);
          setTimeout(() => {
            setOpenInvitesModal(false);
            navigate("/participant/teams-submissions");
          }, 1500);
          setOpenSuccessModal(false);
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setOpenSuccessModal(false);
        setIsSubmitting(false);
      });
  };

  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue";
    }
  };
  return (
    <div className="bg-white p-8  min-h-screen right-side">
      <div className="ml-60">
        <div className="flex justify-between">
          <h1 className="mt-0 text-gray-600 font-bold  text-[20px] relative ">
            Hackathons
          </h1>
          <UserProfile />
        </div>{" "}
        <p className="text-xs text-gray-500  flex flex-row mb-5">
          <span className="mt-[2px]">Hackathon</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">{hackathonData.title}</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">Participate</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">Team selection</span>
        </p>
        <p className="text-sm">
          To participate in a hackathon you are required to have a Team. Please
          select the team type below
        </p>
        <div className="flex flex-col gap-3 mt-4 ml-10">
          <label className="mr-4">
            <input
              type="radio"
              value="solo"
              checked={selectedOption === "solo"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Solo
          </label>
          <label>
            <input
              type="radio"
              value="group"
              checked={selectedOption === "group"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Group
          </label>

          {selectedOption === "solo" && (
            <div className="mt-4 ">
              {" "}
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <label className="block text-sm font-semibold text-black">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={handleTeamNameChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-[350px]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${handleHover()} rounded font-semibold mt-4 bg-custom-blue text-white text-sm w-[180px] px-2 py-2`}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                      Confirming...
                    </>
                  ) : (
                    "Confirm Participation"
                  )}
                </button>
              </form>
            </div>
          )}
          {selectedOption === "group" && (
            <div className="mt-4 flex flex-col ">
              <form onSubmit={handleGroupSubmit}>
                {" "}
                <label className="block text-sm font-semibold text-black">
                  Team Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={handleGroupNameChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-[400px]"
                />
                <label className="block text-sm font-semibold text-black mt-4">
                  Select Team Members
                </label>
                <ParticipantSelector func={readParticipant} />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${handleHover()} rounded font-semibold mt-2 bg-custom-blue text-white text-sm w-[150px] px-2 py-2`}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                      Creating...
                    </>
                  ) : (
                    "Create Team"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {openSuccessModal && (
        <SuccessModal openModal={openModal} handleClose={closeModal} />
      )}
      {/* {openInvitesModal && (
        <InvitesModal openModal={openModal} handleClose={closeModal} />
      )} */}
    </div>
  );
};

export default TeamsPage;
