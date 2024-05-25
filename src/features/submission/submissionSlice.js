import { createSlice } from "@reduxjs/toolkit";

const submissionSlice = createSlice({
  name: "submission",
  initialState: {
    currentSubmissionDetail: null,
  },
  reducers: {
    setCurrentSubmissionDetail: (state, action) => {
      const { currentSubmissionDetail } = action.payload;
      state.currentSubmissionDetail = currentSubmissionDetail;
    },
  },
});

export const { setCurrentSubmissionDetail } = submissionSlice.actions;
export const selectCurrentSubmissionDetail = (state) =>
  state?.submission?.currentSubmissionDetail;
export default submissionSlice.reducer;
