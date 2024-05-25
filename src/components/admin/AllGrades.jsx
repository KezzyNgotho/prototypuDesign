import React, { useEffect, useState } from "react";
import AdminLogOut from "./AdminLogOut";
import { getAllGrades } from "../../api/grades/grades";
import CustomDataGrid from "../common/utils/CustomDataGrid";
import { LinearProgress, Typography } from "@mui/material";

const AllGrades = () => {
  const [gradesPayload, setGradesPayload] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllGrades = () => {
    getAllGrades().then((res) => {
      if (res.status === 200) {
        const gradesWithIds = res.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setGradesPayload(gradesWithIds);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchAllGrades();
  }, []);

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
        {!loading && (
          <div className="flex-grow">
            <CustomDataGrid
              sx={{ mt: 3 }}
              rows={gradesPayload}
              columns={columns}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGrades;
