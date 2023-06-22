import { createSlice } from "@reduxjs/toolkit";

const tripReducer = createSlice({
  name: "trip",
  initialState: {
    from: null,
    to: null,
  },
  reducers: {
    setFrom: (state, action) => {
        state.from = action.payload;
    }, 
    setTo: (state, action) => {
        state.to = action.payload;
    }
  },
});

export const { setFrom, setTo } = tripReducer.actions;
export default tripReducer.reducer;
