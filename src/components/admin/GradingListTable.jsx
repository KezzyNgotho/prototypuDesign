import React, { useEffect, useState } from "react";
import {
  getHackathonGradingList,
  getOrganizerGradingList,
} from "../../api/grades/grades";
import { useLocation } from "react-router-dom";
import AdminLogOut from "./AdminLogOut";
import CustomDataGrid from "../common/utils/CustomDataGrid";
import { LinearProgress, Typography } from "@mui/material";
import { Grading } from "@mui/icons-material";

const GradingListTable = () => {
  const location = useLocation();
  const organizerId = location.state.organizer_id;
  const hackathonId = location.state.hackathon_id;
  const [loading, setLoading] = useState(true);
  const [gradesListPayload, setGradesListPayload] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchGradingList = (fetchFunction, id) => {
    fetchFunction(id)
      .then((res) => {
        if (res.status === 200) {
          const gradesWithIds = res.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));
          setGradesListPayload(gradesWithIds);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 404) {
          setErrorMessage(
            " No submission Grades yet! Stay tuned for the showcase. Exciting entries are on the way."
          );
        } else {
          setErrorMessage(`Error fetching team submission: ${error.message}`);
        }
      });
  };

  useEffect(() => {
    if (organizerId) {
      fetchGradingList(getOrganizerGradingList, organizerId);
    } else if (hackathonId) {
      fetchGradingList(getHackathonGradingList, hackathonId);
    }
  }, [organizerId, hackathonId]);

  const columns = [
    {
      field: "team",
      headerName: "Team",
      width: 200,
    },
    {
      field: "organizer",
      headerName: "Organizer",
      width: 200,
    },
    {
      field: "submission_title",
      headerName: "Submission Title",
      width: 200,
    },
    {
      field: "hackathon",
      headerName: "Hackathon",
      width: 250,
    },
    {
      field: "mark",
      headerName: "Grade",
      width: 150,
    },
  ];

  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full ">
      <div className="ml-60">
        <div className="flex justify-end">
          <AdminLogOut />
        </div>
        <h1 className="text-[24px] font-bold text-gray-600">All Grades</h1>

        {loading && (
          <>
            <LinearProgress />
            <Typography>Fetching grades data...</Typography>
          </>
        )}
        {!loading && gradesListPayload.length > 0 && (
          <div className="flex-grow">
            <CustomDataGrid
              sx={{ mt: 3 }}
              rows={gradesListPayload}
              columns={columns}
            />
          </div>
        )}
        {!loading && gradesListPayload.length === 0 && (
          <div className="w-[600px] shadow bg-white rounded p-4 flex flex-row gap-5 mt-5">
            <Grading
              className="text-custom-blue"
              sx={{ width: "40px", height: "40px" }}
            />
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradingListTable;
