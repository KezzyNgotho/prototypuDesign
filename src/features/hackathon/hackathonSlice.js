import { createSlice } from "@reduxjs/toolkit";

const hackathonSlice = createSlice({
  name: "hackathon",
  initialState: {
    selectedHackathonDetail: null,
    currentHackathonDetail: null,
  },
  reducers: {
    setSelectedHackathonDetail: (state, action) => {
      const { selectedHackathonDetail } = action.payload;
      state.selectedHackathonDetail = selectedHackathonDetail;
    },
    setCurrentHackathonDetail: (state, action) => {
      const { currentHackathonDetail } = action.payload;
      state.currentHackathonDetail = currentHackathonDetail;
    },
  },
});

export const { setSelectedHackathonDetail, setCurrentHackathonDetail} = hackathonSlice.actions;
export const selectSelectedHackathonDetail = (state) =>
  state?.hackathon?.selectedHackathonDetail;
  export const selectCurrentHackathonDetail = (state) =>
  state?.hackathon?.currentHackathonDetail;
export default hackathonSlice.reducer;
