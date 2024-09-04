import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import watchlistReducer from "./watchlistslice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, watchlistReducer);

const store = configureStore({
  reducer: {
    watchlist: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
