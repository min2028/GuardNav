import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./reducers/LocationReducer";
import TripsReducer from "./reducers/TripsReducer";

const store = configureStore({
  reducer: {
    location: LocationReducer,
    trips: TripsReducer,
  },
});

export default store;
