import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

import { addHistoryItemAsync, changeFavouriteAsync, clearHistoryAsync } from "../thunks/historyThunk";

const historyReducer = createSlice({
  name: "history",
  initialState: {
    items: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addHistoryItemAsync.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
    });
    builder.addCase(changeFavouriteAsync.fulfilled, (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      state.items[index] = action.payload;
    });
    builder.addCase(clearHistoryAsync.fulfilled, (state, action) => {
      state.items = [];
    });
  }
});

export default historyReducer.reducer;
