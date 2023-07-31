import { createSlice } from "@reduxjs/toolkit";

const tripReducer = createSlice({
  name: "trip",
  initialState: {
    from: {},
    to: {},
  },
  reducers: {
    setFrom: (state, action) => {
        const from = { ...action.payload };

        if (typeof from.lat === "string") {
          from.lat = parseFloat(from.lat);
        }

        if (typeof from.lng === "string") {
          from.lng = parseFloat(from.lng);
        }

        console.log(from);

        state.from = from;
    }, 
    setTo: (state, action) => {
      const to = { ...action.payload }

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
