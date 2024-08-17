import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./watchlistslice";

const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
});

export default store;
