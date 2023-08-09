import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: "location",
    initialState: {
        currentPosition: null,
        isLoading: true,
    },
    reducers: {
        setCurrentPosition: (state, action) => {
            state.currentPosition = action.payload;
        },
        resetLocation: (state) => {
            state.currentPosition = null;
        },
    },
});

export const { setCurrentPosition, resetLocation } = locationSlice.actions;
export default locationSlice.reducer;
