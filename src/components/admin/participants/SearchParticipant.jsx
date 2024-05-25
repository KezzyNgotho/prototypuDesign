import React, { useState, useEffect } from "react";
import { searchLearnersByNameTable } from "../../../api/teams/teams";
import CustomDataGrid from "../../common/utils/CustomDataGrid";
import { Typography, LinearProgress } from "@mui/material";
const SearchParticipant = ({
  columns,
  searchedParticipants,
  setSearchedParticipants,
}) => {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchParticipants = () => {
    searchLearnersByNameTable(search).then((res) => {
      if (res.status === 200) {
        setSearchedParticipants(res.data);
        setLoading(false);
      } else {
        setMessage(res.data);
        setLoading(false);
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetchParticipants();
  }, [search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search participants by name or email..."
        className="focus:outline-none text-xs mb-4 border-gray-300 border p-4 w-[400px] rounded"
      />
      {loading && search !== "" && (
        <>
          <LinearProgress />
          <Typography>Searching participants...</Typography>
        </>
      )}
      {message !== "" && <Typography>{message}</Typography>}
      {searchedParticipants.length > 0 && (
        <CustomDataGrid
          sx={{ mt: 3 }}
          rows={searchedParticipants}
          columns={columns}
        />
      )}
    </div>
  );
};

export default SearchParticipant;
