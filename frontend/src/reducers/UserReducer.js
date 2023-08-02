import {createSlice} from "@reduxjs/toolkit";
import {getUserAsync} from "../thunks/userThunk";

const initialUser = {
    email: "",
    history: [],
    saved_location: [],
    name: "",
    _id: ""
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
                state.saved_location = action.payload?.saved_location;
                state.history = action.payload?.history;
                state.name = action.payload?.name;
                state._id = action.payload?._id;
            })
    }
});


export const { Logout } = userSlice.actions;
export default userSlice.reducer;