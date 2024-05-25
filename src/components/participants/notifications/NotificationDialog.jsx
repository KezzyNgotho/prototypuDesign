import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Typography,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  DialogTitle,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoodIcon from "@mui/icons-material/Mood";
import CustomAvatar from "../../common/utils/CustomAvatar";
import NotificationView from "./NotificationView";

export default function NotificationDialog({
  open,
  notifications,
  onClose,
  refreshNotifications,
}) {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showList, setShowList] = useState("block");
  const [showNotificationView, setShowNotificationView] = useState("none");

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationView("block");
    setShowList("none");
  };

  return (
    <Dialog open={open} minWidth="md" fullWidth>
      <DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">My Notifications</Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      {notifications.length === 0 ? (
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <MoodIcon fontSize="large" color="primary" />
          <Typography variant="body1">
            You do not have any notification. Enjoy the calm!
          </Typography>
        </div>
      ) : (
        <List sx={{ display: showList }}>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem disableGutters>
                <ListItemButton
                  onClick={() => handleNotificationClick(notification)}
                >
                  <ListItemAvatar>
                    <CustomAvatar payload={notification} />
                  </ListItemAvatar>

                  <ListItemText
                    primary={notification.sender}
                    secondary={
                      <div
                        style={{
                          width: "340px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {notification.message}
                      </div>
                    }
                  />
                  <Typography variant="caption" color="textSecondary">
                    {moment(notification.created_at).format("ddd Do MMM HH:mm")}{" "}
                  </Typography>
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
      {selectedNotification && (
        <Stack sx={{ display: showNotificationView }}>
          <NotificationView
            notification={selectedNotification}
            closeCard={setShowNotificationView}
            openList={setShowList}
            refreshNotifications={refreshNotifications}
          />
        </Stack>
      )}
    </Dialog>
  );
}
