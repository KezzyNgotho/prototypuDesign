import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { store } from "../../../store/store";
import { selectCurrentParticipantDetail } from "../../../features/participant/participantSlice";
import NotificationBadge from "../notifications/NotificationBadge";
const UserProfile = ({ status }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const openProfileMenu = () => setAnchorElNav(true);
  const closeProfileMenu = () => setAnchorElNav(null);
  const navigate = useNavigate();
  const partDetails = useSelector(selectCurrentParticipantDetail);
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
    <div className="flex gap-10 items-center">
      <NotificationBadge participantId={partDetails?.id} />
      <div className="relative inline-block">
        <div className="flex items-center border transition-transform transform hover:-translate-y-1 shadow-md p-1 border-custom-grey rounded-lg space-x-2 cursor-pointer">
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
                  src={partDetails.profile_image_url}
                  sx={{ width: "24px", height: "24px" }}
                />
                <p className="text-xs mr-3">{partDetails.full_name}</p>
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
            onClose={closeProfileMenu}
            sx={{ pt: 4, marginTop: "55px", marginLeft: "-20px" }}
          >
            <MenuItem onClick={() => navigate("/participant/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
