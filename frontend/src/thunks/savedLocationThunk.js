import { createAsyncThunk } from "@reduxjs/toolkit";
import { savedLocationTypes } from "../actions/savedLocationActions";
import {
    addSavedLocation,
    deleteSavedLocation,
} from "../services/savedLocationService";

export const addSavedLocationAsync = createAsyncThunk(
    savedLocationTypes.ADD_SAVEDLOCATION,
    async (item, thunkAPI) => {
        let user = thunkAPI.getState().user;
        while (user.user) {
            user = user.user;
        }
        return await addSavedLocation(user, item);
    }
);

export const deleteSavedLocationAsync = createAsyncThunk(
    savedLocationTypes.DELETE_SAVEDLOCATION,
    async (item, thunkAPI) => {
        console.log(item)
        let user = thunkAPI.getState().user;
        while (user.user) {
            user = user.user;
        }
        return await deleteSavedLocation(user, item);
    }
);

