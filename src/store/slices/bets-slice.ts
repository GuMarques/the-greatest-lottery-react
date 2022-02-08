import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { notificationActions } from "./notification-slice";
import Bet from "@interfaces/bet";
import { Bet as ServiceBet } from "@services/index";

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

export const getBetsFromAPI = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const { listBet } = ServiceBet();

    try {
      const res = await listBet();
      dispatch(betActions.clearBets());
      res.forEach((bet: Bet) => {
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
    } catch (error: any) {
      if (error.errors) {
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: error.errors[0].message,
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
