"use client";

import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface filterState {
  filterValue: string;
}

const initialState: filterState = {
  filterValue: "all",
};

export const filterReducer = createSlice({
  name: "filterReducer",
  initialState,
  reducers: {
    setAll(state) {
      state.filterValue = "all";
    },
    setActive(state) {
      state.filterValue = "active";
    },
    setCompleted(state) {
      state.filterValue = "completed";
    },
  },
});

export const selectFilterStatus = (state: RootState) =>
  state.filter.filterValue;

// Action creators ares generated for each case reducer function
export const { setAll, setActive, setCompleted } = filterReducer.actions;

export default filterReducer.reducer;
