import { createSlice } from "@reduxjs/toolkit";
import RootState from "types/RootState";

const initialState = {
  theme: "light",
  loadDataOnInit: false,
  gridSize: 2,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleLoadDataOnInit: (state) => {
      state.loadDataOnInit = !state.loadDataOnInit;
    },
    setGridSize: (state, action) => {
      state.gridSize = action.payload;
    },
  },
});

export const { changeTheme, toggleLoadDataOnInit } = settingsSlice.actions;

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLoadDataOnInit = (state: RootState) =>
  state.settings.loadDataOnInit;
export const selectGridSize = (state: RootState) => state.settings.gridSize;

export default settingsSlice.reducer;
