import { axiosApi } from "..";

// Create feedback for submission
export const sendFeedbackForSubmission = async (submission_id, detail) => {
  return await axiosApi.post("/feedbacks/", {
    submission_id,
    detail,
  });
};

// Get feedbacks for submission
export const getSubmissionFeedback = async (submission_id) => {
  return await axiosApi.get(`/feedbacks/${submission_id}`);
};

// update feedback
export const updateFeedback = async (feedback_id, detail) => {
  return await axiosApi.patch(`/feedbacks/${feedback_id}`, {
    detail,
  });
};

// delete feedback
export const deleteFeedback = async (feedback_id) => {
  return await axiosApi.delete(`/feedbacks/${feedback_id}`);
};
