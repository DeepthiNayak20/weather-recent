import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: string;
}

const initialState: CounterState = {
  value: "closed",
};

export const modalSlice = createSlice({
  name: "modalStatus",
  initialState,
  reducers: {
    showModal: (state) => {
      state.value = "open";
    },
    closeModal: (state) => {
      state.value = "closed";
    },
  },
});

// Action creators are generated for each case reducer function
export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice;
