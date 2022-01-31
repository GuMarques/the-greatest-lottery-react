import { configureStore } from "@reduxjs/toolkit";
import { betSlice } from "./bets-slice";
import { gameSlice } from "./games-slice";
import { notificationSlice } from "./notification-slice";
import { userSlice } from "./user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notification: notificationSlice.reducer,
    bets: betSlice.reducer,
    games: gameSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
