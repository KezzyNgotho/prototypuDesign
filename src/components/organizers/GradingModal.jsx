import React, { useState } from "react";
import { evaluateHackathon } from "../../api/hackathons/hackathons";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  CircularProgress,
  TextField,
  Typography,
  Radio,
  Box,
  Modal,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  marginTop: "20px",
  bgcolor: "background.paper",
  border: "2px solid #089BD9",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const customStyles = {
  fontFamily: "Lexend, sans-serif",
  marginTop: 0,
  fontSize: "24px",
  textAlign: "center",
  marginLeft: "20px",
};

export default function GradingModal({ openModal, handleClose, submissionId }) {
  const [graded, setGraded] = useState("");
  const [grade, setGrade] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendFeedback, setSendFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackEntered, setFeedbackEntered] = useState(false);
  const navigate = useNavigate();
  const isReadyToSubmit = grade !== 0 && feedbackMessage.trim() !== "";
  const isReadyForFeedback = grade !== 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (sendFeedback && isReadyToSubmit) {
      evaluateHackathon(submissionId, grade, feedbackMessage).then((res) => {
        if (res.status === 200) {
          setFeedbackEntered(true);
          setGraded("Submission Graded and Feedback sent successfully!");
          setTimeout(() => {
            handleClose();
            navigate(-1);
          }, 2000);
          setIsSubmitting(false);
        }
      });
    } else if (isReadyForFeedback) {
      evaluateHackathon(submissionId, grade).then((res) => {
        if (res.status === 200) {
          setGraded("Submission graded successfully!");
          setTimeout(() => {
            handleClose();
            navigate(-1);
          }, 2000);
          setIsSubmitting(false);
        }
      });
    }
  };

  const handleSendFeedbackChange = (e) => {
    setSendFeedback(e.target.value === "yes");
  };

  const handleChange = (e) => {
    setGrade(e.target.value);
  };

  const handleFeedbackMessageChange = (e) => {
    setFeedbackMessage(e.target.value);
  };

  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-blue-500";
    }
  };

  return (
    <Box>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="flex">
            <Box>
              <Typography variant="h6" component="h2" sx={customStyles}>
                Grade Submission And Send Feedback
              </Typography>
              {graded && (
                <div className="flex justify-center flex-col mt-10 ">
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
                  <p className="mt-5 text-center">{graded}</p>
                </div>
              )}
              {!graded && (
                <Box className="flex space-x-4">
                  <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
                    <label className="block  font-semibold text-black">
                      Enter Grade (out of 100)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      required
                      onChange={handleChange}
                      className="border py-3 px-2 border-gray-400 mt-4 rounded"
                    />
                    <label className="mt-5">
                      Would you like to send feedback for this submission?
                    </label>
                    <RadioGroup
                      aria-label="send-feedback"
                      name="send-feedback"
                      value={sendFeedback ? "yes" : "no"}
                      onChange={handleSendFeedbackChange}
                      className="mt-2"
                    >
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                    {sendFeedback && (
                      <>
                        <label className="block font-semibold text-black mt-4 mb-2">
                          Feedback
                        </label>
                        <TextField
                          id="outlined-multiline-static"
                          multiline
                          rows={4}
                          value={feedbackMessage}
                          onChange={handleFeedbackMessageChange}
                          placeholder="Type your feedback here"
                          className="w-[500px]"
                        />
                      </>
                    )}
                    {(!sendFeedback || feedbackEntered) &&
                      isReadyForFeedback && (
                        <button
                          type="submit"
                          className={`${handleHover()} py-3 px-2 bg-custom-blue rounded-md text-white text-xs w-[100px] hover:bg-white hover:text-custom-blue hover:border hover:border-custom-blue`}
                        >
                          {isSubmitting ? (
                            <>
                              <CircularProgress
                                sx={{ color: "white" }}
                                size={20}
                              />{" "}
                              Submitting...
                            </>
                          ) : (
                            "Submit Grade"
                          )}
                        </button>
                      )}
                    {sendFeedback && isReadyToSubmit && (
                      <button
                        type="submit"
                        className="mb-5 py-3 px-2 bg-custom-blue rounded-md text-white text-xs w-[250px] mt-5 hover:bg-white hover:text-custom-blue hover:border hover:border-custom-blue"
                      >
                        {isSubmitting ? (
                          <>
                            <CircularProgress
                              sx={{ color: "white" }}
                              size={20}
                            />{" "}
                            Submitting...
                          </>
                        ) : (
                          "Submit Grade and Send Feedback"
                        )}
                      </button>
                    )}
                  </form>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
