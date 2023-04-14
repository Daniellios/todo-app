"use client";

import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface uiState {
  isOpen: boolean;
}

const initialState: uiState = {
  isOpen: false,
};

export const uiReducer = createSlice({
  name: "uiReducer",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    toggleModal(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const selectModalStatus = (state: RootState) => state.ui.isOpen;

// Action creators ares generated for each case reducer function
export const { openModal, closeModal, toggleModal } = uiReducer.actions;

export default uiReducer.reducer;
