import React, { useEffect, useState } from "react";
import { store } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { LinearProgress, CircularProgress } from "@mui/material";
import { getParticipantMetrics } from "../../api/accounts/accounts";
import { selectLoggedInUserRef } from "../../features/user/userSlice";
import { fetchParticipantProfile } from "../../api/accounts/accounts";
import { setCurrentParticipantDetail } from "../../features/participant/participantSlice";
import UserProfile from "./profile/UserProfile";
import ProfilePrompt from "../organizers/modals/ProfilePrompt";
import OpenHackathon from "../hackathon/hackathonDashboard/OpenHackathon";

const ParticipantsContent = () => {
  const [openProfilePrompt, setopenProfilePrompt] = useState(false);
  const [partProfile, setPartProfile] = useState("");
  const [partCode, setPartCode] = useState("");
  const [fetching, setFetching] = useState(true);
  const [profileStatus, setProfileStatus] = useState("profile");
  const dispatch = useDispatch();
  const [stats, setStats] = useState({});
  const part_ref = useSelector(selectLoggedInUserRef);

  const fetchProfile = () => {
    fetchParticipantProfile(part_ref)
      .then((res) => {
        if (res.status === 200) {
          setPartProfile(res.data);
          dispatch(
            setCurrentParticipantDetail({ currentParticipantDetail: res.data })
          );
          setPartCode(res.data.id);
          setFetching(false);
          setProfileStatus("profile");
        }
      })
      .catch((err) => {
        setopenProfilePrompt(true);
        setFetching(false);
        setProfileStatus("no_profile");
      });
  };
  const USER_LOGOUT = "USER_LOGOUT";
  const logOut = () => {
    return {
      type: USER_LOGOUT,
    };
  };
  const handleLogOut = () => {
    store.dispatch(logOut());
  };
  const closeModal = () => {
    setopenProfilePrompt(false);
    handleLogOut();
  };

  useEffect(() => {
    getParticipantMetrics(part_ref).then((res) => {
      setStats(res.data);
    });
  }, []);
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className=" ml-60">
      <div className="flex justify-between">
        <h1 className="text-gray-600 font-bold text-[24px]">Dashboard</h1>
        {partCode === "" && fetching ? (
          <CircularProgress />
        ) : (
          <div className="flex items-center gap-10">
            <UserProfile status={profileStatus} />
          </div>
        )}
      </div>

      <div className="flex mt-12">
        <div className="border bg-custom-blue rounded-md text-white pr-20 pt-5 mr-5">
          <span className="text-xs p-5">Your Hackathons</span>
          <p className="p-5 font-bold">{stats.total_hackathons}</p>
        </div>
        <div className="border bg-custom-grey rounded-md  pr-20  pt-5 mr-5">
          <span className="text-xs p-5">Affiliated Organizations</span>
          <p className="p-5 font-bold">{stats.total_organizers}</p>
        </div>
        <div className="border bg-custom-grey rounded-md  pr-20  pt-5 mr-5">
          <span className="text-xs p-5">Submitted projects</span>
          <p className="p-5 font-bold">{stats.total_submissions}</p>
        </div>
      </div>
      <div className="mt-10">
        {partCode === "" && fetching ? (
          <LinearProgress />
        ) : (
          <>
            <h1 className="text-gray-600 font-semibold">
              Recomended Ongoing Hackathons
            </h1>

            <OpenHackathon />
          </>
        )}
      </div>
      <div>
        <ProfilePrompt openModal={openProfilePrompt} handleClose={closeModal} />
      </div>
    </div>
  );
};

export default ParticipantsContent;
