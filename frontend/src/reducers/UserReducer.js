import {createSlice} from "@reduxjs/toolkit";
import {getUserAsync} from "../thunks/userThunk";

const initialUser = {
    email: "",
    history: [],
    name: "",
    _id: "",
    token: ""
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
                state.name = action.payload?.name;
                state._id = action.payload?._id;
                state.token = action.payload?.token;
            })
    }
});


export const { Logout } = userSlice.actions;
export default userSlice.reducer;