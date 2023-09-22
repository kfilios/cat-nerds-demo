import { createSlice } from "@reduxjs/toolkit";
import RootState from "types/RootState";

const initialState = {
  theme: "light",
  loadDataOnInit: false,
  gridSize: 2,
  stickyNavbar: false,
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
    setStickyNavbar: (state, action) => {
      state.stickyNavbar = action.payload;
    },
  },
});

export const { changeTheme, toggleLoadDataOnInit } = settingsSlice.actions;

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLoadDataOnInit = (state: RootState) =>
  state.settings.loadDataOnInit;
export const selectGridSize = (state: RootState) => state.settings.gridSize;
export const selectStickyNavbar = (state: RootState) =>
  state.settings.stickyNavbar;

export default settingsSlice.reducer;
