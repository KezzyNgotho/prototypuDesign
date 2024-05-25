import React, { useState, useEffect } from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { getAllHackathons } from "../../../api/hackathons/hackathons";
import { Chip, Typography } from "@mui/material";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import { useDispatch } from "react-redux";
import { setSelectedHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import { LinearProgress } from "@mui/material";
import { green, red } from "@mui/material/colors";
import DeleteHackModal from "./DeleteHackModal";
import AdminLogOut from "../AdminLogOut";

function getChipProps(params) {
  if (params.value === "ACTIVE") {
    return {
      label: params.value,
      style: {
        width: "200px",
        color: green[600],
        borderColor: green[100],
        backgroundColor: green[100],
        borderRadius: 5,
      },
    };
  } else {
    return {
      label: params.value,
      style: {
        width: "200px",
        color: red[600],
        borderColor: red[100],
        backgroundColor: red[100],
        borderRadius: 5,
      },
    };
  }
}
const AllHackathons = () => {
  const [loading, setLoading] = useState(true);
  const [hackathonsPayload, setHackathonsPayload] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const fetchHackathons = () => {
    getAllHackathons().then((res) => {
      if (res.status === 200) {
        setHackathonsPayload(res.data);
        setLoading(false);
      }
    });
  };
  const handleActionClick = (params) => {
    dispatch(setSelectedHackathonDetail({ selectedHackathonDetail: params }));
  };
  useEffect(() => {
    fetchHackathons();
  }, []);

  const viewGradingList = (hackathon_id) => {
    navigate("grading-list", {
      state: { hackathon_id },
    });
  };

  const columns = [
    { field: "title", headerName: "Title", width: 250 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "highlight", headerName: "Highlight", width: 280 },
    {
      field: "status",
      headerName: "Status",
      width: 220,
      renderCell: (params) => (
        <Chip variant="outlined" size="medium" {...getChipProps(params)} />
      ),
    },

    {
      field: "action",
      headerName: "Actions",
      width: 100,
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
            <MenuItem onClick={() => navigate("view")}>View Hackathon</MenuItem>
            <MenuItem onClick={() => viewGradingList(params.row.id)}>
              View Hackathon Grading List
            </MenuItem>
            <MenuItem onClick={() => setModalOpen(true)}>
              Delete Hackathon
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
          <AdminLogOut />
        </div>
        <h1 className="text-[24px] font-bold text-gray-600">All Hackathons</h1>
        {loading && (
          <>
            <LinearProgress />
            <Typography>Fetching hackathon data...</Typography>
          </>
        )}
        {!loading && (
          <div className="flex-grow">
            <CustomDataGrid
              sx={{ mt: 3 }}
              rows={hackathonsPayload}
              columns={columns}
            />
          </div>
        )}
        {isModalOpen && (
          <DeleteHackModal
            openModal={isModalOpen}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AllHackathons;
