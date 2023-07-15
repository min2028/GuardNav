import { createAsyncThunk } from "@reduxjs/toolkit";
import { historyTypes } from "../actions/historyActions";
import { addHistoryItem, changeFavourite, clearHistory } from "../services/historyServices";

export const addHistoryItemAsync = createAsyncThunk(
    historyTypes.ADD_HISTORY,
    async (item, thunkAPI) => {
        // this is a really dumb way to get the token, but it works
        let user = thunkAPI.getState().user;
        while (user.user) {
            user = user.user;
        }
        const token = user.token;
        return await addHistoryItem(token, item);
    }
);

export const changeFavouriteAsync = createAsyncThunk(
    historyTypes.CHANGE_FAVOURITE,
    async ({ id, favourite }, thunkAPI) => {
        console.log(id, favourite);
        
        let user = thunkAPI.getState().user;
        while (user.user) {
            user = user.user;
        }
        const token = user.token;
        return await changeFavourite(token, id, favourite);
    }
);

export const clearHistoryAsync = createAsyncThunk(
    historyTypes.CLEAR_HISTORY,
    async (_, thunkAPI) => {
        let user = thunkAPI.getState().user;
        while (user.user) {
            user = user.user;
        }
        const token = user.token;
        return await clearHistory(token);
    }
);