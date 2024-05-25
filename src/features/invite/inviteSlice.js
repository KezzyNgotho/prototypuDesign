import { createSlice } from "@reduxjs/toolkit";

const inviteSlice = createSlice({
  name: "invite",
  initialState: {
    currentInviteDetail: null,
    inviteRef: null,
  },
  reducers: {
    setCurrentInviteDetail: (state, action) => {
      const { currentInviteDetail } = action.payload;
      state.currentInviteDetail = currentInviteDetail;
    },
    setInviteRef: (state, action) => {
      const { inviteRef } = action.payload;
      state.inviteRef = inviteRef;
    },
  },
});

export const { setCurrentInviteDetail, setInviteRef } = inviteSlice.actions;
export const selectCurrentInviteDetail = (state) =>
  state?.invite?.currentInviteDetail;
export const selectInviteRef = (state) => state?.invite?.inviteRef;

export default inviteSlice.reducer;
