import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { notificationActions } from "./notification-slice";
import { Game } from "@services/index";

const initialGameState: {
  min_cart_value: number;
  games: string[];
} = { min_cart_value: 0, games: [] };

export const gameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    setMinCartValue(state, action) {
      if (action.payload > 0) state.min_cart_value = action.payload;
    },
    newGame(state, action) {
      state.games.push(action.payload);
    },
    clearGames(state) {
      state.games = [];
    },
  },
});

export const gameActions = gameSlice.actions;

export const getGamesFromAPI = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const { listGames } = Game();
    try {
      const res = await listGames();
      dispatch(gameActions.setMinCartValue(res.min_cart_value));
      dispatch(gameActions.clearGames());
      const games: Array<Object> = res.types;
      games.forEach((game) => {
        dispatch(gameActions.newGame(JSON.stringify(game)));
      });
    } catch (error: any) {
      if (error.data.message) {
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: error.data.message,
          })
        );
      } else {
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: "An unexpected error occurred. Please try again.",
          })
        );
      }
    }
  };
};
