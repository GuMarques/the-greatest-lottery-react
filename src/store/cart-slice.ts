import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cart from "../interfaces/cart";
import { notificationActions } from "./notification-slice";

const initialCartState: Cart = { games: [], total: 0 };

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      state.games.push(action.payload);
      state.total += action.payload.price;
    },
    removeItem(state, action) {
      state.total-=action.payload.price;
      state.games.splice(action.payload.index, 1);
    },
    clearCart(_) {
      return initialCartState;
    },
  },
});

export const addBetToCart = (
  cart: Cart,
  game: {
    name: string;
    price: number;
    color: string,
    game_id: number;
    numbers: number[];
  }
) => {
  return (dispatch: React.Dispatch<any>) => {
    let response = false;
    cart.games.forEach((item, index) => {
      let equals = game.numbers.every(
        (val, index) => val === item.numbers[index]
      );

      if (equals) {
        if (item.game_id === game.game_id) {
          response = true;
        }
      }
    });
    if(response) {
      dispatch(notificationActions.runNotification({
        status: 'error',
        message: 'You already placed a bet with these numbers.'
      }))
    } else {
      dispatch(cartActions.addItem(game));
      
    }
  };
};

export const sendBetToAPI = (token: string, cart: Cart) => {
  return (dispatch: React.Dispatch<any>) => {
    const request = {
      games: cart.games.map((item) => {
        return {
          game_id: item.game_id,
          numbers: item.numbers,
        };
      }),
    };
    axios
      .post("http://127.0.0.1:3333/bet/new-bet", request, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(cartActions.clearCart());
        dispatch(
          notificationActions.runNotification({
            status: "sucess",
            message: "Bet successfully placed. Good Luck!",
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: err.response.data.message,
          })
        );
      });
  };
};

export const cartActions = cartSlice.actions;
