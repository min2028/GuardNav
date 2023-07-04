import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./reducers/LocationReducer";
import TripReducer from "./reducers/TripReducer";
import HistoryReducer from "./reducers/HistoryReducer";
import SavedPlaceReducer from "./reducers/SavedPlaceReducer";

const store = configureStore({
    reducer: {
        location: LocationReducer,
        trip: TripReducer,
        history: HistoryReducer,
        places: SavedPlaceReducer,
    },
});

export default store;
