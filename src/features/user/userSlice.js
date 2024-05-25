import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUserRef: null,
    currentUserRole: null,
    accessToken: null,
  },
  reducers: {
    setLoggedInUserRef: (state, action) => {
      const { loggedInUserRef } = action.payload;
      state.loggedInUserRef = loggedInUserRef;
    },
    setCurrentUserRole: (state, action) => {
      const { currentUserRole } = action.payload;
      state.currentUserRole = currentUserRole;
    },
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
  },
  // extraReducers: {},
});

export const { setLoggedInUserRef, setCurrentUserRole, setAccessToken } =
  userSlice.actions;

export const selectLoggedInUserRef = (state) => state?.user?.loggedInUserRef;
export const selectCurrentUserRole = (state) => state?.user?.currentUserRole;
export const selectAccessToken = (state) => state?.user?.accessToken;

export default userSlice.reducer;
