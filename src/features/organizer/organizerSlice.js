import { createSlice } from "@reduxjs/toolkit";

const organizerSlice = createSlice({
  name: "organizer",
  initialState: {
    currentOrganizerDetail: null,
    organizerCode: null,
  },
  reducers: {
    setCurrentOrganizerDetail: (state, action) => {
      const { currentOrganizerDetail } = action.payload;
      state.currentOrganizerDetail = currentOrganizerDetail;
    },
    setOrganizerCode: (state, action) => {
      const { organizerCode } = action.payload;
      state.organizerCode = organizerCode;
    },
  },
});

export const { setCurrentOrganizerDetail, setOrganizerCode } =
  organizerSlice.actions;
export const selectCurrentOrganizerDetail = (state) =>
  state?.organizer?.currentOrganizerDetail;
export const selectOrganizerCode = (state) => state?.organizer?.organizerCode;

export default organizerSlice.reducer;
