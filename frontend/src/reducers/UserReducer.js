import {createSlice} from "@reduxjs/toolkit";
import {getUserAsync} from "../thunks/userThunk";

const initialUser = {
    email: "",
    history: [],
    name: "",
    token: "",
    _id: ""
}

const userSlice = createSlice({
    name: 'auth',
    initialState: initialUser,
    reducers: {
        Logout: (state, action) => {
            state.email = initialUser.email;
            state.history = initialUser.history;
            state.name = initialUser.name;
            state.token = initialUser.token;
            state._id = initialUser._id;

        }, 
    },
    extraReducers(builder) {
        builder
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.email = action.payload?.email;
                state.history = action.payload?.history;
                state.name = action.payload?.name;
                state.token = action.payload?.token;
                state._id = action.payload?._id;
            })
    }
});

console.log(userSlice);


export const { Logout } = userSlice.actions;
export default userSlice.reducer;