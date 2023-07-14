import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const historyReducer = createSlice({
  name: "history",
  initialState: {
    items: [
        {
            risk: "low",
            time: "3780",
            distance: "28300",
            favourite: false,
            id: uuidv4(),
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
            distance: "19300",
            favourite: false,
            id: uuidv4(),
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
            distance: "10300",
            favourite: true,
            id: uuidv4(),
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
        if (state.items.length >= 50) {
            state.items.pop();
        }
        state.items.unshift(action.payload);
    },
    clearHistory: (state) => {
        state.items = [];
    },
    setFavourite: (state, action) => {
        const id = action.payload;
        const item = state.items.find(item => item.id === id);
        item.favourite = !item.favourite;
    }
  },
});

export const { addHistoryItem, clearHistory, setFavourite } = historyReducer.actions;
export default historyReducer.reducer;
