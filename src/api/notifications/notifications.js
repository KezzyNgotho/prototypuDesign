import { axiosApi } from "..";

// I. Fetch learner notifications
export const getLearnerNotifications = async (participant_id) => {
  return await axiosApi.get(`/notifications/learner/${participant_id}`);
};

//II. Read notification
export const markNotificationRead = async (notification_id) => {
  return await axiosApi.patch(`/notifications/${notification_id}`);
};

//III. Delete user notification
export const deleteNotification = async (notification_id) => {
  return await axiosApi.delete(`/notifications/${notification_id}`);
};

// IV. Fetch organizer notifications
export const getOrganizerNotifications = async (organizer_id) => {
  return await axiosApi.get(`/notifications/organizer/${organizer_id}`);
};

// V. Send bulk notifications to learners
export const sendBulkNotification = async (sender, message) => {
  return await axiosApi.post("/notifications/invoke-learners", {
    sender,
    message,
  });
};

// VI. Send  notification to a platform user
export const sendNotificationToUser = async (
  sender,
  message,
  participant_id,
  organizer_id
) => {
  return await axiosApi.post("/notifications/invoke-user", {
    sender,
    message,
    participant_id: participant_id,
    organizer_id: organizer_id,
  });
};
