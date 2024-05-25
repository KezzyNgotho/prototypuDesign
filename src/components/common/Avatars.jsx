import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";

const Avatars = () => {
  return (
    <AvatarGroup max={4} className="mt-5">
      <Avatar
        alt="avatar 1"
        src="/assets/avatar1.jpg"
        sx={{ width: "20px", height: "20px" }}
      />
      <Avatar
        alt="avatar 2"
        src="/assets/avatar2.jpg"
        sx={{ width: "20px", height: "20px" }}
      />
      <Avatar
        alt="avatar 3"
        src="/assets/avatar1.jpg"
        sx={{ width: "20px", height: "20px" }}
      />
      <Avatar
        alt="avatar 4"
        src="/assets/avatar2.jpg"
        sx={{ width: "20px", height: "20px" }}
      />
    </AvatarGroup>
  );
};

export default Avatars;
