import {createAsyncThunk} from "@reduxjs/toolkit";
import {actionTypes} from "../actions/userActions";
import UserService from "../services/userService";

export const getUserAsync = createAsyncThunk(
    actionTypes.GET_USER,
    async (token) => {
        return await UserService.getUser(token)
    }
);
