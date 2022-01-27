import { configureStore } from "@reduxjs/toolkit";
import { notificationSlice } from "./notification-slice";
import { userSlice } from "./user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
