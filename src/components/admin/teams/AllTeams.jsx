import React, { useState, useEffect } from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import AdminProfile from "../AdminLogOut";
import { LinearProgress, Typography } from "@mui/material";
import { getAllTeams } from "../../../api/teams/teams";
import DeleteTeamModal from "./DeleteTeamModal";
const AllTeams = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [teamsPayload, setTeamsPayload] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [teamId, setTeamId] = useState("");

  const fetchTeams = () => {
    getAllTeams().then((res) => {
      if (res.status === 200) {
        setTeamsPayload(res.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const viewTeamDetails = (team_id) => {
    console.log(team_id);
    navigate("view", {
      state: { team_id },
    });
  };
  const viewTeamSubmission = (team_id) => {
    console.log(team_id);
    navigate("submission", {
      state: { team_id },
    });
  };

  const handleActionClick = (params) => {
    setTeamId(params.row.id);
  };
  const columns = [
    {
      field: "team_name",
      headerName: "Team Name",
      width: 200,
    },
    {
      field: "team_type",
      headerName: "Team Type",
      width: 200,
    },
    {
      field: "active_participants",
      headerName: "Active Participants",
      width: 200,
      renderCell: (params) => (
        <span>{params.row.active_participants.length}</span>
      ),
    },
    {
      field: "invited_participants",
      headerName: "Invited Participants",
      width: 200,
      renderCell: (params) => (
        <span>{params.row.invited_participants.length}</span>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => (
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
            onClick={() => handleActionClick(params)}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => viewTeamDetails(params.row.id)}>
              View Team
            </MenuItem>
            <MenuItem onClick={() => viewTeamSubmission(params.row.id)}>
              View Team Submission
            </MenuItem>
            <MenuItem onClick={() => setOpenDeleteModal(true)}>
              Delete Team
            </MenuItem>
          </Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full ">
      <div className="ml-60">
        <div className="flex justify-end">
          <AdminProfile />
        </div>
        <h1 className="text-[24px] font-bold text-gray-600">All Teams</h1>
        {loading && (
          <>
            <LinearProgress />
            <Typography>Fetching teams' data...</Typography>
          </>
        )}
        {!loading && (
          <CustomDataGrid
            sx={{ mt: 3 }}
            rows={teamsPayload}
            columns={columns}
          />
        )}
      </div>
      <DeleteTeamModal
        openModal={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        team_id={teamId}
      />
    </div>
  );
};

export default AllTeams;
