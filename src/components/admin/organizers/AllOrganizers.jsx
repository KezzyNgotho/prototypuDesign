import React, { useState, useEffect } from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { getOrganizers } from "../../../api/admins/admins";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import AdminProfile from "../AdminLogOut";
import { useDispatch } from "react-redux";
import { setCurrentOrganizerDetail } from "../../../features/organizer/organizerSlice";
import { Avatar, LinearProgress, Typography, Box } from "@mui/material";
import DeleteModal from "./DeleteModal";
import { deleteOrganizerProfile } from "../../../api/accounts/accounts";
import DeleteSuccessModal from "../hackathons/DeleteSuccessModal";
import SendPlatformUserNotification from "../notifications/SendPlatformUserNotification";
const AllOrganizers = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [organizersPayload, setOrganizersPayload] = useState([]);
  const [organizerCode, setOrganizerCode] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);

  const handleDeleteUserAccount = (id) => {
    setIsSubmitting(true);
    deleteOrganizerProfile(id).then((res) => {
      if (res.status === 204) {
        setModalOpen(false);
        setDeleteModalOpen(true);
        setTimeout(() => {
          setDeleteModalOpen(false);
          window.location.reload();
        }, 2000);
        setIsSubmitting(false);
      } else {
        setErrorMessage("Error Deleting Account");
        setIsSubmitting(false);
      }
    });
  };
  const fetchOrganizers = () => {
    getOrganizers().then((res) => {
      if (res.status === 200) {
        setOrganizersPayload(res.data);
        setLoading(false);
      }
    });
  };
  const handleActionClick = (params) => {
    setOrganizerCode(params.id);
    dispatch(setCurrentOrganizerDetail({ currentOrganizerDetail: params }));
  };

  const viewGradingList = (organizer_id) => {
    navigate("grading-list", {
      state: { organizer_id },
    });
  };
  useEffect(() => {
    fetchOrganizers();
  }, []);

  const closeNotificationModal = () => {
    setOpenNotificationModal(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Organizer",
      width: 350,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={params.row.profile_image_url} sx={{ mr: 1 }} />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    { field: "industry", headerName: "Industry", width: 200 },
    { field: "location", headerName: "Location", width: 200 },
    {
      field: "action",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => (
        <Dropdown>
          <MenuButton
            onClick={() => handleActionClick(params.row)}
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => navigate("hackathons")}>
              View Hackathons
            </MenuItem>
            <MenuItem onClick={() => setOpenNotificationModal(true)}>
              Send Notification
            </MenuItem>
            <MenuItem onClick={() => navigate("createhackathon")}>
              Create Hackathon
            </MenuItem>
            <MenuItem onClick={() => viewGradingList(params.row.id)}>
              View Organizer Grading List
            </MenuItem>
            <MenuItem onClick={() => setModalOpen(true)}>
              Delete Organization
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
        <h1 className="text-[24px] font-bold text-gray-600">All Organizers</h1>
        {loading && (
          <>
            <LinearProgress />
            <Typography>Fetching Organizer's data...</Typography>
          </>
        )}
        {!loading && (
          <div className="flex-grow">
            <CustomDataGrid
              sx={{ mt: 3 }}
              rows={organizersPayload}
              columns={columns}
            />
          </div>
        )}
        {isModalOpen && (
          <DeleteModal
            isSubmitting={isSubmitting}
            openModal={isModalOpen}
            closeModal={() => setModalOpen(false)}
            id={organizerCode}
            deleteAction={handleDeleteUserAccount}
            errorMessage={errorMessage}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteSuccessModal
            openModal={isDeleteModalOpen}
            closeModal={() => setDeleteModalOpen(false)}
          />
        )}
        {openNotificationModal && (
          <SendPlatformUserNotification
            openNotificationModal={openNotificationModal}
            closeNotificationModal={closeNotificationModal}
            participant_id={null}
            organizer_id={organizerCode}
          />
        )}
      </div>
    </div>
  );
};

export default AllOrganizers;
