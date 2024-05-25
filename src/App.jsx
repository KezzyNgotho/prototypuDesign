import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./components/styles/styles.css";
// Base component
import LandingPage from "./components/common/LandingPage";
// User Authentication
import SignUp from "./components/common/SignUp";
import LogIn from "./components/common/LogIn";
// Common utility Component
import NoPage from "./components/common/NoPage";
import UnAuthorized from "./components/common/utils/UnAuthorized";
import RequireAuth from "./components/common/utils/RequireAuth";
import SpinLoading from "./components/common/utils/SpinLoading";

// Learner
import Sidebar from "./components/participants/Sidebar";
const ParticipantDashboard = lazy(
  () => import("./components/participants/ParticipantDashboard")
);
import UserProfilePage from "./components/participants/profile/UserProfilePage";
const CreateParticipantProfile = lazy(
  () => import("./components/participants/profile/CreatePartProfile")
);
const EditParticipantProfile = lazy(
  () => import("./components/participants/profile/PartEditDetails")
);
const CreateTeam = lazy(
  () => import("./components/participants/teams/TeamsPage")
);
const ParticipantTeams = lazy(
  () => import("./components/participants/teams/TeamSubmissions")
);
const TeamDetails = lazy(
  () => import("./components/participants/teams/soloTeam/ViewTeamDetails")
);
const MakeHackathonSubmission = lazy(
  () => import("./components/hackathon/submitHackathon/SubmitHackathon")
);
const EditHackathonSubmissin = lazy(
  () => import("./components/hackathon/submitProject/UpdateSubmission")
);
const InviteDetails = lazy(
  () => import("./components/participants/teams/ViewInviteDetails")
);
const ViewTeamSubmission = lazy(
  () => import("./components/participants/teams/groupTeam/ViewSubmission")
);
const ParticipantHackathons = lazy(
  () => import("./components/hackathon/hackathonDashboard/HackathonDashboard")
);
const HackathonDetails = lazy(
  () => import("./components/hackathon/submitProject/HackathonDetailsPage")
);

// Organizer
import OrgSidebar from "./components/organizers/OrgSidebar";
const OrgDashboard = lazy(() => import("./components/organizers/OrgDashboard"));
import OrgProfilePage from "./components/organizers/profile/OrgProfilePage";
const CreateOrgProfile = lazy(
  () => import("./components/organizers/profile/CreateOrgProfile")
);
const OrgEditDetails = lazy(
  () => import("./components/organizers/profile/OrgEditDetails")
);
const OrgOutlet = lazy(() => import("./components/organizers/OrgOutlet"));
const OrgHackathonPage = lazy(
  () => import("./components/organizers/OrgHackathonPage")
);
const OrgViewProject = lazy(
  () => import("./components/organizers/OrgViewProject")
);
const EditHackathon = lazy(
  () => import("./components/organizers/edithackathon/EditHackathon")
);
const CreateHackathon = lazy(
  () => import("./components/organizers/createhackathon/CreateHackathon")
);
const AddMedia = lazy(() => import("./components/hackathon/AddMedia"));
const HackathonMedia = lazy(
  () => import("./components/hackathon/HackathonMedia")
);
const EmailValidation = lazy(
  () => import("./components/organizers/createhackathon/EmailValidation")
);
const CodeVerification = lazy(
  () => import("./components/organizers/createhackathon/CodeVerification")
);
const OrgSubmissionPage = lazy(
  () => import("./components/organizers/OrgSubmissionPage")
);
const OrgSubmissions = lazy(
  () => import("./components/organizers/OrgSubmissions")
);
const ViewDetailsPage = lazy(
  () => import("./components/organizers/ViewDetailsPage")
);
const GradesPage = lazy(() => import("./components/organizers/Grades"));

