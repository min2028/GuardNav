import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trips: [
    {
      id: "1",
      name: "Trip to Stanley Park",
      date: "2023-06-10",
      from: "UBC Bookstore",
      to: "Stanley Park",
      description: "UBC to Stanley.",
    },
    {
      id: "2",
      name: "Grouse Mountain Hiking",
      date: "2023-06-15",
      from: "UBC Bookstore",
      to: "Grouse Mountain",
      description: "UBC to Grouse.",
    },
    {
      id: "3",
      name: "Visit to Granville Island",
      date: "2023-06-20",
      from: "UBC Bookstore",
      to: "Granville Island",
      description: "UBC to Granville Island.",
    },
  ],
  selectedTrip: null,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addTrip: (state, action) => {
      state.push(action.payload);
    },
    removeTrip: (state, action) => {
      return state.filter((trip) => trip.id !== action.payload);
    },
    editTrip: (state, action) => {
      const index = state.findIndex((trip) => trip.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    selectTrip: (state, action) => {
      state.selectedTrip = action.payload;
    },
  },
});

export const { addTrip, removeTrip, editTrip, selectTrip } = tripsSlice.actions;

export default tripsSlice.reducer;
