import { axiosApi } from "..";
//get all grades on the platform
export const getAllGrades = async () => {
  return await axiosApi.get("/grades/");
};

//get organizer grading list
export const getOrganizerGradingList = async (organizer_id) => {
  return await axiosApi.get(`/grades/organizer/${organizer_id}`);
};

//get hackathon grading list
export const getHackathonGradingList = async (hackathon_id) => {
  return await axiosApi.get(`/grades/hackathon/${hackathon_id}`);
};

//get organizer leader board
export const getOrganizerLeaderBoard = async (organizer_id) => {
  return await axiosApi.get(`/grades/org-leader-board/${organizer_id}`);
};
//get hackathon leader board
export const getHackathonLeaderBoard = async (hackathon_id) => {
  return await axiosApi.get(`/grades/hack-leader-board/${hackathon_id}`);
};

//get all hackathons for an organizer
export const getOrgHackathons = async (organizer_id) => {
  return await axiosApi.get(
    `/hackathons/${organizer_id}/organizer-lists?type=mini`
  );
};

// kenyan grades
export const getKenyanGrades = async () => {
  return await axiosApi.get("/grades/kenyan-participants/");
};
