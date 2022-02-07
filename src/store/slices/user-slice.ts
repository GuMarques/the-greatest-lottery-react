import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import instance from "@services/axios.config";
import { notificationActions } from "./notification-slice";

const initialLoginState = {
  name: "",
  email: "",
  token: {
    type: "",
    token: "",
    expires_at: "",
  },
  resetPasswordToken: "",
  navigateTo: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialLoginState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
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
    loginFailed(state) {
      state.email = "";
    },
    resetPasswordSetToken(state, action) {
      state.resetPasswordToken = action.payload;
    },
    navigateAfterResetPassword(state, action) {
      state.navigateTo = action.payload;
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
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: error.response.data.message,
          })
        );
      });
  };
};

export const sendSignUpRequest = (
  name: string,
  email: string,
  password: string
) => {
  return (dispatch: React.Dispatch<any>) => {
    instance
      .post("/user/create", {
        name,
        email,
        password,
      })
      .then((res) => {
        dispatch(
          notificationActions.runNotification({
            status: "sucess",
            message: "Your account has been sucessfully created!",
          })
        );
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

export const sendResetPasswordRequest = (email: string) => {
  return (dispatch: React.Dispatch<any>) => {
    axios
      .post("http://127.0.0.1:3333/reset", {
        email,
      })
      .then((res) => {
        dispatch(userActions.resetPasswordSetToken(res.data.token));
      })
      .catch((err) => {
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: err.response.data.errors[0].message,
          })
        );
      });
  };
};

export const sendChangePasswordRequest = (
  token: string,
  newPassword: string
) => {
  return (dispatch: React.Dispatch<any>) => {
    axios
      .post("http://127.0.0.1:3333/reset/" + token, {
        password: newPassword,
      })
      .then(() => {
        dispatch(
          notificationActions.runNotification({
            status: "sucess",
            message: "Password updated successfully!",
          })
        );
        dispatch(userActions.resetPasswordSetToken(""));
        dispatch(userActions.navigateAfterResetPassword("/login"));
      })
      .catch(() => {
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: "Fail to update password. Please try again. ",
          })
        );
        dispatch(userActions.resetPasswordSetToken(""));
        dispatch(userActions.navigateAfterResetPassword("/reset-password"));
      });
  };
};
