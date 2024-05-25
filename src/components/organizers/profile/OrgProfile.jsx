import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { store } from "../../../store/store";
import { selectCurrentOrganizerDetail } from "../../../features/organizer/organizerSlice";
import NotificationBadge from "../notifications/NotificationBadge";
const OrgProfile = ({ status }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const openProfileMenu = () => setAnchorElNav(true);
  const closeProfileMenu = () => setAnchorElNav(null);
  const navigate = useNavigate();
  const orgDetails = useSelector(selectCurrentOrganizerDetail);
  const USER_LOGOUT = "USER_LOGOUT";
  const logOut = () => {
    return {
      type: USER_LOGOUT,
    };
  };
  const handleLogOut = () => {
    store.dispatch(logOut());
  };

  return (
    <div className="flex gap-10 items-center mt-2">
      <NotificationBadge organizerId={orgDetails?.id} />
      <div className="relative inline-block ">
        <div className="flex  border p-1 border-custom-grey rounded-lg space-x-2 shadow-md transition-transform transform hover:-translate-y-1 cursor-pointer">
          <div
            onClick={() => openProfileMenu()}
            className="flex  gap-5 items-center"
          >
            {status === "no_profile" ? (
              "No Profile"
            ) : (
              <>
                <Avatar
                  alt="Profile pic"
                  src={orgDetails.profile_image_url}
                  sx={{ width: "24px", height: "24px" }}
                />
                <p className="text-xs mr-3">{orgDetails.name}</p>
              </>
            )}
          </div>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            sx={{ pt: 4, marginTop: "55px", marginLeft: "-20px" }}
          >
            <MenuItem onClick={() => navigate("/organizer/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default OrgProfile;
