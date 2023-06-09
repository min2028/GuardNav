import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./reducers/LocationReducer";

const store = configureStore({
    reducer: {
        location: LocationReducer,
    },
});

export default store;