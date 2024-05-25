import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";
import AdminLogOut from "../AdminLogOut";
import { sendBulkNotification } from "../../../api/notifications/notifications";
import MessageSentModal from "./MessageSentModal";
const CreateNotifications = () => {
  const [senderName, setSenderName] = useState("");
  const [messageDetails, setMessageDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const openModal = () => setOpenSuccessModal(true);
  const closeModal = () => setOpenSuccessModal(false);
  const navigate = useNavigate();

  const handleSenderNameChange = (event) => {
    setSenderName(event.target.value);
  };

  const handleMessageDetailsChange = (event) => {
    setMessageDetails(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    sendBulkNotification(senderName, messageDetails).then((res) => {
      if (res.status === 200) {
        setOpenSuccessModal(true);
        setTimeout(() => {
          setOpenSuccessModal(false);
          navigate("/admin/dashboard");
        }, 1000);
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
    <div className="bg-white p-8  min-h-screen right-side">
      <div className="ml-60">
        <div className="flex justify-between">
          <h1 className="mt-0 text-gray-600 font-bold  text-[20px] relative ">
            Send Platform Notifications
          </h1>
          <AdminLogOut />
        </div>{" "}
        <p className="text-sm">
          Send notification to platform users in bulk or individually
        </p>
        <div className="flex flex-col gap-3 mt-4 ml-10">
          <div className="mt-4 ">
            {" "}
            <form className="flex flex-col" onSubmit={handleSubmit}>
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
          </div>
        </div>
      </div>
      {openSuccessModal && (
        <MessageSentModal openModal={openModal} handleClose={closeModal} />
      )}
    </div>
  );
};

export default CreateNotifications;