// Admin
import AdminSidebar from "./components/admin/AdminSidebar";
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const AllParticipants = lazy(
  () => import("./components/admin/participants/AllParticipants")
);
const ParticipantProfile = lazy(
  () => import("./components/admin/participants/ParticipantProfile")
);
const AllOrganizers = lazy(
  () => import("./components/admin/organizers/AllOrganizers")
);

const AddHackMedia = lazy(
  () => import("./components/admin/organizers/AddHackMedia")
);
const ViewHackathons = lazy(
  () => import("./components/admin/organizers/ViewHackathons")
);
const ViewHackDetails = lazy(
  () => import("./components/admin/organizers/ViewHackDetails")
);
const AllHackathons = lazy(
  () => import("./components/admin/hackathons/AllHackathons")
);
const ViewHackathon = lazy(
  () => import("./components/admin/hackathons/ViewHachathon")
);
const ViewHackDetail = lazy(
  () => import("./components/admin/hackathons/ViewHackDetail")
);
const AllSubmissions = lazy(
  () => import("./components/admin/allSubmissions/AllSubmissions")
);
const ViewSubmissions = lazy(
  () => import("./components/admin/allSubmissions/ViewSubmission")
);
const EditSubmission = lazy(
  () => import("./components/admin/allSubmissions/EditSubmission")
);
const DeleteSubmission = lazy(
  () => import("./components/admin/allSubmissions/DeleteSubmission")
);
const GradingListTable = lazy(
  () => import("./components/admin/GradingListTable")
);

