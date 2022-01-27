import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  status: "",
  message: "",
  active: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: initialLoginState,
  reducers: {
    runNotification(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.active = true;
    },
    dismissNotification(state) {
      state.status = "";
      state.message = "";
      state.active = false;
    },
  },
});

export const notificationActions = notificationSlice.actions;
