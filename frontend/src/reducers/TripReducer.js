import { createSlice } from "@reduxjs/toolkit";

const tripReducer = createSlice({
  name: "trip",
  initialState: {
    from: null,
    to: null,
  },
  reducers: {
    setFrom: (state, action) => {
        let from = action.payload;

        if (typeof from.lat === "string") {
            from.lat = parseFloat(from.lat);
        }

        if (typeof from.lng === "string") {
            from.lng = parseFloat(from.lng);
        }

        state.from = from;
    }, 
    setTo: (state, action) => {
        let to = action.payload;

        if (typeof to.lat === "string") {
            to.lat = parseFloat(to.lat);
        }

        if (typeof to.lng === "string") {
            to.lng = parseFloat(to.lng);
        }

        state.to = to;
    }
  },
});


export const { setFrom, setTo } = tripReducer.actions;
export default tripReducer.reducer;
