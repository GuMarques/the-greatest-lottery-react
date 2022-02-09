import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { notificationActions } from "./notification-slice";
import { Auth, User } from "@services/index";

const initialLoginState = {
  name: "",
  email: "",
  resetPasswordToken: "",
  navigateTo: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialLoginState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.loggedIn = true;
      localStorage.setItem("token", action.payload.token.token);
      localStorage.setItem("token_expires_at", action.payload.token.expires_at);
    },
    logout(state) {
      localStorage.clear();
      state.name = "",
      state.email = "",
      state.loggedIn = false
    },
    resetPasswordSetToken(state, action) {
      state.resetPasswordToken = action.payload;
    },
    navigateAfterResetPassword(state, action) {
      state.navigateTo = action.payload;
    },
    relogin(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

export const userActions = userSlice.actions;

export const sendLoginRequest = (email: string, password: string) => {
  return async (dispatch: React.Dispatch<any>) => {
    const { login } = Auth();
    try {
      const res = await login({ email, password });
      dispatch(
        userActions.login({
          email: email,
          name: res.user.name,
          token: res.token,
        })
      );
    } catch (error: any) {
      if (error.data) {
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: error.data.message,
          })
        );
      }
    }
  };
};

export const sendSignUpRequest = (
  name: string,
  email: string,
  password: string
) => {
  return async (dispatch: React.Dispatch<any>) => {
    const { createUser } = User();

    try {
      const res = await createUser(email, password, name);
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
          token: res.token,
        })
      );
    } catch (error: any) {
      if (error.data) {
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

export const sendResetPasswordRequest = (email: string) => {
  return async (dispatch: React.Dispatch<any>) => {
    const { resetPassword } = Auth();
    try {
      const res = await resetPassword(email);
      dispatch(userActions.resetPasswordSetToken(res.token));
    } catch (error: any) {
      if (error.data) {
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

export const sendChangePasswordRequest = (
  token: string,
  newPassword: string
) => {
  return async (dispatch: React.Dispatch<any>) => {
    const { changePassword } = Auth();
    try {
      changePassword(token, newPassword);
      dispatch(
        notificationActions.runNotification({
          status: "sucess",
          message: "Password updated successfully!",
        })
      );
      dispatch(userActions.resetPasswordSetToken(""));
      dispatch(userActions.navigateAfterResetPassword("/login"));
    } catch {
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message: "Fail to update password. Please try again. ",
        })
      );
      dispatch(userActions.resetPasswordSetToken(""));
      dispatch(userActions.navigateAfterResetPassword("/reset-password"));
    }
  };
};

export const getAccount = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const { myAccount } = User();
    try {
      const res = await myAccount();
      dispatch(userActions.relogin({ email: res.email, name: res.name }));
    } catch (error: any) {
      if (error.data) {
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

export const updateAccount = (email: string, name: string) => {
  return async (dispatch: React.Dispatch<any>) => {
    const { updateMyUser } = User();
    try {
      const res = await updateMyUser(email, name);
      dispatch(userActions.relogin({ email: res.email, name: res.name }));
      dispatch(
        notificationActions.runNotification({
          status: "sucess",
          message: "Infos updated succesfully",
        })
      );
    } catch (error: any) {
      if (error.data) {
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
