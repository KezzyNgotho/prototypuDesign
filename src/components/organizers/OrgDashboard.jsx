import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinearProgress, CircularProgress } from "@mui/material";
import { getOrganizerMetrics } from "../../api/accounts/accounts";
import { selectLoggedInUserRef } from "../../features/user/userSlice";
import { fetchOrganizerProfile } from "../../api/accounts/accounts";
import {
  setCurrentOrganizerDetail,
  setOrganizerCode,
} from "../../features/organizer/organizerSlice";
import { store } from "../../store/store";
import ProfilePrompt from "./modals/ProfilePrompt";
import OrgHackathons from "./OrgHackathons";
import OrgProfile from "./profile/OrgProfile";
const OrgDashboard = () => {
  const [openProfilePrompt, setopenProfilePrompt] = useState(false);
  const [orgProfile, setOrgProfile] = useState("");
  const [orgCode, setOrgCode] = useState("");
  const [stats, setStats] = useState({});
  const [fetching, setFetching] = useState(true);
  const[profileStatus, setProfileStatus] = useState("profile")
  const org_ref = useSelector(selectLoggedInUserRef);
  const dispatch = useDispatch();

  const fetchProfile = () => {
    fetchOrganizerProfile(org_ref)
      .then((res) => {
        if (res.status === 200) {
          setOrgProfile(res.data);
          dispatch(
            setCurrentOrganizerDetail({ currentOrganizerDetail: res.data })
          );
          dispatch(setOrganizerCode({ organizerCode: res.data.id }));
          setOrgCode(res.data.id);
          setFetching(false);
          setProfileStatus("profile")
        }
      })
      .catch((err) => {
        setopenProfilePrompt(true);
        setFetching(false);
        setProfileStatus("no_profile")
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
    getOrganizerMetrics(org_ref).then((res) => {
      setStats(res.data);
    });
  }, []);
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="bg-white p-8 right-side min-h-screen">
      <div className="overflow-y-auto  ml-60">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px]">Dashboard</h1>
          {orgCode === "" && fetching ? <CircularProgress /> : <OrgProfile status={profileStatus}/>}
        </div>
        <div className="flex mt-12">
          <div className="border bg-custom-blue rounded-md text-white pt-5 mr-5 pr-[40px] ">
            <span className="text-xs p-5">Affiliated Participants</span>
            <p className="p-5 font-bold">{stats.total_participants}</p>
          </div>
          <div className="border bg-custom-grey rounded-md   pr-[60px]  pt-5 mr-5">
            <span className="text-xs p-5">Your Hackathons</span>
            <p className="p-5 font-bold">{stats.total_hackathons}</p>
          </div>
          <div className="border bg-custom-grey rounded-md  pr-[60px]  pt-5 mr-5">
            <span className="text-xs p-5">Submitted Projects</span>
            <p className="p-5 font-bold">{stats.total_submissions}</p>
          </div>
        </div>
        <div className="mt-10">
          <h1 className=" font-bold">Ongoing hackathons</h1>
          {orgCode === "" && fetching ? (
            <LinearProgress />
          ) : (
            <OrgHackathons orgCode={orgCode} />
          )}
        </div>
        <div>
          <ProfilePrompt
            openModal={openProfilePrompt}
            handleClose={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;
