import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import React from "react";
import { notificationActions } from "./notification-slice";
import Bet from "../interfaces/bet";

const initialBetState: string[] = [];

export const betSlice = createSlice({
  name: "bet",
  initialState: initialBetState,
  reducers: {
    newBet(state, action) {
      const newBet: Bet = action.payload;
      const formatedBet = JSON.stringify(newBet);
      state.push(formatedBet);
    },
    clearBets(_) {
      return initialBetState;
    },
  },
});

export const betActions = betSlice.actions;

export const getBetsFromAPI = (token: string) => {
  return (dispatch: React.Dispatch<any>) => {
    axios
      .get("http://127.0.0.1:3333/bet/all-bets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(betActions.clearBets());
        res.data.forEach((bet: Bet) => {
          const newBet: Bet = {
            id: bet.id,
            user_id: bet.user_id,
            game_id: bet.game_id,
            choosen_numbers: bet.choosen_numbers,
            price: bet.price,
            created_at: bet.created_at,
            type: {
              id: bet.type.id,
              type: bet.type.type,
            },
          };
          dispatch(betActions.newBet(newBet));
        });
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
