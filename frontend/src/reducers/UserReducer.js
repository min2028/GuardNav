import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase('auth/login', (state, action) => {
                state.user = action.payload;
            })
            .addCase('auth/logout', (state) => {
                state.user = null;
            })
    }
});



export default authSlice.reducer;