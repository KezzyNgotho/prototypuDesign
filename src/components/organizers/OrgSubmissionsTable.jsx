import React, { useState, useEffect } from "react";
import { LinearProgress, Box, Typography, Tabs, Tab } from "@mui/material";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { getHackathonSubmissions } from "../../api/hackathons/hackathons";
import CustomDataGrid from "../common/utils/CustomDataGrid";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import SendFeedbackDialog from "./SendFeedbackDialog";
const OrgSubmissionsTable = ({ hackathonId }) => {
  const [loading, setLoading] = useState(true);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [pathway, setPathway] = useState("Microsoft Learning");
  const [submissionId, setSubmissionId] = useState("")
  const navigate = useNavigate();
  const fetchHackathons = () => {
    getHackathonSubmissions(hackathonId, pathway)
      .then((res) => {
        if (res.status === 200) {
          setSubscriptionsData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchHackathons();
  }, [pathway]);

  const showDetails = (params) => {
    navigate("view", {
      state: { submissionId: params.row.id },
    });
  };
  const handleTabChange = (event, newValue) => {
    setPathway(newValue);
    setLoading(true);
  };
  const closeNotificationModal = () => {
    setOpenNotificationModal(false);
  };

  const openNotifModal = (params) => {
    setSubmissionId(params.row.id)
    setOpenNotificationModal(true)
  }
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
      field: "created_at",
      headerName: "Date Submitted",
      width: 150,
      renderCell: (params) => {
        const formattedDate = moment(params.value).format("Do MMM YYYY");
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => showDetails(params)}>
              View Details
            </MenuItem>
            <MenuItem onClick={() => openNotifModal(params)}>
              Send Feedback
            </MenuItem>
          </Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className=" flex flex-col min-w-full ">
      <div style={{ width: "100%" }}>
        <div className="flex justify-between my-5">
          <Box sx={{ mb: 1 }}>
            <Typography variant="p" fontWeight="600">
              Showing submissions for the{" "}
              {pathway === "IBM Learning"
                ? "IBM Learning Pathway"
                : "Microsoft Learning Pathway"}
            </Typography>
            <Tabs value={pathway} onChange={handleTabChange}>
              <Tab
                value="Microsoft Learning"
                label="MICROSOFT LEARNING PATHWAY"
              />
              <Tab
                value="IBM Learning"
                label="IBM LEARNING PATHWAY"
                sx={{ mr: 5 }}
              />
            </Tabs>
          </Box>
        </div>
        {loading && <LinearProgress />}
        {!loading && (
          <CustomDataGrid
            sx={{ mt: 3 }}
            rows={subscriptionsData}
            columns={columns}
          />
        )}
      </div>
      <SendFeedbackDialog
        openNotificationModal={openNotificationModal}
        closeNotificationModal={closeNotificationModal}
        submission_id={submissionId}
      />
    </div>
  );
};

export default OrgSubmissionsTable;
