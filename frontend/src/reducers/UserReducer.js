import {createSlice} from "@reduxjs/toolkit";
import {getUserAsync, updateUserNameAsync, updateUserNumberAsync} from "../thunks/userThunk";

const initialUser = {
    email: "",
    history: [],
    saved_location: [],
    name: "",
    _id: "",
    token: "",
    number: "",
}

const userSlice = createSlice({
    name: 'auth',
    initialState: initialUser,
    reducers: {
        Logout: (state, action) => {
            return initialUser;
        }, 
    },
    extraReducers(builder) {
        builder
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.email = action.payload?.email;
                state.history = action.payload?.history;
                state.saved_location = action.payload?.saved_location;
                state.name = action.payload?.name;
                state._id = action.payload?._id;
                state.token = action.payload?.token;
                state.number = action.payload?.number;
                console.log("token: " + state.token);
            })
            .addCase(updateUserNumberAsync.fulfilled, (state, action) => {
                state.number = action.payload?.number;
            })
            .addCase(updateUserNameAsync.fulfilled, (state, action) => {
                state.name = action.payload?.name;
            })
    }
});


export const { Logout } = userSlice.actions;
export default userSlice.reducer;