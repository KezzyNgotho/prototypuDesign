import { axiosApi } from "..";
// I. Create a solo team
export const enrolSoloToHackathon = async (
  team_name,
  hackathon_id,
  lead_participant_id
) => {
  return await axiosApi.post("/teams/", {
    team_name,
    hackathon_id,
    lead_participant_id,
    team_type: "solo",
  });
};

// II. Get Learner Teams
export const getLearnerCreatedTeams = async (participant_code) => {
  return await axiosApi.get(`/teams/learner/${participant_code}`);
};

// III. Get Learner Team Details
export const getTeamDetails = async (team_id) => {
  return await axiosApi.get(`/teams/${team_id}`);
};

// IV. Get  Team Submission
export const getTeamSubmission = async (team_id) => {
  return await axiosApi.get(`submissions/${team_id}/get`);
};

// V. Make team Hackathon submission
export const submitTeamHackathonResponse = async (user_payload) => {
  return await axiosApi.post(`/submissions`, user_payload);
};

// VI. Make team Hackathon submission
export const updateTeamHackathonResponse = async (
  submission_id,
  response_payload
) => {
  return await axiosApi.patch(
    `/submissions/${submission_id}`,
    response_payload
  );
};

// VII. Search For  Learners by name(term)
export const searchLearnersByName = async (term) => {
  return await axiosApi.get(`/participants/search/${term}`);
};

// VIII. Create a group team
export const enrolTeamToHackathon = async (
  team_name,
  hackathon_id,
  lead_participant_id,
  invited_participants
) => {
  return await axiosApi.post("/teams/", {
    team_name,
    hackathon_id,
    lead_participant_id,
    invited_participants,
    team_type: "group",
  });
};

// IX. Get Learner Team Invites
export const getLearnerInvitedTeams = async (participant_code) => {
  return await axiosApi.get(`/invites/learner/${participant_code}`);
};

// X. Get Team Invite Entry Details
export const getTeamInviteDetails = async (invite_id) => {
  return await axiosApi.get(`/invites/${invite_id}`);
};

// XI. Accept or Decline an invitation
export const invitationActions = async (payload) => {
  return await axiosApi.patch(`/invites/action/status_update`, payload);
};

// XII. Get all submissions
export const getSubmissions = async () => {
  return await axiosApi.get("/submissions/");
};
// XIII. Get  submissions details
export const getSubmissionsDetails = async (submission_id) => {
  return await axiosApi.get(`/submissions/${submission_id}`);
};
// XIV. Get all teams
export const getAllTeams = async () => {
  return await axiosApi.get("/teams/");
};
// XV. Get  Teams' hackathon  Submission
export const getTeamsHackathonSubmission = async (team_id) => {
  return await axiosApi.get(`submissions/${team_id}/get`);
};

// XVI delete team
export const deleteTeam = async (team_id) => {
  return await axiosApi.delete(`/teams/${team_id}`);
};

// XVII. Search For  Learners by name(TABLE)
export const searchLearnersByNameTable = async (term) => {
  return await axiosApi.get(`/participants/search/${term}?type=table`);
};
