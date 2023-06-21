import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./reducers/LocationReducer";
import TripReducer from "./reducers/TripReducer";

const store = configureStore({
    reducer: {
        location: LocationReducer,
        trip: TripReducer,
    },
});

export default store;