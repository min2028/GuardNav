import {createSlice} from "@reduxjs/toolkit";
import {getUserAsync} from "../thunks/userThunk";

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        email: "",
        history: [],
        name: "",
        token: "",
        _id: ""
    },
    reducers: {},
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



export default userSlice.reducer;