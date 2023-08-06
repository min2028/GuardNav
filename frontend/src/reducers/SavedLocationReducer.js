import { createSlice } from "@reduxjs/toolkit";
import { addSavedLocationAsync } from "../thunks/savedLocationThunk";


const savedLocation = createSlice({
    name: "saved_location",
    initialState: {
        items: []
    },
    reducers: {
        setSavedLocation: (state, action) => {
            state.items = action.payload;
            console.log(state.items)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addSavedLocationAsync.fulfilled, (state, action) => {
            state.items = [...state.items, action.payload];
        });
    },
});

export const { setSavedLocation } = savedLocation.actions;
export default savedLocation.reducer;

