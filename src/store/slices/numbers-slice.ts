import { createSlice } from "@reduxjs/toolkit";

const initialBetState: number[] = [];

export const numberSlice = createSlice({
  name: "numbers",
  initialState: initialBetState,
  reducers: {
    addNumber(state, action) {
      state.push(action.payload);
    },
    removeNumber(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
    clearNumbers(_) {
      return initialBetState;
    },
  },
});

export const numberAction = numberSlice.actions;