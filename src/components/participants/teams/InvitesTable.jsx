import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LinearProgress, Chip, Button } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { green, red, yellow } from "@mui/material/colors";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import { setInviteRef } from "../../../features/invite/inviteSlice";
const InvitesTable = ({ invitesMiniData, loading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function viewInvite(id) {
    dispatch(setInviteRef({ inviteRef: id }));
    navigate("invite");
  }

  function getChipProps(params) {
    if (params.value === "Accepted") {
      return {
        label: "ACCEPTED",
        style: {
          width: "200px",
          color: green[600],
          borderColor: green[100],
          backgroundColor: green[100],
          borderRadius: 5,
        },
      };
    } else if (params.value === "Pending") {
      return {
        label: "PENDING",
        style: {
          width: "200px",
          color: yellow[600],
          borderColor: yellow[100],
          backgroundColor: yellow[100],
          borderRadius: 5,
        },
      };
    } else {
      return {
        label: "DECLINED",
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

  const columns = [
    { field: "team_name", headerName: "Team Name", width: 250 },
    { field: "invite_type", headerName: "Invite Type", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <Chip variant="outlined" size="medium" {...getChipProps(params)} />
      ),
    },

    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Button onClick={() => viewInvite(params.row.id)}>View Invite</Button>
      ),
    },
  ];

  return (
    <div className="w-[90%] mt-8 mb-5 ">
      <p className=" font-bold text-[18px] mt-4 text-gray-500">
        My Team Invites
      </p>
      {loading ? (
        <LinearProgress />
      ) : invitesMiniData.length > 0 ? (
        <CustomDataGrid
          sx={{ mt: 3 }}
          rows={invitesMiniData}
          columns={columns}
        />
      ) : (
        <div className="mt-4 bg-white w-3/4 p-4 rounded shadow flex gap-5 items-center">
          <InfoOutlined sx={{ color: "red" }} />
          <p className="text-bold text-black">
            You do not have any team invites at the moment. Keep exploring!
          </p>
        </div>
      )}
      {/* {loading && <LinearProgress />}
      {!loading && invitesMiniData.length > 0 && (
        <CustomDataGrid
          sx={{ mt: 3 }}
          rows={invitesMiniData}
          columns={columns}
        />
      )}{" "}
      {!loading && invitesMiniData.length === 0 && (
        <div className="mt-4 bg-white w-3/4 p-4 rounded shadow flex gap-5 items-center">
          <InfoOutlined sx={{ color: "red" }} />
          <p className="text-bold text-black">
            You do not have any team invites at the moment. Keep exploring!
          </p>
        </div>
      )} */}
    </div>
  );
};

export default InvitesTable;
