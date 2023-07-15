import {createSlice} from "@reduxjs/toolkit";
import {getUserAsync} from "../thunks/userThunk";

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    }
});



export default userSlice.reducer;