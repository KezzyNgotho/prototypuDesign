import React, { useState } from "react";
import {
  CircularProgress,
  TextField,
  Box,
  Dialog,
  Typography,
} from "@mui/material";
import { sendFeedbackForSubmission } from "../../api/feedback/feedback";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SendFeedbackDialog = ({
  openNotificationModal,
  closeNotificationModal,
  submission_id,
}) => {
  const [messageDetails, setMessageDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notified, setNotified] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    sendFeedbackForSubmission(submission_id, messageDetails).then((res) => {
      if (res.status === 200) {
        setNotified(" Feedback sent Successfully");
        setTimeout(() => {
          closeNotificationModal();
        }, 1000);
        setIsSubmitting(false);
      } else {
        console.log(res);
      }
    });
  };

  const handleMessageDetailsChange = (event) => {
    setMessageDetails(event.target.value);
  };

  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue";
    }
  };
  const customStyles = {
    fontFamily: "Lexend, sans-serif",
    marginTop: "10px",
    fontSize: "24px",
    textAlign: "center",
    marginLeft: "20px",
  };
  return (
    <Box>
      <Dialog
        open={openNotificationModal}
        onClose={closeNotificationModal}
        sx={{ m: 4 }}
      >
        {notified && (
          <div className="flex justify-center flex-col  px-[50px] py-[30px]">
            <Typography variant="h6" component="h2" sx={{ fontSize: "24px" }}>
              Send Feedback for Submission
            </Typography>
            <div className="flex justify-center">
              <CheckCircleIcon
                fontSize="large"
                style={{
                  color: "#089BD9",
                  width: "80px",
                  height: "80px",
                }}
              />
            </div>
            <p className="mt-5 text-center">{notified}</p>
          </div>
        )}
        {!notified && (
          <form className="flex flex-col p-8 " onSubmit={handleSubmit}>
            <Typography variant="h6" component="h2" sx={customStyles}>
              Send Feedback for Submission
            </Typography>
            <label className="block  font-semibold text-black mb-2 mt-5">
              Feedback
            </label>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              onChange={handleMessageDetailsChange}
              value={messageDetails}
              placeholder="Type feedback here"
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
                "Send Feedback"
              )}
            </button>
          </form>
        )}
      </Dialog>
    </Box>
  );
};

export default SendFeedbackDialog;
