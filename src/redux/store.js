import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from 'redux'; // Import combineReducers
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import watchlistReducer from "./watchlistslice";
import authReducer from "./authSlice"; // Import authReducer

// Persist config for auth. We might want to blacklist loading/error states later.
const authPersistConfig = {
  key: 'auth',
  storage: storage,
  // blacklist: ['loading', 'error'] // Example of blacklisting
};

// Persist config for watchlist - REMOVING PERSISTENCE for watchlistReducer
// const watchlistPersistConfig = {
//   key: 'watchlist',
//   storage: storage,
// };

const rootReducer = combineReducers({
  // watchlist: persistReducer(watchlistPersistConfig, watchlistReducer), // watchlistReducer is no longer persisted directly
  watchlist: watchlistReducer, // Use watchlistReducer without redux-persist
  auth: persistReducer(authPersistConfig, authReducer), 
});

// This root persist config might not be strictly necessary anymore if individual reducers handle their own persistence.
// However, if there are non-persisted reducers or a global blacklist/whitelist is desired at the root level, it can be kept.
// For now, let's keep it simple and assume individual persistence is fine.
// const rootPersistConfig = {
//   key: 'root',
//   storage,
//   // Optionally whitelist only specific reducers to be persisted if not all are handled individually
//   // whitelist: ['auth', 'watchlist'] 
// };

// const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);


const store = configureStore({
  // reducer: persistedRootReducer, // Use the persisted root reducer
  reducer: rootReducer, // Using combined reducers with individual persistence
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
