import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import CustomAvatar from "../../common/utils/CustomAvatar";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import {
  deleteNotification,
  markNotificationRead,
} from "../../../api/notifications/notifications";

const NotificationView = ({
  notification,
  closeCard,
  openList,
  refreshNotifications,
}) => {
  function DeleteAction({ id }) {
    const [isDeleting, setIsDeleting] = useState(false);

    function handleDelete() {
      setIsDeleting(true);
      deleteNotification(id).then((res) => {
        if (res.status === 204) {
          setIsDeleting(false);
          refreshNotifications();
          closeCard("none");
          openList("block");
        } else {
          setIsDeleting(false);
          alert("Failed to delete");
        }
      });
    }
    return (
      <IconButton aria-label="delete" onClick={handleDelete}>
        {isDeleting ? (
          <>
            <CircularProgress sx={{ color: "red" }} size={20} />{" "}
          </>
        ) : (
          <DeleteIcon color="error" />
        )}
      </IconButton>
    );
  }
  const handleRead = (id) => {
    markNotificationRead(id).then((res) => {
      if (res.status === 200) {
        refreshNotifications();
        closeCard("none");
        openList("block");
      }
    });
  };

  const handleClose = () => {
    closeCard("none");
    openList("block");
  };
  return (
    <Card sx={{ m: 2, bgcolor: "#FAF9F6" }}>
      <CardHeader
        avatar={<CustomAvatar payload={notification} />}
        title={notification.sender}
        subheader={moment(notification.created_at).format("ddd Do MMM HH:mm")}
        action={<DeleteAction id={notification.id} />}
      />
      <CardContent>
        <Typography>{notification.message}</Typography>
      </CardContent>
      <CardContent>
        {notification.is_read ? (
          <Button onClick={() => handleClose()}>Close</Button>
        ) : (
          <Button onClick={() => handleRead(notification.id)}>
            Mark as read and close
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
export default NotificationView;
