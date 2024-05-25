import React, { useState } from "react";
import { CircularProgress, TextField, Box, Dialog, Modal } from "@mui/material";
import { sendNotificationToUser } from "../../../api/notifications/notifications";

const SendPlatformUserNotification = ({
  openNotificationModal,
  closeNotificationModal,
  participant_id,
  organizer_id,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [messageDetails, setMessageDetails] = useState("");

  const handleSenderNameChange = (event) => {
    setSenderName(event.target.value);
  };

  const handleMessageDetailsChange = (event) => {
    setMessageDetails(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    sendNotificationToUser(
      senderName,
      messageDetails,
      participant_id,
      organizer_id
    ).then((res) => {
      if (res.status === 200) {
        closeNotificationModal();
        alert("Notification sent!");
      }
    });
    // catch error here and show error details
  };

  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue";
    }
  };
  return (
    <Box>
      <Dialog
        open={openNotificationModal}
        onClose={closeNotificationModal}
        sx={{ m: 4 }}
      >
        <form className="flex flex-col p-8" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-black">
            Senders Name
          </label>
          <input
            type="text"
            value={senderName}
            onChange={handleSenderNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-[350px]"
          />
          <label className="block text-sm font-semibold text-black mt-4">
            Message Details
          </label>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            onChange={handleMessageDetailsChange}
            value={messageDetails}
            className="w-[500px]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${handleHover()} rounded font-semibold mt-4 bg-custom-blue text-white text-sm w-[180px] px-2 py-2`}
          >
            {isSubmitting ? (
              <>
                <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </Dialog>
    </Box>
  );
};

export default SendPlatformUserNotification;
