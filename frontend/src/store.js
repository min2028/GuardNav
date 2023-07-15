import { configureStore } from "@reduxjs/toolkit";
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
    preloadedState: {
        user: loadState(),
    },
    devTools: true,
});

store.subscribe(() => {
    const currentState = store.getState();
    saveState(currentState);
    console.log('Store changed (State)', currentState);
    console.log('LocalStorage change', localStorage.getItem('app_state'));
});

export default store;
