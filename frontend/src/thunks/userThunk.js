import {createAsyncThunk} from "@reduxjs/toolkit";
import {actionTypes} from "../actions/userActions";
import UserService from "../services/userService";

export const getUserAsync = createAsyncThunk(
    actionTypes.GET_USER,
    async (token) => {
        return await UserService.getUser(token)
    }
);

export const updateUserNameAsync = createAsyncThunk(
    actionTypes.UPDATE_USER_NAME,
    async ({ token, id, name }) => {
        console.log(token, id, name)
        return await UserService.updateUserName(token, id, name);
    }
);

export const updateUserNumberAsync = createAsyncThunk(
    actionTypes.UPDATE_USER_NUMBER,
    async ({ token, id, number }) => {
        console.log(token, id, number)
        return await UserService.updateUserNumber(token, id, number);
    }
);