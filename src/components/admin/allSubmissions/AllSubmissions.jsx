import React, { useState, useEffect } from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { getSubmissions } from "../../../api/teams/teams";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import AdminProfile from "../AdminLogOut";
import { LinearProgress, Typography } from "@mui/material";
const AllSubmissions = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [submissionsPayload, setSubmissionsPayload] = useState([]);
  const fetchSubmissions = () => {
    getSubmissions().then((res) => {
      if (res.status === 200) {
        setSubmissionsPayload(res.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const viewTeamSubmission = (submission_id) => {
    navigate("view", {
      state: { submission_id },
    });
  };

  const columns = [
    {
      field: "solution_title",
      headerName: "Solution Title",
      width: 200,
    },
    {
      field: "solution_live_url",
      headerName: "Solution live link",
      width: 200,
    },
    {
      field: "repo_link",
      headerName: "Repository link",
      width: 200,
    },
    {
      field: "demo_video_link",
      headerName: "Demo video link",
      width: 200,
    },

    { field: "grade", headerName: "Grade", width: 100 },
    {
      field: "action",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => (
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => viewTeamSubmission(params.row.id)}>
              View Submission
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
        <h1 className="text-[24px] font-bold text-gray-600">All Submissions</h1>
        {loading && (
          <>
            <LinearProgress />
            <Typography> Fetching submission data...</Typography>
          </>
        )}
        {!loading && (
          <CustomDataGrid
            sx={{ mt: 3 }}
            rows={submissionsPayload}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default AllSubmissions;
