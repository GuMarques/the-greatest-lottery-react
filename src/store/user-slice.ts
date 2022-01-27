import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { notificationActions } from "./notification-slice";

const initialLoginState = {
  status: "Not Logged In",
  name: "",
  email: "",
  token: {
    type: "",
    token: "",
    expires_at: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialLoginState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.status = "Logged In";
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logout(state) {
      state.name = "";
      state.email = "";
      state.token = {
        type: "",
        token: "",
        expires_at: "",
      };
    },
    loginFailed(state, action) {
      state.email = "";
      state.status = "Error on Login: " + action.payload.error;
    },
  },
});

export const userActions = userSlice.actions;

export const sendLoginRequest = (email: string, password: string) => {
  return (dispatch: React.Dispatch<any>) => {
    axios
      .post("http://127.0.0.1:3333/login", {
        email,
        password,
      })
      .then((res) => {
        dispatch(
          userActions.login({
            email: email,
            name: res.data.user.name,
            token: res.data.token,
          })
        );
      })
      .catch((error) => {
        dispatch(userActions.loginFailed({ error: error.message }));
      });
  };
};

export const sendSignUpRequest = (
  name: string,
  email: string,
  password: string
) => {
  return (dispatch: React.Dispatch<any>) => {
    axios
      .post("http://127.0.0.1:3333/user/create", {
        name,
        email,
        password,
      })
      .then((res) => {
        dispatch(notificationActions.runNotification({
          status: 'sucess',
          message: 'Your account has been sucessfully created!'
        }))
        dispatch(
          userActions.login({
            email,
            name,
            token: res.data.token,
          })
        );
      });
  };
};
