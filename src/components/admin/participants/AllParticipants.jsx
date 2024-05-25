import React, { useState, useEffect } from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { getParticipants } from "../../../api/admins/admins";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import AdminProfile from "../AdminLogOut";
import { useDispatch } from "react-redux";
import { setCurrentParticipantDetail } from "../../../features/participant/participantSlice";
import { Avatar, LinearProgress, Typography, Box } from "@mui/material";
import DeleteModal from "./DeleteModal";
import { deleteParticipantProfile } from "../../../api/accounts/accounts";
import DeleteSuccessModal from "../hackathons/DeleteSuccessModal";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SendPlatformUserNotification from "../notifications/SendPlatformUserNotification";
import SearchParticipant from "./SearchParticipant";
const AllParticipants = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [participantsPayload, setParticipantsPayload] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [participantCode, setParticipantCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [participantTotal, setParticipantTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [searchedParticipants, setSearchedParticipants] = useState([]);
  const handleDeleteUserAccount = (id) => {
    setIsSubmitting(true);
    deleteParticipantProfile(id).then((res) => {
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

  const fetchParticipants = (page) => {
    setLoading(true);
    getParticipants(page).then((res) => {
      if (res.status === 200) {
        setParticipantsPayload(res.data.participants_payload);
        setParticipantTotal(res.data.participants_total);
        setTotalPages(pageLimit(res.data.participants_total));
        setLoading(false);
      }
    });
  };

  function pageLimit(totalParticipant) {
    return Math.ceil(totalParticipant / 20);
  }

  useEffect(() => {
    fetchParticipants(currentPage);
  }, [currentPage]);

  const handleActionClick = (params) => {
    setParticipantCode(params.id);
    dispatch(setCurrentParticipantDetail({ currentParticipantDetail: params }));
  };

  const renderPageNumbers = () => {
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    return (
      <div className="pagination flex gap-1 mt-5 justify-center">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`${
              pageNumber === currentPage
                ? "bg-custom-blue text-white"
                : "border border-custom-blue text-custom-blue"
            } rounded px-0.5 py-1 flex items-center`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  const closeNotificationModal = () => {
    setOpenNotificationModal(false);
  };
  const columns = [
    {
      field: "full_name",
      headerName: "Participant",
      width: 350,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={params.row.profile_image_url} sx={{ mr: 1 }} />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "city", headerName: "City", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "pathway", headerName: "Pathway", width: 150 },
    { field: "date_of_birth", headerName: "DOB", width: 150 },
    {
      field: "action",
      headerName: "Actions",
      width: 110,
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
            <MenuItem onClick={() => navigate("/admin/participants/detail")}>
              View participant
            </MenuItem>
            <MenuItem onClick={() => setOpenNotificationModal(true)}>
              Send Notification
            </MenuItem>
            <MenuItem onClick={() => setModalOpen(true)}>
              Delete participant
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
        <h1 className="text-[24px] font-bold text-gray-600">
          Participant Profiles
        </h1>
        <div>
          <SearchParticipant
            columns={columns}
            searchedParticipants={searchedParticipants}
            setSearchedParticipants={setSearchedParticipants}
          />
        </div>
        {loading && (
          <>
            <LinearProgress />
            <Typography>Fetching participant's data...</Typography>
          </>
        )}
        {!loading && searchedParticipants.length === 0 && (
          <>
            <div className="pagination flex gap-10 mt-5 justify-end">
              {currentPage !== 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className=" flex items-center border border-custom-blue rounded px-2 py-1 text-custom-blue"
                >
                  <ChevronLeft />
                  Previous Page
                </button>
              )}
              {currentPage < pageLimit(participantTotal) && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="bg-custom-blue text-white rounded px-2 py-1 flex items-center "
                >
                  Next Page
                  <ChevronRight />
                </button>
              )}
              {currentPage === pageLimit(participantTotal) &&
                currentPage !== 1 && (
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="bg-custom-blue text-white rounded px-2 py-1 flex items-center "
                  >
                    Start over
                    <ChevronRight />
                  </button>
                )}
            </div>
            <CustomDataGrid
              sx={{ mt: 3 }}
              rows={participantsPayload}
              columns={columns}
            />
            {renderPageNumbers()}
          </>
        )}
        {isModalOpen && (
          <DeleteModal
            openModal={isModalOpen}
            isSubmitting={isSubmitting}
            closeModal={() => setModalOpen(false)}
            id={participantCode}
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
            participant_id={participantCode}
            organizer_id={null}
          />
        )}
      </div>
    </div>
  );
};

export default AllParticipants;
