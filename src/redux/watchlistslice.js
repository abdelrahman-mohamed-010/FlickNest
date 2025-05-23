import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUser } from "./authSlice"; // To listen for logout

const USER_WATCHLISTS_KEY = 'userWatchlists';

// Helper to get all watchlists from localStorage
const getAllUserWatchlists = () => {
  const watchlists = localStorage.getItem(USER_WATCHLISTS_KEY);
  return watchlists ? JSON.parse(watchlists) : {};
};

// Helper to save all watchlists to localStorage
const saveAllUserWatchlists = (watchlists) => {
  localStorage.setItem(USER_WATCHLISTS_KEY, JSON.stringify(watchlists));
};

// Thunk to add a movie to the watchlist
export const addToWatchlist = createAsyncThunk(
  'watchlist/addToWatchlist',
  async (movie, { getState, dispatch }) => {
    const { auth } = getState();
    if (!auth.isAuthenticated || !auth.user?.email) {
      // Or handle this by redirecting to login, showing a message, etc.
      throw new Error('User not authenticated to add to watchlist.');
    }
    const userId = auth.user.email;
    
    const allWatchlists = getAllUserWatchlists();
    const userWatchlist = allWatchlists[userId] || [];
    
    if (!userWatchlist.find(m => m.id === movie.id)) {
      userWatchlist.push(movie);
      allWatchlists[userId] = userWatchlist;
      saveAllUserWatchlists(allWatchlists);
      dispatch(setUserWatchlist(userWatchlist)); // Update current user's watchlist in state
    }
    return movie; // Can be used by component if needed
  }
);

// Thunk to remove a movie from the watchlist
export const removeFromWatchlist = createAsyncThunk(
  'watchlist/removeFromWatchlist',
  async (movieId, { getState, dispatch }) => {
    const { auth } = getState();
    if (!auth.isAuthenticated || !auth.user?.email) {
      throw new Error('User not authenticated to remove from watchlist.');
    }
    const userId = auth.user.email;

    const allWatchlists = getAllUserWatchlists();
    let userWatchlist = allWatchlists[userId] || [];
    
    const movieExists = userWatchlist.find(m => m.id === movieId);
    if (movieExists) {
      userWatchlist = userWatchlist.filter((movie) => movie.id !== movieId);
      allWatchlists[userId] = userWatchlist;
      saveAllUserWatchlists(allWatchlists);
      dispatch(setUserWatchlist(userWatchlist)); // Update current user's watchlist in state
    }
    return movieId; // Can be used by component if needed
  }
);

// Thunk to load user's watchlist (e.g., on login)
export const loadUserWatchlist = createAsyncThunk(
  'watchlist/loadUserWatchlist',
  async (userId, { dispatch }) => {
    if (!userId) return; // Should have userId
    const allWatchlists = getAllUserWatchlists();
    const userWatchlist = allWatchlists[userId] || [];
    dispatch(setUserWatchlist(userWatchlist));
    // No specific return value needed, action handled by reducer
  }
);


const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    movies: [], // Represents the current logged-in user's watchlist
    // We don't store all users' watchlists in Redux state to keep it lean.
    // localStorage is the single source of truth for all watchlists.
    loading: false, // Optional: for async operations if needed
    error: null,    // Optional: for async operations if needed
  },
  reducers: {
    setUserWatchlist: (state, action) => {
      state.movies = action.payload;
    },
    clearWatchlist: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.movies = []; // Clear watchlist on logout
      })
      // Handle pending/fulfilled/rejected for thunks if you want loading/error states
      .addCase(addToWatchlist.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        // State is already updated by setUserWatchlist dispatched within the thunk
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message;
      })
      .addCase(removeFromWatchlist.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        // State is already updated by setUserWatchlist dispatched within the thunk
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message;
      })
      .addCase(loadUserWatchlist.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(loadUserWatchlist.fulfilled, (state) => {
        state.loading = false;
        // State is updated by setUserWatchlist dispatched within the thunk
      })
      .addCase(loadUserWatchlist.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message;
      });
  },
});

export const { setUserWatchlist, clearWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
