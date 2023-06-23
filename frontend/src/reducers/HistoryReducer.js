import { createSlice } from "@reduxjs/toolkit";

const historyReducer = createSlice({
  name: "history",
  initialState: {
    items: [
        {
            risk: "low",
            time: "3780",
            from: {
                formatted_address: "UBC, Vancouver, BC, Canada",
                lat: 49.26060520000001,
                lng: -123.2459939
            },
            to: {
                formatted_address: "Metropolis at Metrotown, Kingsway, Burnaby, BC, Canada",
                lat: 49.2274211,
                lng: -122.9998793
            }
        },
        {
            risk: "high",
            time: "2580",
            from: {
                formatted_address: "Downtown Vancouver, Vancouver, BC, Canada",
                lat: 49.281954,
                lng: -123.1170744
            },
            to: {
                formatted_address: "UBC, Vancouver, BC, Canada",
                lat: 49.26060520000001,
                lng: -123.2459939
            }
        },
        {
            risk: "mid",
            time: "1380",
            from: {
                formatted_address: "Metropolis at Metrotown, Kingsway, Burnaby, BC, Canada",
                lat: 49.2274211,
                lng: -122.9998793
            },
            to: {
                formatted_address: "Downtown Vancouver, Vancouver, BC, Canada",
                lat: 49.281954,
                lng: -123.1170744
            }
        },
    ]
  },
  reducers: {
    addHistoryItem: (state, action) => {
        state.push(action.payload);
    }
  },
});

export const { addHistoryItem } = historyReducer.actions;
export default historyReducer.reducer;