const UsersTable = lazy(() => import("./components/admin/user/UsersTable"));
const CreateUser = lazy(() => import("./components/admin/user/CreateUser"));
const Category = lazy(() => import("./components/admin/category/Category"));
const CreateTag = lazy(
  () => import("./components/admin/category/CreateCategory")
);
const AllTeams = lazy(() => import("./components/admin/teams/AllTeams"));
const ViewTeam = lazy(() => import("./components/admin/teams/ViewTeam"));
const TeamSubmission = lazy(
  () => import("./components/admin/teams/TeamSubmission")
);
const AllGrades = lazy(() => import("./components/admin/AllGrades"));
const CreateNotifications = lazy(
  () => import("./components/admin/notifications/CreateNotifications")
);
// Hackathon Flows

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<SpinLoading />}>
        <Routes>
          <Route path="*" element={<NoPage />} />
          {/* COMMON ROUTES */}
          <Route index element={<LandingPage />} />
          <Route path="/org-signup" element={<SignUp />} />
          <Route path="/part-signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="unauthorized" element={<UnAuthorized />} />
          {/* PARTICIPANT */}
          <Route element={<RequireAuth requiredRouteRole={"PARTICIPANT"} />}>
            <Route path="participant" element={<Sidebar />}>
              <Route index element={<ParticipantDashboard />} />
              <Route path="dashboard" element={<ParticipantDashboard />} />
              <Route path="profile" element={<Outlet />}>
                <Route index element={<UserProfilePage />} />
                <Route path="create" element={<CreateParticipantProfile />} />
                <Route path="edit" element={<EditParticipantProfile />} />
              </Route>
              <Route path="teams" element={<CreateTeam />} />
              <Route path="teams-submissions" element={<Outlet />}>
                <Route index element={<ParticipantTeams />} />
                <Route path="details" element={<TeamDetails />} />
                <Route path="submit" element={<MakeHackathonSubmission />} />
                <Route path="update" element={<EditHackathonSubmissin />} />
                <Route path="invite" element={<Outlet />}>
                  <Route index element={<InviteDetails />} />
                  <Route path="submission" element={<ViewTeamSubmission />} />
                </Route>
              </Route>

              <Route path="hackathons" element={<Outlet />}>
                <Route index element={<ParticipantHackathons />} />
                <Route path="detail" element={<HackathonDetails />} />
              </Route>
            </Route>
          </Route>
          {/* ORGANIZER */}
          <Route element={<RequireAuth requiredRouteRole={"ORGANIZER"} />}>
            <Route path="organizer" element={<OrgSidebar />}>
              <Route path="grades" element={<Outlet />}>
              <Route index element={<GradesPage />} />
              <Route path="view-submission" element={<ViewDetailsPage />} />
              </Route>
              <Route index element={<OrgDashboard />} />
              <Route path="profile" element={<Outlet />}>
                <Route index element={<OrgProfilePage />} />
                <Route path="create" element={<CreateOrgProfile />} />
                <Route path="edit" element={<OrgEditDetails />} />
              </Route>
              <Route path="dashboard" element={<OrgOutlet />}>
                <Route index element={<OrgDashboard />} />
              </Route>
              <Route path="hackathons" element={<Outlet />}>
                <Route index element={<OrgHackathonPage />} />
                <Route path="detail" element={<OrgViewProject />} />
                <Route path="edit" element={<EditHackathon />} />
                <Route path="create" element={<Outlet />}>
                  <Route index element={<CreateHackathon />} />
                  <Route path="media" element={<Outlet />}>
                    <Route index element={<AddMedia />} />
                    <Route path="details" element={<HackathonMedia />} />
                  </Route>
                  <Route path="verify" element={<EmailValidation />} />
                  <Route path="validate" element={<CodeVerification />} />
                </Route>
              </Route>
              <Route path="submissions" element={<Outlet />}>
                <Route index element={<OrgSubmissionPage />} />
                <Route path="details" element={<OrgOutlet />}>
                  <Route index element={<OrgSubmissions />} />
                  <Route path="view" element={<ViewDetailsPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
          {/* ADMIN */}
          <Route element={<RequireAuth requiredRouteRole={"ADMIN"} />}>
            <Route path="admin" element={<AdminSidebar />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="participants" element={<Outlet />}>
                <Route index element={<AllParticipants />} />
                <Route path="detail" element={<ParticipantProfile />} />
              </Route>
              <Route path="organizers" element={<Outlet />}>
                <Route index element={<AllOrganizers />} />
                <Route path="grading-list" element={<GradingListTable />} />
                <Route path="createhackathon" element={<Outlet />}>
                  <Route index element={<CreateHackathon />} />
                  <Route path="media" element={<Outlet />}>
                    <Route index element={<AddHackMedia />} />
                    <Route path="details" element={<HackathonMedia />} />
                  </Route>
                </Route>
                <Route path="hackathons" element={<Outlet />}>
                  <Route index element={<ViewHackathons />} />
                  <Route path="details" element={<ViewHackDetails />} />
                </Route>
              </Route>
              <Route path="hackathons" element={<Outlet />}>
                <Route path="grading-list" element={<GradingListTable />} />
                <Route index element={<AllHackathons />} />
                <Route path="view" element={<Outlet />}>
                  <Route index element={<ViewHackathon />} />
                  <Route path="details" element={<ViewHackDetail />} />
                </Route>
              </Route>
              <Route path="submissions" element={<Outlet />}>
                <Route index element={<AllSubmissions />} />
                <Route path="view" element={<ViewSubmissions />} />
                <Route path="edit" element={<EditSubmission />} />
                <Route path="delete" element={<DeleteSubmission />} />
              </Route>
              <Route path="users" element={<Outlet />}>
                <Route index element={<UsersTable />} />
                <Route path="create" element={<CreateUser />} />
              </Route>
              <Route path="categories" element={<Outlet />}>
                <Route index element={<Category />} />
                <Route path="createcategory" element={<CreateTag />} />
              </Route>
              <Route path="teams" element={<Outlet />}>
                <Route index element={<AllTeams />} />
                <Route path="view" element={<ViewTeam />} />
                <Route path="submission" element={<TeamSubmission />} />
              </Route>
              <Route path="grades" element={<AllGrades />} />
              <Route path="notifications" element={<CreateNotifications />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
