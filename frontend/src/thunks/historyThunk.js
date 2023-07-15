import { createAsyncThunk } from "@reduxjs/toolkit";
import { historyTypes } from "../actions/historyActions";
import { addHistoryItem, changeFavourite, clearHistory } from "../services/historyServices";

export const addHistoryItemAsync = createAsyncThunk(
    historyTypes.ADD_HISTORY,
    async (item, thunkAPI) => {
        console.log(item)
        const token = thunkAPI.getState().user.token;
        return await addHistoryItem(token, item);
    }
);

export const changeFavouriteAsync = createAsyncThunk(
    historyTypes.CHANGE_FAVOURITE,
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().user.token;
        return await changeFavourite(token, id);
    }
);

export const clearHistoryAsync = createAsyncThunk(
    historyTypes.CLEAR_HISTORY,
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().user.token;
        return await clearHistory(token);
    }
);