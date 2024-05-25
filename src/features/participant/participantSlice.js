import { createSlice } from "@reduxjs/toolkit";

const participantSlice = createSlice({
  name: "participant",
  initialState: {
    currentParticipantDetail: null,
    participantCode: "b686ae99-ad9d-4b15-ba6a-53d7bdfac4ec",
  },
  reducers: {
    setCurrentParticipantDetail: (state, action) => {
      const { currentParticipantDetail } = action.payload;
      state.currentParticipantDetail = currentParticipantDetail;
    },
    setParticipantCode: (state, action) => {
      const { participantCode } = action.payload;
      state.participantCode = participantCode;
    },
  },
});

export const { setCurrentParticipantDetail, setParticipantCode } =
  participantSlice.actions;
export const selectCurrentParticipantDetail = (state) =>
  state?.participant?.currentParticipantDetail;
export const selectParticipantCode = (state) =>
  state?.participant?.participantCode;

export default participantSlice.reducer;
