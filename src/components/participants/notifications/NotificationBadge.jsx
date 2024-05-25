import React, { useState, useEffect } from "react";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getLearnerNotifications } from "../../../api/notifications/notifications";
import NotificationDialog from "./NotificationDialog";
export default function NotificationBadge({ participantId }) {
  const [openNotificationsDialog, setOpenNotificationsDialog] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    getLearnerNotifications(participantId).then((res) => {
      if (res.status === 200) {
        setNotifications(res.data);
      }
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationsBadgeClick = () => {
    setOpenNotificationsDialog(true);
  };

  const handleClose = () => {
    setOpenNotificationsDialog(false);
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification.is_read
  );

  return (
    <>
      <Badge
        badgeContent={unreadNotifications.length}
        color="error"
        onClick={handleNotificationsBadgeClick}
      >
        <NotificationsIcon color="primary" />
      </Badge>
      <NotificationDialog
        open={openNotificationsDialog}
        onClose={handleClose}
        notifications={notifications}
        refreshNotifications={fetchNotifications}
      />
    </>
  );
}
