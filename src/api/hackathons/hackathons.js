import { axiosApi } from "..";

// HACKATHONS
//  I. Create Hackathon Categories
export const createTag = async (category, created_by) => {
  return await axiosApi.post("/tags/", {
    category,
    created_by,
  });
};
//  II. View Available Categries
export const getTags = async () => {
  return await axiosApi.get("/tags/");
};

// III. Create a hackathon on the platform
export const createHackathon = async (hackathonObject) => {
  return await axiosApi.post("/hackathons/", hackathonObject);
};

// IV. Modify hackathon with media-Implemet on form with formData
// V. Get hackathon Validation Code
// /hackathons/:user_ref/send-validation/:hackathon_id
export const requestValidationCode = async (
  user_ref,
  hackathon_code,
  user_email
) => {
  return await axiosApi.post(
    `/hackathons/${user_ref}/send-validation/${hackathon_code}`,
    {
      user_email,
    }
  );
};
// VI. Validate to activate Hackathon
export const validateHackathon = async (hackathon_code, confirmation_code) => {
  return await axiosApi.patch(`/hackathons/${hackathon_code}/validate/`, {
    confirmation_code,
  });
};
//  VII. Reacreate Hackathon
export const resubmitHackathon = async (hackathonObject, hackathon_code) => {
  return await axiosApi.put(`/hackathons/${hackathon_code}/`, hackathonObject);
};

// VIII. Get all Hackathons on platform
export const getAllHackathons = async () => {
  return await axiosApi.get("/hackathons/");
};
// IX. Get Organizer Hackathons on platform
export const getOrganizerHackathons = async (organizer_code) => {
  return await axiosApi.get(`/hackathons/${organizer_code}/organizer-lists`);
};
// X. Get individual  Hackathon Details
export const getHackathonDetails = async (hackathon_code) => {
  return await axiosApi.get(`"/hackathons/${hackathon_code}/`);
};
// XI. Enrol Participant to Hackathon
export const enrolToHackathon = async (hackathon_id, participant_id) => {
  return await axiosApi.post("/subscriptions/", {
    hackathon_id,
    participant_id,
  });
};
// XII. View all Hackathon Subscriptions
export const getHackathonEnrolments = async () => {
  return await axiosApi.get("/subscriptions/");
};
// XIII. View a Hackathon Subscription Detail
export const getHackathonSubscriptionDetail = async (subscription_code) => {
  return await axiosApi.get(`/subscriptions/${subscription_code}`);
};
// XIV. View a individual hackathon submissions
export const getHackathonSubmissions = async (hackathon_code, pathway) => {
  return await axiosApi.get(
    `/submissions/${hackathon_code}/view?pathway=${pathway}`
  );
};
// XV. View a Participants' Hackathon SubscriptionS
export const getParticipantHackathonSubscriptions = async (
  participant_code
) => {
  return await axiosApi.get(`/subscriptions/${participant_code}/get`);
};
// XVI. Submit a Hackathon Response
export const submitHackathonResponse = async (
  subscription_code,
  user_payload
) => {
  return await axiosApi.patch(
    `/subscriptions/${subscription_code}/response`,
    user_payload
  );
};
// XVII. Evaluate a hackthon
export const evaluateHackathon = async (submission_id, grade, detail = null) => {
  return await axiosApi.patch(`/submissions/${submission_id}/grade`, {
    grade,
    detail,
  });
};
// XVIII. Delete A participant hackathon Entry
export const deleteHackathonSubscription = async (subscription_code) => {
  return await axiosApi.delete(`/subscriptions/${subscription_code}`);
};

// XVIX
export const adminValidateHackathon = async (hackathon_id) => {
  return await axiosApi.patch(`/admin/hackathon/${hackathon_id}/validate`);
};

// xx
export const deleteHackathon = async (hackathon_id) => {
  return await axiosApi.delete(`/hackathons/${hackathon_id}`);
};

// xxi
export const deleteHackathonCategory = async (tag_id) => {
  return await axiosApi.delete(`/tags/${tag_id}`);
};

// TEAMS REVISION
// 1. Get learner specific hackathons
export const getParticipantHackathons = async (theme) => {
  return await axiosApi.get(`/hackathons/learner/${theme}`);
};
