import { createSlice } from "@reduxjs/toolkit";
import RootState from "types/RootState";

const initialState = {
	theme: "light",
	loadDataOnInit: false
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		changeTheme: (state, action) => {
			state.theme = action.payload;
		},
		toggleLoadDataOnInit: state => {
			state.loadDataOnInit = !state.loadDataOnInit;
		}
	}
});

export const { changeTheme, toggleLoadDataOnInit } = settingsSlice.actions;

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLoadDataOnInit = (state: RootState) => state.settings.loadDataOnInit;

export default settingsSlice.reducer;
