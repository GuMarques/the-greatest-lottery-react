import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import React from "react";
import { notificationActions } from "./notification-slice";

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
  return (dispatch: React.Dispatch<any>) => {
    axios
      .get("http://127.0.0.1:3333/cart_games")
      .then((res) => {
        dispatch(gameActions.setMinCartValue(res.data.min_cart_value));
        dispatch(gameActions.clearGames());
        const games: Array<Object> = res.data.types;
        games.forEach((game) => {
          dispatch(gameActions.newGame(JSON.stringify(game)))
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: err.errors[0].message,
          })
        );
      });
  };
};
