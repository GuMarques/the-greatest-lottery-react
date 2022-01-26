import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialLoginState = { email: "", password: "" };

const authSlice = createSlice({
  name: "auth",
  initialState: initialLoginState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout(state) {
      state.email = "";
      state.password = "";
    },
  },
});


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const authActions = authSlice.actions;

export default store;
