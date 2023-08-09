import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import {
    addHistoryItemAsync,
    changeFavouriteAsync,
    clearHistoryAsync,
} from "../thunks/historyThunk";

const historyReducer = createSlice({
    name: "history",
    initialState: {
        items: [],
    },
    reducers: {
        setHistory: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addHistoryItemAsync.fulfilled, (state, action) => {
            state.items = [...state.items, action.payload];
        });
        builder.addCase(changeFavouriteAsync.fulfilled, (state, action) => {
            const index = state.items.findIndex(
                (item) => item._id === action.payload._id
            );
            state.items[index].favourite =
                !state.items[index].favourite || false;
        });
        builder.addCase(clearHistoryAsync.fulfilled, (state, action) => {
            state.items = [];
        });
    },
});

export const { setHistory } = historyReducer.actions;
export default historyReducer.reducer;
