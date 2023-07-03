import { createSlice } from "@reduxjs/toolkit";

const savedPlaceSlice = createSlice({
    name: "savedPlace",
    initialState: {
        places: [
            {
                id: 1,
                name: "UBC",
                address: "Vancouver, BC V6T 1Z4",
            },
            {
                id: 2,
                name: "Gym",
                address: "709 W Broadway, Vancouver, BC V5Z 1J5",
            },
        ],
    },
    reducers: {
        addPlace: (state, action) => {
            state.places.push(action.payload);
        },
        removePlace: (state, action) => {
            const updatedPlaces = state.filter(
                (place) => place.id !== action.payload.id
            );
            return updatedPlaces;
        },
    },
});

export const { addPlace, removePlace } = savedPlaceSlice.actions;
export default savedPlaceSlice.reducer;

