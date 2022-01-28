import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import React from "react";
import Bet from "../models/bet";
import { notificationActions } from "./notification-slice";

const initialBetState = [new Bet(0, 0, 0, "", 0, "", 0, "")];

export const betSlice = createSlice({
  name: "bet",
  initialState: initialBetState,
  reducers: {
    newBet(state, action) {
      const newBet = new Bet(
        action.payload.id,
        action.payload.user_id,
        action.payload.game_id,
        action.payload.choosen_numbers,
        action.payload.price,
        action.payload.created_at,
        action.payload.type_id,
        action.payload.type
      );
      state.push(newBet);
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
        res.data.forEach((bet: Bet) => {
          dispatch(
            betActions.newBet({
              id: bet.id,
              user_id: bet.user_id,
              game_id: bet.game_id,
              choosen_numbers: bet.choosen_numbers,
              price: bet.price,
              created_at: bet.created_at,
              type_id: bet.type.id,
              type: bet.type.type,
            })
          );
        });
      }).catch((err) => {
        dispatch(notificationActions.runNotification({
          status: 'error',
          message: err.errors[0].message
        }))
      })
  };
};
