import React, { useState } from "react";
import {
  CircularProgress,
  TextField,
  Box,
  Dialog,
  Typography,
} from "@mui/material";
import { updateFeedback } from "../../api/feedback/feedback";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const UpdateFeedbackModal = ({
  openUpdateModal,
  closeUpdateModal,
  feedback,
}) => {
  const [messageDetails, setMessageDetails] = useState(feedback.detail);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updated, setUpdated] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    updateFeedback(feedback.id, messageDetails)
      .then((res) => {
        if (res.status === 200) {
          setUpdated(" Feedback Updated Successfully");
          setTimeout(() => {
            closeUpdateModal();
            window.location.reload();
          }, 2500);
          setIsUpdating(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  };

  const handleMessageDetailsChange = (event) => {
    setMessageDetails(event.target.value);
  };

  const handleHover = () => {
    if (isUpdating) {
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
      <Dialog open={openUpdateModal} onClose={closeUpdateModal} sx={{ m: 4 }}>
        {updated && (
          <div className="flex justify-center flex-col  px-[50px] py-[30px]">
            <Typography variant="h6" component="h2" sx={{ fontSize: "24px" }}>
              Update Feedback for Submission
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
            <p className="mt-5 text-center">{updated}</p>
          </div>
        )}
        {!updated && (
          <form className="flex flex-col p-8 " onSubmit={handleSubmit}>
            <Typography variant="h6" component="h2" sx={customStyles}>
              Update Feedback for Submission
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
              placeholder="Update feedback here"
              className="w-[500px]"
            />
            <button
              type="submit"
              disabled={isUpdating}
              className={`${handleHover()} rounded font-semibold mt-4 bg-custom-blue text-white text-sm w-[180px] px-2 py-2`}
            >
              {isUpdating ? (
                <>
                  <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                  Updating...
                </>
              ) : (
                "Update Feedback"
              )}
            </button>
          </form>
        )}
      </Dialog>
    </Box>
  );
};

export default UpdateFeedbackModal;
