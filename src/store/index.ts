import { configureStore } from "@reduxjs/toolkit";
import { betSlice } from "./slices/bets-slice";
import { cartSlice } from "./slices/cart-slice";
import { gameSlice } from "./slices/games-slice";
import { notificationSlice } from "./slices/notification-slice";
import { numberSlice } from "./slices/numbers-slice";
import { userSlice } from "./slices/user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notification: notificationSlice.reducer,
    bets: betSlice.reducer,
    games: gameSlice.reducer,
    numbers: numberSlice.reducer,
    cart: cartSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
