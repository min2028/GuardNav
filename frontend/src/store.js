import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./reducers/LocationReducer";
import TripReducer from "./reducers/TripReducer";
import HistoryReducer from "./reducers/HistoryReducer";

const store = configureStore({
    reducer: {
        location: LocationReducer,
        trip: TripReducer,
        history: HistoryReducer,
    },
});

export default store;