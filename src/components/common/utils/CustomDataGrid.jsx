import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

import SortedAscendingIcon from "../icons/SortedAscendingIcon.jsx";
import SortedDescendingIcon from "../icons/SortedDescendingIcon.jsx";
import CustomNoRowsOverlay from "./NoRowsOverlay.jsx";

const CustomDataGrid = ({ rows, columns }) => {
  const [pageSize, setPageSize] = useState(25);

  return (
    <>
      <Box
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "primary.lightest_gray",
            fontSize: 16,
          },
        }}
      >
        <DataGrid
          getRowId={(row) =>
            row.code || row.id || row.receipt_number || row.user_ref
          }
          rows={rows}
          columns={columns}
          autoHeight
          sx={{ mt: 1, p: 2 }}
          pageSize={pageSize}
          rowsPerPageOptions={[25, 50, 100, 200, 400]}
          onPageSizeChange={(newValue) => setPageSize(newValue)}
          components={{
            ColumnSortedDescendingIcon: SortedDescendingIcon,
            ColumnSortedAscendingIcon: SortedAscendingIcon,
            NoRowsOverlay: CustomNoRowsOverlay,
            Toolbar: GridToolbarQuickFilter,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </>
  );
};
export default CustomDataGrid;
