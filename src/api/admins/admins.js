import { axiosApi } from "..";

export const getAllUsers = async () => {
  return await axiosApi.get("/admins/users/");
};

export const adminCreateUser = async (
  role,
  username,
  password,
  password_confirmation,
  email
) => {
  return await axiosApi.post("/admins/users", {
    role,
    username,
    password,
    password_confirmation,
    email,
  });
};
export const activateUserAccount = async (user_code) => {
  return await axiosApi.patch(`admins/users/activate/${user_code}`);
};

export const deactivateUserAccount = async (user_code) => {
  return await axiosApi.patch(`admins/users/deactivate/${user_code}`);
};

export const deleteUserAccount = async (user_code) => {
  return await axiosApi.delete(`/users/${user_code}`);
};

//get participants on the platform
export const getParticipants = async (page) => {
  return await axiosApi.get(`/admins/participants?page=${page}`);
};

export const getOrganizers = async () => {
  return await axiosApi.get("/admins/organizers/");
};

export const getSubmissions = async () => {
  return await axiosApi.get("/subscriptions");
};

export const getPlatformStats = async () => {
  return await axiosApi.get("/platform/statistics");
};

export const getTopHackathons = async () => {
  return await axiosApi.get("/hackathon/statistics");
};

export const getTopOrgs = async () => {
  return await axiosApi.get("/organization/statistics/hackathons");
};
// Destroy, statistics, etc....
