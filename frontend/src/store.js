import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import LocationReducer from "./reducers/LocationReducer";
import TripReducer from "./reducers/TripReducer";
import HistoryReducer from "./reducers/HistoryReducer";
import SavedPlaceReducer from "./reducers/SavedPlaceReducer";
import UserReducer from "./reducers/UserReducer";

const saveState = (state) => {
    try {
        console.log("State is being saved");
        const serialisedState = JSON.stringify(state);
        localStorage.setItem('app_state', serialisedState);
    } catch (err) {
        console.log("Something went wrong when saving the state");
    }
};

// Load the state from local storage
const loadState = () => {
    try {
        console.log("State is being loaded");
        const serialisedState = localStorage.getItem('app_state');
        if (!serialisedState) return undefined;
        console.log(serialisedState)
        return JSON.parse(serialisedState)
    } catch (err) {
        console.log("Error when loading state from local storage");
        return undefined;
    }
};

const store = configureStore({
    reducer: {
        location: LocationReducer,
        trip: TripReducer,
        history: HistoryReducer,
        places: SavedPlaceReducer,
        user: UserReducer
    },
    middleware: [thunk, ...getDefaultMiddleware()],
    preloadedState: {
        user: loadState(),
        history: loadState()?.history,
    },
    devTools: true,
});

store.subscribe(() => {
    const currentState = store.getState();
    saveState(currentState);
});

export default store;
