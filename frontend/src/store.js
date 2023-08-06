import { configureStore } from "@reduxjs/toolkit";

import SavedLocationReducer from "./reducers/SavedLocationReducer";
import LocationReducer from "./reducers/LocationReducer";
import TripReducer from "./reducers/TripReducer";
import HistoryReducer from "./reducers/HistoryReducer";
import UserReducer from "./reducers/UserReducer";

const store = configureStore({
    reducer: {
        location: LocationReducer,
        saved_location: SavedLocationReducer,
        trip: TripReducer,
        history: HistoryReducer,
        user: UserReducer,
    },
    devTools: true,
});

export default store;