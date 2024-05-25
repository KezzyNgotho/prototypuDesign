import * as React from "react";
import { styled } from "@mui/material/styles";
import { Badge, Avatar, Stack } from "@mui/material";

const StyledUnreadBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#b12812",
    color: "#b12812",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

export default function CustomAvatar({ payload }) {
  return (
    <Stack direction="row" spacing={2}>
      {payload.is_read === false ? (
        <StyledUnreadBadge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar alt=" " sx={{ bgcolor: "#009edb" }}>
            {payload.sender.charAt(0).toUpperCase()}
          </Avatar>
        </StyledUnreadBadge>
      ) : (
        <Avatar alt=" " sx={{ bgcolor: "#009edb" }}>
          {payload.sender.charAt(0).toUpperCase()}
        </Avatar>
      )}
    </Stack>
  );
}
