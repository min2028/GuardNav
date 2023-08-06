import { createSlice, current } from "@reduxjs/toolkit";
import {
    addSavedLocationAsync,
    deleteSavedLocationAsync,
} from "../thunks/savedLocationThunk";


const savedLocation = createSlice({
    name: "saved_location",
    initialState: {
        items: []
    },
    reducers: {
        setSavedLocation: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addSavedLocationAsync.fulfilled, (state, action) => {
            state.items = [...state.items, action.payload];
        });
        builder.addCase(deleteSavedLocationAsync.fulfilled, (state, action) => {
            const id = action.payload?.toString();
            let index = -1;
            for (let i = 0; i < current(state.items).length; i++) {
                let item = state.items[i];
                if (item._id === id) {
                    index = i;
                }
            }
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        });
    },
});

export const { setSavedLocation } = savedLocation.actions;
export default savedLocation.reducer;

